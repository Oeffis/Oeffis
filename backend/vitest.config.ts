import swc from "unplugin-swc";
import { vi as viImport } from "vitest";
import { UserConfigExport } from "vitest/dist/config";

declare global {
    const vi: typeof viImport;
}

export default async (): Promise<UserConfigExport> => {
    const defineConfig = await import("vitest/dist/config").then((m) => m.defineConfig);
    return defineConfig({
        plugins: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            swc.vite() as any
        ],
        test: {
            globals: true,
            environment: "node",
            root: "src",
            cache: {
                dir: "../node_modules/.vitest"
            }
        }
    });
};
