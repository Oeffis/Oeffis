import yargs from "yargs";

async function main(): Promise<void> {
  const argv = removeNodeOptions(process.argv);
  await yargs(argv)
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
