import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    // Integration suites each start an in-memory MongoDB; give the first
    // binary download time to finish.
    hookTimeout: 120_000,
    testTimeout: 20_000,
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/server.ts", "src/seed/cli.ts", "src/**/*.typeDefs.ts"],
    },
  },
});
