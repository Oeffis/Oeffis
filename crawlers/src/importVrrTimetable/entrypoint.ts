import { WithPgConnection } from "./../postgres/createPgPool";
import { importTableData } from "./importTableData";
import { createForeignKeys } from "./sql/createForeignKeys";
import { setupTables } from "./sql/setupTables";
import { TABLE_SCHEMAS, TableSchema } from "./tableSchema";

export interface ImportVrrTimetablesOptions {
  withPgConnection: WithPgConnection,
  folder: string,
  concurrencyLimit: number,
  batchSize: number,
  dropTables: boolean,
}

export async function importVrrTimetables(options: ImportVrrTimetablesOptions): Promise<void> {
  const { withPgConnection } = options;

  const vrrTimetableVersionId = await createNewVrrTimetableVersion(withPgConnection);

  for (const tableSchema of TABLE_SCHEMAS) {
    await importTable(options, tableSchema, vrrTimetableVersionId);
  }
}

async function importTable(options: ImportVrrTimetablesOptions, tableSchema: TableSchema, vrrTimetableVersionId: number): Promise<void> {
  const { withPgConnection } = options;

  console.log(`Setting up table ${tableSchema.name}...`);
  const insertSql = await setupTables(options, tableSchema);

  console.log(`Importing data for ${tableSchema.name}...`);
  await importTableData(options, tableSchema, insertSql, vrrTimetableVersionId);

  if (options.dropTables) {
    console.log(`Creating foreign keys for ${tableSchema.name}...`);
    await createForeignKeys(withPgConnection, tableSchema);
  } else {
    console.log(`Skipping creation of foreign keys for ${tableSchema.name}...`);
  }

  console.log(`Finished importing ${tableSchema.name}.`);
}

async function createVrrTimetableVersionTableIfNeeded(withPgConnection: WithPgConnection): Promise<void> {
  await withPgConnection((pgClient) => pgClient.query(`
    CREATE TABLE IF NOT EXISTS vrr_timetable_version (
      vrr_timetable_version_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      import_timestamp timestamptz NOT NULL DEFAULT now()
    )
  `));

  await withPgConnection((pgClient) => pgClient.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS vrr_timetable_version_id_idx ON vrr_timetable_version (vrr_timetable_version_id)
  `));
}

async function createNewVrrTimetableVersion(withPgConnection: WithPgConnection): Promise<number> {
  console.log("Creating vrr timetable if needed...");

  await createVrrTimetableVersionTableIfNeeded(withPgConnection);

  console.log("Creating new vrr timetable version...");

  const { rows } = await withPgConnection((pgClient) => pgClient.query(`
    INSERT INTO vrr_timetable_version DEFAULT VALUES RETURNING vrr_timetable_version_id
  `));

  const vrrTimetableVersionId = rows[0].vrr_timetable_version_id;
  console.log("Created new vrr timetable version: ", vrrTimetableVersionId);

  return vrrTimetableVersionId;
}
