import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1000,
  // eslint-disable-next-line sort-keys
  viewportHeight: 660,
  defaultCommandTimeout: 5000,
  e2e: {
    specPattern: "**/*.spec.ts",
    supportFile: false
  }
});
