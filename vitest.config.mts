import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "coverage/**",
        "dist/**",
        "**/[.]**",
        "**/*.d.ts",
        "**/*{.,-}{test,spec,stories,types}.?(c|m)[jt]s?(x)",
        "**/index.[jt]s?(x)"
      ],
      include: ["src/**/*"],
      reporter: ["text", "json-summary", "json"],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    environment: "jsdom",
    globals: true,
    include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
    setupFiles: ["./vitest-setup.ts"]
  }
});
