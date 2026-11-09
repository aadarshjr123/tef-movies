import mongoose from "mongoose";
import type { Env } from "../config/env";
import type { Logger } from "./logger";

export interface DatabaseConnection {
  disconnect(): Promise<void>;
}

/**
 * Connects to MONGODB_URI, or outside production starts a throwaway
 * in-memory MongoDB so the project runs with no setup.
 */
export async function connectDatabase(env: Pick<Env, "MONGODB_URI" | "NODE_ENV">, logger: Logger): Promise<DatabaseConnection> {
  let uri = env.MONGODB_URI;
  let stopMemoryServer = async () => {};

  if (!uri) {
    // Dev-only dependency, so it is loaded lazily and never in production.
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri("tefmovies");
    stopMemoryServer = async () => {
      await memoryServer.stop();
    };
    logger.warn("MONGODB_URI is not set: using an in-memory MongoDB (data resets on restart).");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  logger.info({ host: mongoose.connection.host }, "Connected to MongoDB");

  return {
    async disconnect() {
      await mongoose.disconnect();
      await stopMemoryServer();
    },
  };
}

export const isDatabaseReady = () => mongoose.connection.readyState === 1;
