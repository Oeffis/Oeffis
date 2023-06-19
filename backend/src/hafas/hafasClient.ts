import { HafasClient } from "hafas-client";

/**
 * Import of hafas-client (workaround to use ESM inside CommonJS project).
 */
export async function importHafasClient(): Promise<HafasClient> {
    const { createClient } = await (
        eval("import(\"hafas-client\")") as Promise<typeof import("hafas-client")>);
    const { profile } = await (
        eval("import(\"hafas-client/p/db/index.js\")") as Promise<typeof import("hafas-client/p/db/index.js")>);

    const userAgent = "oeffis";
    return createClient(profile, userAgent);
}
