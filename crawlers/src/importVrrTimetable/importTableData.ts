import { formatDistanceToNow } from "date-fns";
import { createReadStream } from "fs";
import { join } from "path";
import { importCsvViaStreamingConcurrencyLimitedParser } from "./csv/importCsvViaStreamingConcurrencyLimitedParser";
import { ImportVrrTimetablesOptions } from "./entrypoint";
import { TableSchema } from "./tableSchema";

export async function importTableData(options: ImportVrrTimetablesOptions, tableSchema: TableSchema, insertSql: string, vrrTimetableVersionId: number): Promise<void> {
  const { withPgConnection, folder, concurrencyLimit, batchSize } = options;

  const csvPath = join(folder, tableSchema.csv);
  const rs = createReadStream(csvPath);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { promise, estimateTimeLeftInSeconds } = importCsvViaStreamingConcurrencyLimitedParser<Record<string, string>>({
    stream: rs,
    chunkCallback: async (data, fields) => {
      await withPgConnection(async (pgClient) => {
        // Disables foreign key checks for the current transaction.
        await pgClient.query("SET session_replication_role = 'replica';");

        await Promise.all(data.map((obj) => {
          const data = mapEmptyStringsToNull([...convertObjIntoPositionalArray(fields, obj), vrrTimetableVersionId]);
          return pgClient.query(insertSql, data);
        }));

        // Re-enables foreign key checks
        try {
          await pgClient.query("SET session_replication_role = 'origin';");
        } catch (e) {
          // ignore
        }
      });
    },
    concurrencyLimit,
    chunkSize: batchSize
  });

  let finished = false;
  await Promise.race([
    promise,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    new Promise<void>(async () => {
      // eslint-disable-next-line no-unmodified-loop-condition
      while (!finished) {
        await new Promise((resolve) => void setTimeout(resolve, 10_000));
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (finished) {
          break;
        }

        const timeLeftInSecounds = estimateTimeLeftInSeconds();
        if (timeLeftInSecounds === Number.POSITIVE_INFINITY) {
          continue;
        }

        const estimatedFinishDate = new Date(timeLeftInSecounds * 1000 + new Date().getTime());
        console.log(`Estimated time left for ${tableSchema.name}: ${formatDistanceToNow(estimatedFinishDate, { includeSeconds: true })}. ETA ${estimatedFinishDate.toLocaleString()}`);
      }
    })
  ]);

  finished = true;

  rs.close();
}

function convertObjIntoPositionalArray(fields: string[], obj: Record<string, string>): string[] {
  return fields.map((field) => obj[field]);
}

function mapEmptyStringsToNull(fields: (string | number)[]): (string | number | null)[] {
  return fields.map((value) => value === "" ? null : value);
}
