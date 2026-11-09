import "dotenv/config";
import { loadEnv } from "../config/env";
import { connectDatabase } from "../lib/db";
import { createLogger } from "../lib/logger";
import { seedDatabase } from "./seed";

// `npm run seed`: resets the database at MONGODB_URI to the sample data.
const env = loadEnv();
const logger = createLogger(env);

if (!env.MONGODB_URI) {
  logger.error("Set MONGODB_URI (for example in server/.env) to the database you want to seed.");
  process.exit(1);
}

const db = await connectDatabase(env, logger);
try {
  await seedDatabase(logger);
} finally {
  await db.disconnect();
}
