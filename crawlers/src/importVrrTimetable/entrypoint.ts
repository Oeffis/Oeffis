import { formatDistanceToNow } from "date-fns";
import { createReadStream } from "fs";
import { join } from "path";
import { WithPgConnection } from "./../postgres/createPgPool";
import { buildCreateForeignKeysSql, buildCreateTableSchemaSql, buildDropTableSchemaSql } from "./buildTableSchemaSql";
import { importCsvViaStreamingConcurrencyLimitedParser } from "./importCsvViaStreamingConcurrencyLimitedParser";

export type TableSchema = {
  name: string;
  csv: string;
  foreignKeys: Array<ForeignKey>;
  primaryKey?: string;
  determineFieldType?: (field: string) => string;
};

export type ForeignKey = {
  column: string;
  referencedColumn: string;
  referencedTable: string;
};

function asNullableField(fields: Array<string>): TableSchema["determineFieldType"] {
  return (field) => {
    if (fields.includes(field)) {
      return "TEXT";
    }
    return "TEXT NOT NULL";
  };
}

const tableSchemas: TableSchema[] = [
  {
    name: "agency",
    csv: "agency.txt",
    foreignKeys: [],
    primaryKey: "agency_id",
    determineFieldType: asNullableField(["agency_phone", "agency_fare_url", "agency_email"])
  },
  {
    name: "calendar",
    csv: "calendar.txt",
    foreignKeys: [],
    primaryKey: "service_id"
  },
  {
    name: "calendar_dates",
    csv: "calendar_dates.txt",
    foreignKeys: []
  },
  {
    name: "feed_info",
    csv: "feed_info.txt",
    foreignKeys: []
  },
  {
    name: "routes",
    csv: "routes.txt",
    foreignKeys: [
      {
        column: "agency_id",
        referencedColumn: "agency_id",
        referencedTable: "agency"
      }
    ],
    primaryKey: "route_id",
    determineFieldType: asNullableField(["NVBW_DLID", "route_color", "route_text_color", "route_long_name"])
  },
  {
    name: "shapes",
    csv: "shapes.txt",
    foreignKeys: [],
    primaryKey: "shape_id"
  },
  {
    name: "stops",
    csv: "stops.txt",
    foreignKeys: [
      {
        column: "parent_station",
        referencedColumn: "stop_id",
        referencedTable: "stops"
      }
    ],
    primaryKey: "stop_id",
    determineFieldType: asNullableField(["stop_code", "stop_url", "location_type", "parent_station", "platform_code", "wheelchair_boarding", "NVBW_HST_DHID"])
  },
  {
    name: "stop_times",
    csv: "stop_times.txt",
    foreignKeys: [
      {
        column: "stop_id",
        referencedColumn: "stop_id",
        referencedTable: "stops"
      }
    ],
    determineFieldType: asNullableField(["stop_headsign", "shape_dist_traveled"])
  },
  {
    name: "transfers",
    csv: "transfers.txt",
    foreignKeys: [
      {
        column: "from_stop_id",
        referencedColumn: "stop_id",
        referencedTable: "stops"
      },
      {
        column: "to_stop_id",
        referencedColumn: "stop_id",
        referencedTable: "stops"
      }
    ],
    determineFieldType: asNullableField(["min_transfer_time"])
  },
  {
    name: "trips",
    csv: "trips.txt",
    foreignKeys: [
      {
        column: "route_id",
        referencedColumn: "route_id",
        referencedTable: "routes"
      },
      {
        column: "service_id",
        referencedColumn: "service_id",
        referencedTable: "calendar"
      },
      {
        column: "shape_id",
        referencedColumn: "shape_id",
        referencedTable: "shapes"
      }
    ],
    primaryKey: "trip_id",
    determineFieldType: asNullableField(["shape_id", "trip_headsign", "trip_short_name"])
  }
];

export async function importVrrTimetables(withPgConnection: WithPgConnection, folder: string): Promise<void> {
  for (const tableSchema of tableSchemas) {
    await importVrrTimetable(withPgConnection, folder, tableSchema);
  }
}

async function importVrrTimetable(withPgConnection: WithPgConnection, folder: string, tableSchema: TableSchema): Promise<void> {
  console.log(`Setting up table ${tableSchema.name}...`);
  const insertSql = await setupTables(withPgConnection, folder, tableSchema);

  console.log(`Importing data for ${tableSchema.name}...`);
  await importTableData(withPgConnection, folder, tableSchema, insertSql);

  console.log(`Creating foreign keys for ${tableSchema.name}...`);
  await createForeignKeys(withPgConnection, tableSchema);

  console.log(`Finished importing ${tableSchema.name}.`);
}

async function importTableData(withPgConnection: WithPgConnection, folder: string, tableSchema: TableSchema, insertSql: string): Promise<void> {
  const csvPath = join(folder, tableSchema.csv);
  const rs = createReadStream(csvPath);

  const { promise, estimateTimeLeftInSeconds } = importCsvViaStreamingConcurrencyLimitedParser<Record<string, string>>({
    stream: rs,
    chunkCallback: async (data, fields) => {
      await withPgConnection(async (pgClient) => {
        await Promise.all(data.map((obj) => {
          const data = mapEmptyStringsToNull(convertObjIntoPositionalArray(fields, obj));
          return pgClient.query(insertSql, data);
        }));
      });
    },
    concurrencyLimit: 100,
    chunkSize: 1_000
  });

  let finished = false;
  await Promise.race([
    promise,
    new Promise<void>(async (resolve) => {
      while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        if (finished) {
          break;
        }

        const timeLeftInSecounds = estimateTimeLeftInSeconds();
        if (timeLeftInSecounds === Number.POSITIVE_INFINITY) {
          continue;
        }

        const estimatedFinishDate = new Date(timeLeftInSecounds * 1000 + new Date().getTime());
        console.log(`Estimated time left for ${tableSchema.name}: ${formatDistanceToNow(estimatedFinishDate, { includeSeconds: true })}. ETA ${estimatedFinishDate.toLocaleString()}`);
      }
      resolve();
    })
  ]);

  finished = true;

  rs.close();
}

async function setupTables(withPgConnection: WithPgConnection, folder: string, tableSchema: TableSchema): Promise<string> {
  const dropTableSql = await buildDropTableSchemaSql(tableSchema);
  await withPgConnection(async (pgClient) => {
    await pgClient.query(dropTableSql);
  });

  const [createTableSql, headerNames] = await buildCreateTableSchemaSql(folder, tableSchema);
  await withPgConnection(async (pgClient) => {
    await pgClient.query(createTableSql);
  });

  function buildInsertSql(headerNames: string[]): string {
    const columns = headerNames.map((header) => `"${header}"`).join(", ");
    const placeholders = headerNames.map((_, index) => `$${index + 1} `).join(", ");
    return `INSERT INTO "${tableSchema.name}"(${columns}) VALUES(${placeholders})`;
  }

  const insertSql = buildInsertSql(headerNames);
  return insertSql;
}

async function createForeignKeys(withPgConnection: WithPgConnection, tableSchema: TableSchema): Promise<void> {
  await withPgConnection(async (pgClient) => {
    const sql = await buildCreateForeignKeysSql(tableSchema);
    await pgClient.query(sql);
  });
}

function convertObjIntoPositionalArray(fields: Array<string>, obj: Record<string, string>): Array<string> {
  return fields.map((field) => obj[field]);
}

function mapEmptyStringsToNull(fields: Array<string>): Array<string | null> {
  return fields.map((value) => value === "" ? null : value);
}
