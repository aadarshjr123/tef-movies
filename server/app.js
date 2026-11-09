require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema");
const { seedIfEmpty } = require("./seed");

const PORT = process.env.PORT || 4000;

// Comma-separated list of origins allowed to call the API, e.g.
// "https://tef-movies.vercel.app,http://localhost:3000". Unset allows any origin.
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : true;

// Uses MONGODB_URI when set; otherwise starts a throwaway in-memory MongoDB so
// the project runs with no database setup at all.
async function connectDatabase() {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri("tefdatabase");
    console.log("No MONGODB_URI set: using an in-memory MongoDB (data resets on restart).");
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("Connected to MongoDB.");
}

async function start() {
  await connectDatabase();

  if (process.env.SEED_ON_START !== "false") {
    await seedIfEmpty();
  }

  const server = new ApolloServer({
    schema,
    // Keep GraphQL Playground and introspection on so visitors can explore the API.
    introspection: true,
    playground: true,
    context: ({ req }) => ({
      token: (req.headers.authorization || "").replace(/^Bearer\s+/i, ""),
    }),
  });

  const app = express();
  app.use(cors({ origin: corsOrigins }));
  app.get("/", (req, res) => res.redirect(server.graphqlPath));
  app.get("/health", (req, res) =>
    res.json({ ok: mongoose.connection.readyState === 1 })
  );
  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
