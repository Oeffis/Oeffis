import { vi as viImport } from "vitest";
import { defineConfig } from "vitest/dist/config";

declare global {
    const vi: typeof viImport;
}

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        root: "src",
        cache: {
            dir: "../node_modules/.vitest",
        }
    }
});
