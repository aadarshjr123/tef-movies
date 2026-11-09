import "dotenv/config";
import { createApp } from "./app";
import { loadEnv } from "./config/env";
import { createServices } from "./container";
import { connectDatabase } from "./lib/db";
import { createLogger } from "./lib/logger";
import { seedIfEmpty } from "./seed/seed";

const env = loadEnv();
const logger = createLogger(env);

async function main() {
  const db = await connectDatabase(env, logger);
  if (env.SEED_ON_START) await seedIfEmpty(logger);

  const server = createApp({ env, logger, services: createServices() });
  await server.start();
  await new Promise<void>((resolve) => server.httpServer.listen(env.PORT, resolve));
  logger.info(`API ready at http://localhost:${env.PORT}/graphql`);

  // Graceful shutdown: stop accepting requests, let in-flight ones finish
  // (Apollo's drain plugin), then close the database connection.
  let shuttingDown = false;
  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, "Shutting down");
    const forceExit = setTimeout(() => process.exit(1), 10_000).unref();
    try {
      await server.stop();
      await db.disconnect();
      clearTimeout(forceExit);
      process.exit(0);
    } catch (error) {
      logger.error({ err: error }, "Error during shutdown");
      process.exit(1);
    }
  };
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
}

main().catch((error: unknown) => {
  logger.fatal({ err: error }, "Failed to start");
  process.exit(1);
});
