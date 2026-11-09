import { pino, type Logger } from "pino";
import type { Env } from "../config/env";

export type { Logger };

export function createLogger(env: Pick<Env, "NODE_ENV" | "LOG_LEVEL">): Logger {
  return pino({
    level: env.NODE_ENV === "test" ? "silent" : env.LOG_LEVEL,
    // Human-readable logs locally; structured JSON (for log aggregation) elsewhere.
    transport:
      env.NODE_ENV === "development"
        ? { target: "pino-pretty", options: { colorize: true, ignore: "pid,hostname" } }
        : undefined,
    redact: ["req.headers.authorization"],
  });
}
