import { addWeeks, addYears, getISOWeek, isBefore, startOfMonth } from "date-fns";
import yargs from "yargs";
import { importVrrTimetables } from "./importVrrTimetable/entrypoint";
import { TABLE_SCHEMAS } from "./importVrrTimetable/tableSchema";
import { createPgPool } from "./postgres/createPgPool";

async function main(): Promise<void> {
  const argv = removeNodeOptions(process.argv);
  await yargs(argv)
    .command("import-vrr-timetable",
      "Imports csv data into a postgres database.\n"
      + "Download the csv files from: "
      + "https://www.opendata-oepnv.de/ht/de/organisation/verkehrsverbuende/vrr/startseite?tx_vrrkit_view%5Baction%5D=details&tx_vrrkit_view%5Bcontroller%5D=View&tx_vrrkit_view%5Bdataset_name%5D=soll-fahrplandaten-vrr&cHash=02c1406b5f625dd48a64d0dd29805e2c", (yargs) => yargs
        .option("folder", {
          demandOption: true,
          describe: "Folder that contains these csv files: " + TABLE_SCHEMAS.map((schema) => schema.csv).join(", "),
          type: "string"
        })
        .option("concurrency-limit", {
          default: 100,
          describe: "Concurrency limit for database inserts",
          type: "number"
        })
        .option("batch-size", {
          default: 1000,
          describe: "Batch size for database inserts",
          type: "number"
        })
        .option("drop-tables", {
          default: false,
          describe: "Drop tables before importing and recreate them. If false, the schema will be checked and an error will be thrown if the schema is not compatible.",
          type: "boolean"
        }),
      async (argv) => {
        const pg = await createPgPool({
          host: process.env.PG_HOST ?? "localhost",
          port: parseInt(process.env.PG_PORT ?? "5432"),
          user: process.env.PG_USER ?? "postgres",
          password: process.env.PG_PASSWORD ?? "postgres"
        }, console.log);

        await importVrrTimetables({
          withPgConnection: pg.withPgConnection,
          folder: argv.folder,
          concurrencyLimit: argv.concurrencyLimit,
          batchSize: argv.batchSize,
          dropTables: argv.dropTables
        });

        await pg.closePgConnection();
        process.exit(0);
      })
    .command("delays", "Fetches delays from VRR", yargs =>
      yargs
        .option("stopId", {
          alias: "s",
          type: "string",
          description: "The stop id to fetch departures for. If missing, a stop will be selected by random, where more frequented stops are preferred."
        })
        .option("limit", {
          alias: "l",
          type: "number",
          description: "The maximum number of departures to fetch. ",
          default: 100
        })
        .option("storeRawData", {
          type: "boolean",
          description: "Insert response of api into raw_data column of table.",
          default: false
        })
        .option("concurrency", {
          default: 100,
          describe: "Concurrency limit for vrr queries and database inserts",
          type: "number"
        })
        .option("targetTable", {
          type: "string",
          description: "The table to insert the data into.",
          default: "historic_data"
        })
      , async args => {
        const { run } = await import("./delays");
        await run(args);
        process.exit(0);
      })
    .command("generate-partition-sql", "Generates sql for creating partitions for a table", yargs =>
      yargs
        .option("year", {
          alias: "y",
          type: "number",
          description: "The year to generate partitions for.",
          demandOption: true,
          default: 2023
        })
      , async ({ year }) => {

        const startOfCurrent = startOfMonth(new Date(year, 0, 1));
        const startOfNext = addYears(startOfCurrent, 1);

        const createTableSql = [];
        const migrateTableSql = [];

        for (let i = startOfCurrent; isBefore(i, startOfNext); i = addWeeks(i, 1)) {

          const weekNumber = getISOWeek(i);
          const startOfWeek = i;
          const endOfWeek = addWeeks(i, 1);

          const create = `CREATE TABLE historic_data_y${startOfWeek.getUTCFullYear()}_w${weekNumber} PARTITION OF historic_data
          FOR VALUES FROM ('${startOfWeek.toISOString()}') TO ('${endOfWeek.toISOString()}');
          `;

          createTableSql.push(create);

          const migrate = `INSERT INTO historic_data
          SELECT * FROM historic_data_old
          WHERE recording_time BETWEEN ('${startOfWeek.toISOString()}') AND ('${endOfWeek.toISOString()}');`;

          migrateTableSql.push(migrate);
        }

        console.log("Migration SQL:");
        console.log(migrateTableSql.join("\n"));

        console.log("Create SQL:");
        console.log(createTableSql.join("\n"));
        process.exit(0);
      })
    .showHelpOnFail(true)
    .demandCommand()
    .recommendCommands()
    .help()
    .detectLocale(false)
    .wrap(null)
    .parse();
}

main()
  .then(() => {
    console.info("Exiting now, bye bye");

    setTimeout(() => {
      console.warn("Still running after 10 seconds, forcing exit now...");
      process.exit(0);
    }, 10_000);
  })
  .catch((err) => {
    console.error(err, "Unhandled error in main application");
    process.exit(2);
  });

function removeNodeOptions(argv: string[]): string[] {
  if (argv.length === 0) {
    return argv;
  }

  const firstArg = argv[0];
  if (argv.length >= 2 && (firstArg.endsWith("node") || firstArg.endsWith("node.exe"))) {
    return argv.slice(2);
  }

  return argv;
}
