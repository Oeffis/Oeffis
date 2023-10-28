/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/require-await */
import { TableSchema } from "importVrrTimetable/tableSchema";
import { WithPgConnection } from "postgres/createPgPool";

export async function createForeignKeys(withPgConnection: WithPgConnection, tableSchema: TableSchema): Promise<void> {
  await withPgConnection(async (pgClient) => {
    const sql = await buildCreateForeignKeysSql(tableSchema);
    await pgClient.query(sql);
  });
}

async function buildCreateForeignKeysSql(schema: TableSchema): Promise<string> {
  if (!schema.foreignKeys || schema.foreignKeys.length === 0) {
    return "";
  }

  const foreignKeys = schema.foreignKeys.map((fk) => {
    const fkName = `${schema.name}_${fk.columns.join("_")}_fkey`;
    const fkColumns = fk.columns.map((column) => `"${column}"`).join(", ");
    const referencedColumns = fk.referencedColumns.map((column) => `"${column}"`).join(", ");

    return `ALTER TABLE "${schema.name}" ADD CONSTRAINT "${fkName}" FOREIGN KEY (${fkColumns}) REFERENCES "${fk.referencedTable}" (${referencedColumns})`;
  });

  return foreignKeys.join(";\n");
}
