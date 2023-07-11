import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: `support.ts`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
