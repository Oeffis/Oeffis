import yargs from "yargs";
import { importVrrTimetables } from "./importVrrTimetable/entrypoint";
import { createPgPool } from "./postgres/createPgPool";

async function main(): Promise<void> {
  const argv = removeNodeOptions(process.argv);
  await yargs(argv)
    .command("test-parser", "Delete servers from the database", (yargs) => yargs
      .option("folder", {
        demandOption: true,
        describe: "Folder to import",
        type: "string"
      })
      .option("concurrency-limit", {
        default: 100,
        describe: "Concurrency limit",
        type: "number"
      }), async (argv) => {
        const pg = await createPgPool({
          host: "localhost",
          port: 5432,
          password: "postgres",
          user: "postgres"
        }, console.log);

        await importVrrTimetables(pg.withPgConnection, argv.folder);

        await pg.closePgConnection();
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
