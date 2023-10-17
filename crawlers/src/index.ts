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
          batchSize: argv.batchSize
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
      , async args => {
        const { run } = await import("./delays");
        await run(args);
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
