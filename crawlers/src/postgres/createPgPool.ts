/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createHash } from "crypto";
import pg, { QueryConfig, QueryResultRow } from "pg";

export type Connection = pg.PoolClient & {
  beginTransaction: () => Promise<void>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
  queryOneRow<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<R>;
};

export type WithPgConnection = <T> (fn: (conn: Connection) => Promise<T>) => Promise<T>;
export type CreatePgPoolResult = {
  withPgConnection: WithPgConnection;
  pool: pg.Pool;
  closePgConnection: () => Promise<void>;
};

let patched = false;
pg.types.setTypeParser(20, BigInt);


export async function createPgPool(config: pg.PoolConfig, logger: (payload: any) => void): Promise<CreatePgPoolResult> {
  const pool = new pg.Pool({
    ...config,
    idleTimeoutMillis: 0
  });

  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err, err.stack);
    logger({
      type: "postgres-pool-error",
      payload: err
    });
  });

  const withPgConnection: WithPgConnection = async (fn) => {
    const client: Connection = await pool.connect() as any;

    if (!patched) {
      patched = true;
      const proto = Object.getPrototypeOf(client);
      const originalPoolQuery = proto.query;
      // @ts-ignore
      proto.query = async function query(...args) {
        if (args.length > 1 && typeof args[0] === "string") {
          const queryStringHash = createHash("sha1").update(args[0]).digest("base64");

          args[0] = {
            text: args[0],
            values: args[1],
            name: `x-${queryStringHash}`
          };
          args.length = 1;
        }
        try {
          // @ts-ignore
          return await originalPoolQuery.apply(this, args);
        } catch (e) {
          // @ts-ignore
          const query = (args[0].text || "").length > 200 ? `${args[0].text.substring(0, 200)}...` : args[0].text;
          const valuesToString = JSON.stringify(args[0].values) || "";
          const values = valuesToString.length > 200 ? `${valuesToString.substring(0, 200)}...` : valuesToString;

          // @ts-ignore
          throw new Error(`${e.message} caused by query: ${query}\nvalues: ${values}`, { cause: e });
        }
      };
    }

    client.beginTransaction = async () => {
      await client.query("BEGIN");
    };

    client.commit = async () => {
      await client.query("COMMIT");
    };

    client.rollback = async () => {
      await client.query("ROLLBACK");
    };

    client.queryOneRow = async (queryTextOrConfig, values) => {
      const result = await client.query(queryTextOrConfig, values);
      if (result.rowCount !== 1) {
        throw new Error(`Expected 1 row, got ${result.rowCount}`);
      }

      return result.rows[0];
    };

    try {
      const result = await fn(client);
      return result;
    } finally {
      client.release();
    }
  };

  return {
    withPgConnection,
    pool,
    closePgConnection: () => pool.end()
  };
}
