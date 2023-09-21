import { ImportVrrTimetablesOptions } from "../entrypoint";
import { TableSchema } from "../tableSchema";
import { buildCreateTableSchemaSql, buildDropTableSchemaSql } from "./buildTableSchemaSql";

export async function setupTables(options: ImportVrrTimetablesOptions, tableSchema: TableSchema): Promise<string> {
  const { withPgConnection, folder } = options;

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
