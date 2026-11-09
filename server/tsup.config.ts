import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts", "src/seed/cli.ts"],
  format: ["esm"],
  target: "node20",
  platform: "node",
  sourcemap: true,
  clean: true,
  // Keep dependencies external; the production image installs them with npm ci.
  skipNodeModulesBundle: true,
});
