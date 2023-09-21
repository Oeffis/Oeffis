import { createReadStream } from "fs";
import { parse } from "papaparse";
import { join } from "path";
import { createInterface } from "readline";
import { TableSchema } from "../tableSchema";

export async function buildCreateTableSchemaSql(folder: string, schema: TableSchema): Promise<[string, string[]]> {
  const csvPath = join(folder, schema.csv);

  const csvHeaders = await getCsvHeaderNames(csvPath);

  const columns = csvHeaders
    .map((header) => buildFieldSql(schema, header))
    .join(", ");

  return [
    `CREATE TABLE "${schema.name}" (${columns})`,
    csvHeaders
  ];
}

function buildFieldSql(schema: TableSchema, field: string): string {
  const fieldType = schema.determineFieldType ? schema.determineFieldType(field) : "TEXT NOT NULL";

  if (schema.primaryKey === field) {
    return `"${field}" ${fieldType} PRIMARY KEY`;
  }

  return `"${field}" ${fieldType}`;
}

function readFirstLineOfFile(pathToFile: string): Promise<string> {
  const readable = createReadStream(pathToFile);
  const reader = createInterface({ input: readable });
  return new Promise<string>((resolve, reject) => {
    reader.on("line", (line) => {
      reader.close();
      resolve(line);
    });
    reader.on("close", () => {
      readable.close();
    });
    reader.on("error", (err) => {
      readable.close();
      reject(err);
    });
  });
}

async function getCsvHeaderNames(csvPath: string): Promise<string[]> {
  const csvHeader = await readFirstLineOfFile(csvPath);
  const { data } = parse(csvHeader, {
    delimiter: ","
  });

  return data[0] as string[];
}

export async function buildDropTableSchemaSql(schema: TableSchema): Promise<string> {
  return `DROP TABLE IF EXISTS "${schema.name}" CASCADE`;
}
