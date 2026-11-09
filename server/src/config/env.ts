import { z } from "zod";

const csv = z
  .string()
  .optional()
  .transform((value) =>
    value
      ? value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
  );

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    MONGODB_URI: z
      .string()
      .regex(/^mongodb(\+srv)?:\/\//, "must be a mongodb:// or mongodb+srv:// URI")
      .optional(),
    /** Origins allowed by CORS. Empty means any origin (development only). */
    CORS_ORIGINS: csv,
    /** Bearer token required for mutations. */
    ADMIN_TOKEN: z.string().min(16, "must be at least 16 characters").optional(),
    SEED_ON_START: z
      .enum(["true", "false"])
      .default("true")
      .transform((value) => value === "true"),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
    RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(300),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV !== "production") return;
    // A production deployment must not silently fall back to an in-memory
    // database or leave mutations open.
    for (const key of ["MONGODB_URI", "ADMIN_TOKEN"] as const) {
      if (!env[key]) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: "is required in production" });
      }
    }
  });

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues.map((issue) => `  ${issue.path.join(".")}: ${issue.message}`);
    throw new Error(`Invalid environment configuration:\n${problems.join("\n")}`);
  }
  return result.data;
}
