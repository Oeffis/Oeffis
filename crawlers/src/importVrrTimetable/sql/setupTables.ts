import { ImportVrrTimetablesOptions } from "../entrypoint";
import { TableSchema } from "../tableSchema";
import { buildCreateTableSchemaSql, buildDropTableSchemaSql } from "./buildTableSchemaSql";

export async function setupTables(options: ImportVrrTimetablesOptions, tableSchema: TableSchema): Promise<string> {
  const { withPgConnection, folder } = options;

  const dropTableSql = await buildDropTableSchemaSql(tableSchema);
  const [createTableSql, headerNames] = await buildCreateTableSchemaSql(folder, tableSchema);

  if (options.dropTables) {
    await withPgConnection(async (pgClient) => {
      await pgClient.query(dropTableSql);
    });

    await withPgConnection(async (pgClient) => {
      await pgClient.query(createTableSql);
    });

  } else {
    console.log(`Checking if table ${tableSchema.name} is compatible...`);

    // check if schema is compatible
    const currentHeaderNames = await withPgConnection(async (pgClient) => {
      const { fields } = await pgClient.query("SELECT * FROM " + tableSchema.name + " LIMIT 0");
      return fields.map((field) => field.name);
    });

    const missingColumns = headerNames.filter((header) => !currentHeaderNames.includes(header));
    if (missingColumns.length > 0) {
      throw new Error(`Table ${tableSchema.name} is missing columns: ${missingColumns.join(", ")}`);
    }

    console.log(`Table existing ${tableSchema.name} is compatible.`);
  }

  function buildInsertSql(headerNames: string[]): string {
    const columns = headerNames.map((header) => `"${header}"`).join(", ");
    const placeholders = headerNames.map((_, index) => `$${index + 1} `).join(", ");
    return `INSERT INTO "${tableSchema.name}"(${columns}) VALUES(${placeholders})`;
  }

  const insertSql = buildInsertSql(headerNames);
  return insertSql;
}
