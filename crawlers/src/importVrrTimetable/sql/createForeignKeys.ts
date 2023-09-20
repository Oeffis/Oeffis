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

  const foreignKeys = schema.foreignKeys.map(
    (fk) => `ALTER TABLE "${schema.name}" ADD CONSTRAINT "${schema.name}_${fk.column}_fkey" FOREIGN KEY ("${fk.column}") REFERENCES "${fk.referencedTable}" ("${fk.referencedColumn}")`);

  return foreignKeys.join(";\n");
}
