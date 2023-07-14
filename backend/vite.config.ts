import { defineConfig } from "vitest/dist/config";

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
