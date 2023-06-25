import { HafasClient } from "hafas-client";

/**
 * Import of hafas-client (workaround to use ESM inside CommonJS project).
 */
export async function importHafasClient(): Promise<HafasClient> {
  const { createClient } = await (
    eval("import(\"hafas-client\")") as Promise<typeof import("hafas-client")>);
  // Using DB (= 'Deutsche Bahn') profile.
  const { profile } = await (
    eval("import(\"hafas-client/p/db/index.js\")") as Promise<typeof import("hafas-client/p/db/index.js")>);

  // Our userAgent is named "oeffis". Hafas-client is doing some extra randomization on top of that.
  const userAgent = "oeffis";
  return createClient(profile, userAgent);
}
