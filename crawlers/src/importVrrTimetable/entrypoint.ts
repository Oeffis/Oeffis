import { WithPgConnection } from "./../postgres/createPgPool";
import { importTableData } from "./importTableData";
import { createForeignKeys } from "./sql/createForeignKeys";
import { setupTables } from "./sql/setupTables";
import { TABLE_SCHEMAS, TableSchema } from "./tableSchema";

export type ImportVrrTimetablesOptions = {
  withPgConnection: WithPgConnection,
  folder: string,
  concurrencyLimit: number,
  batchSize: number
};

export async function importVrrTimetables(options: ImportVrrTimetablesOptions): Promise<void> {
  for (const tableSchema of TABLE_SCHEMAS) {
    await importTable(options, tableSchema);
  }
}

async function importTable(options: ImportVrrTimetablesOptions, tableSchema: TableSchema): Promise<void> {
  const { withPgConnection } = options;

  console.log(`Setting up table ${tableSchema.name}...`);
  const insertSql = await setupTables(options, tableSchema);

  console.log(`Importing data for ${tableSchema.name}...`);
  await importTableData(options, tableSchema, insertSql);

  console.log(`Creating foreign keys for ${tableSchema.name}...`);
  await createForeignKeys(withPgConnection, tableSchema);

  console.log(`Finished importing ${tableSchema.name}.`);
}
