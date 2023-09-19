import { formatDistanceToNow } from "date-fns";
import { createReadStream } from "fs";
import { join } from "path";
import { WithPgConnection } from "./../postgres/createPgPool";
import { buildCreateTableSchemaSql, buildDropTableSchemaSql } from "./buildTableSchemaSql";
import { importCsvViaStreamingConcurrencyLimitedParser } from "./importCsvViaStreamingConcurrencyLimitedParser";

export type TableSchema = {
  name: string;
  csv: string;
  columns: "auto";
  primaryKey?: string;
};

const tableSchemas: TableSchema[] = [
  { name: "agency", csv: "agency.txt", "columns": "auto" },
  { name: "calendar", csv: "calendar.txt", "columns": "auto" },
  { name: "calendar_dates", csv: "calendar_dates.txt", "columns": "auto" },
  { name: "feed_info", csv: "feed_info.txt", "columns": "auto" },
  { name: "routes", csv: "routes.txt", "columns": "auto" },
  { name: "shapes", csv: "shapes.txt", "columns": "auto" },
  { name: "stop_times", csv: "stop_times.txt", "columns": "auto" },
  { name: "stops", csv: "stops.txt", "columns": "auto" },
  { name: "transfers", csv: "transfers.txt", "columns": "auto" },
  { name: "trips", csv: "trips.txt", "columns": "auto" }
];

export async function importVrrTimetables(withPgConnection: WithPgConnection, folder: string): Promise<void> {
  for (const tableSchema of tableSchemas) {
    await importVrrTimetable(withPgConnection, folder, tableSchema);
  }
}

async function importVrrTimetable(withPgConnection: WithPgConnection, folder: string, tableSchema: TableSchema): Promise<void> {
  console.log(`Setting up table ${tableSchema.name}...`);
  const insertSql = await setupTables(withPgConnection, folder, tableSchema);

  const csvPath = join(folder, tableSchema.csv);
  const rs = createReadStream(csvPath);

  console.log(`Importing data for ${tableSchema.name}...`);
  const { promise, estimateTimeLeftInSeconds } = importCsvViaStreamingConcurrencyLimitedParser<Record<string, string>>({
    stream: rs,
    chunkCallback: async (data, fields) => {
      await withPgConnection(async (pgClient) => {
        await Promise.all(data.map((obj) => pgClient.query(insertSql, convertObjIntoPositionalArray(fields, obj))));
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
        console.log(`Estimated time left for ${tableSchema.name}: ${formatDistanceToNow(estimatedFinishDate, { includeSeconds: true })} ${estimatedFinishDate.toLocaleString()}`);
      }
      resolve();
    })
  ]);

  finished = true;

  rs.close();
  console.log(`Imported data for ${tableSchema.name}.`);
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

function convertObjIntoPositionalArray(fields: Array<string>, obj: Record<string, string>): string[] {
  return fields.map((field) => obj[field]);
}
