import http from "node:http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@as-integrations/express5";
import compression from "compression";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import depthLimit from "graphql-depth-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import type { Env } from "./config/env";
import { createLoaders, isAdminToken, type GraphQLContext, type Services } from "./graphql/context";
import { schema } from "./graphql/schema";
import { isDatabaseReady } from "./lib/db";
import { createErrorFormatter } from "./lib/errors";
import type { Logger } from "./lib/logger";

export interface AppDependencies {
  env: Env;
  logger: Logger;
  services: Services;
}

export interface App {
  app: express.Express;
  httpServer: http.Server;
  /** Starts Apollo and mounts /graphql. Call before listening. */
  start(): Promise<void>;
  stop(): Promise<void>;
}

/** Builds the HTTP app without listening, so tests can drive it with supertest. */
export function createApp({ env, logger, services }: AppDependencies): App {
  const app = express();
  const httpServer = http.createServer(app);
  const isProduction = env.NODE_ENV === "production";

  const apollo = new ApolloServer<GraphQLContext>({
    schema,
    // The public demo keeps introspection and the Explorer landing page on.
    introspection: true,
    formatError: createErrorFormatter(isProduction),
    // Rejects deeply nested queries (e.g. person → movies → cast → person …).
    validationRules: [depthLimit(8)],
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  app.set("trust proxy", 1);
  app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === "/health" } }));
  // The Explorer landing page loads scripts from Apollo's CDN, so CSP is left
  // to the frontend host; the other helmet headers still apply.
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
  app.use(compression());
  // maxAge lets browsers cache the CORS preflight for 10 minutes, saving a
  // round trip before most API calls.
  app.use(cors({ origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : true, maxAge: 600 }));

  app.get("/health", (_req, res) => {
    const ready = isDatabaseReady();
    res.status(ready ? 200 : 503).json({ ok: ready });
  });
  app.get("/", (_req, res) => res.redirect("/graphql"));

  return {
    app,
    httpServer,
    async start() {
      await apollo.start();
      app.use(
        "/graphql",
        rateLimit({
          windowMs: 60_000,
          limit: env.RATE_LIMIT_PER_MINUTE,
          standardHeaders: "draft-7",
          legacyHeaders: false,
        }),
        express.json({ limit: "1mb" }),
        expressMiddleware(apollo, {
          context: async ({ req }) => ({
            services,
            loaders: createLoaders(services),
            isAdmin: isAdminToken(req.headers.authorization, env.ADMIN_TOKEN),
          }),
        }),
      );
    },
    async stop() {
      await apollo.stop();
    },
  };
}
