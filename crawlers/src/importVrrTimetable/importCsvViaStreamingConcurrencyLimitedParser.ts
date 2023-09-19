import { ReadStream, statSync } from "fs";
import { ParseResult, Parser, parse } from "papaparse";

export type ChunkCallback<T> = (data: Array<T>, fields: Array<string>) => Promise<void>;

export type ImportCsvViaStreamingConcurrencyLimitedParserOptions<T> = {
  concurrencyLimit: number;
  chunkSize: number;
  chunkCallback: ChunkCallback<T>;
  stream: ReadStream;
};

/**
 * Parses a CSV file via streaming and calls the chunk callback for each chunk.
 * This implementation will limit the number of concurrent chunks to the given concurrency limit.
 *
  * @param concurrencyLimit The maximum number of concurrent chunks.
  * @param chunkSize The number of rows per chunk.
  * @param chunkCallback The callback to call for each chunk.
  * @param stream The stream to read from.
  *
  * @returns An object with a promise that resolves when all chunks have been processed or rejects if an error occurs.
 */
export function importCsvViaStreamingConcurrencyLimitedParser<T>({ concurrencyLimit, chunkCallback, chunkSize, stream }: ImportCsvViaStreamingConcurrencyLimitedParserOptions<T>): { promise: Promise<void>, estimateTimeLeftInSeconds(): number } {

  const totalFileLength: number = statSync(stream.path).size;
  let firstCallbackRanAt: Date | null = null;
  let currentCallbackBytesRead: number | null = null;

  function estimateTimeLeftInSeconds(): number {
    if (!firstCallbackRanAt) {
      return Number.POSITIVE_INFINITY;
    }

    if (!currentCallbackBytesRead) {
      return Number.POSITIVE_INFINITY;
    }

    const timeElapsedInSeconds = (new Date().getTime() - firstCallbackRanAt.getTime()) / 1000;
    const timePerByte = timeElapsedInSeconds / currentCallbackBytesRead;
    const estimatedTimeLeftInSeconds = timePerByte * (totalFileLength - currentCallbackBytesRead);

    return estimatedTimeLeftInSeconds;
  }

  return {
    estimateTimeLeftInSeconds,
    promise: new Promise<void>((resolve, reject) => {

      let concurrency = 0;
      let rejected = false;
      let isPaused = false;
      let isFinished = false;

      function incrementConcurrency(parser: Parser): void {
        concurrency++;
        if (concurrency >= concurrencyLimit) {
          // console.log("concurrency limit reached, waiting (" + concurrency + "/" + concurrencyLimit + ")");
          isPaused = true;
          parser.pause();
        }
      }

      function decrementConcurrency(parser: Parser): void {
        concurrency--;
        if (concurrency === 0 && isFinished && !rejected && !isPaused) {
          console.log("all chunks processed");
          resolve();
        }
        if (isPaused && concurrency < concurrencyLimit) {
          // console.log("resuming (" + concurrency + "/" + concurrencyLimit + ")");
          isPaused = false;
          parser.resume();
        }
      }

      function rejectOnError(parser: Parser | null, err: Error): void {
        if (rejected) {
          return;
        }

        console.error(err, "Error in chunk callback");

        rejected = true;
        if (parser) {
          parser.abort();
        }
        reject(err);
      }

      function executeChunkCallback(parser: Parser, result: ParseResult<unknown>): void {
        if (rejected) {
          return;
        }

        if (!firstCallbackRanAt) {
          firstCallbackRanAt = new Date();
        }

        incrementConcurrency(parser);

        const bytesReadBeforeCallbackCurrent = result.meta.cursor;
        chunkCallback(result.data as unknown as Array<T>, result.meta.fields as Array<string>)
          .then(() => {
            decrementConcurrency(parser);
            currentCallbackBytesRead = bytesReadBeforeCallbackCurrent;
          })
          .catch((err) => {
            decrementConcurrency(parser);
            rejectOnError(parser, err);
          });
      }

      parse(stream, {
        header: true,
        delimiter: ",",
        escapeChar: "\"",
        complete() {
          isFinished = true;
        },
        chunkSize,
        chunk(results, parser) {
          executeChunkCallback(parser, results);
        },
        error(error, file) {
          console.error("error", error, file);
          rejectOnError(null, error);
        }
      });
    })
  };
}
