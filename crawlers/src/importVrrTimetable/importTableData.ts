import { formatDistanceToNow } from "date-fns";
import { createReadStream } from "fs";
import { join } from "path";
import { importCsvViaStreamingConcurrencyLimitedParser } from "./csv/importCsvViaStreamingConcurrencyLimitedParser";
import { ImportVrrTimetablesOptions } from "./entrypoint";
import { TableSchema } from "./tableSchema";

export async function importTableData(options: ImportVrrTimetablesOptions, tableSchema: TableSchema, insertSql: string): Promise<void> {
  const { withPgConnection, folder, concurrencyLimit, batchSize } = options;

  const csvPath = join(folder, tableSchema.csv);
  const rs = createReadStream(csvPath);

  const { promise, estimateTimeLeftInSeconds } = importCsvViaStreamingConcurrencyLimitedParser<Record<string, string>>({
    stream: rs,
    chunkCallback: async (data, fields) => {
      await withPgConnection(async (pgClient) => {
        await Promise.all(data.map((obj) => {
          const data = mapEmptyStringsToNull(convertObjIntoPositionalArray(fields, obj));
          return pgClient.query(insertSql, data);
        }));
      });
    },
    concurrencyLimit,
    chunkSize: batchSize
  });

  let finished = false;
  await Promise.race([
    promise,
    (async () => {
      // eslint-disable-next-line no-unmodified-loop-condition
      while (!finished) {
        await new Promise((resolve) => void setTimeout(resolve, 10_000));
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

function convertObjIntoPositionalArray(fields: Array<string>, obj: Record<string, string>): Array<string> {
  return fields.map((field) => obj[field]);
}

function mapEmptyStringsToNull(fields: Array<string>): Array<string | null> {
  return fields.map((value) => value === "" ? null : value);
}
