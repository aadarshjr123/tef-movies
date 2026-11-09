import type { CodegenConfig } from "@graphql-codegen/cli";

// The server SDL (in *.typeDefs.ts files) is the single source of truth. This
// generates typed resolver signatures for the server and typed operations for
// the client, so neither can drift from the schema without a type error.
const domain = "../../modules";

const config: CodegenConfig = {
  schema: "server/src/**/*.typeDefs.ts",
  generates: {
    "server/src/graphql/__generated__/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        contextType: "../context#GraphQLContext",
        mapperTypeSuffix: "Model",
        // Resolvers receive domain objects; field resolvers fill in the rest.
        mappers: {
          Title: `${domain}/titles/title.types#Title`,
          Movie: `${domain}/titles/title.types#Movie`,
          TvShow: `${domain}/titles/title.types#TvShow`,
          Season: `${domain}/titles/title.types#Season`,
          Trailer: `${domain}/titles/title.types#TrailerParent`,
          WatchOption: `${domain}/titles/title.types#WatchOption`,
          Credit: `${domain}/titles/title.types#CreditParent`,
          Person: `${domain}/people/person#Person`,
          Platform: `${domain}/catalog/catalog#Platform`,
          Collection: `${domain}/catalog/catalog#Collection`,
        },
      },
    },
    // Typed operations for the client. documentMode "string" emits plain
    // query strings, so the browser bundle needs no GraphQL runtime.
    "client/src/graphql/__generated__/": {
      documents: ["client/src/**/*.{ts,tsx}", "!client/src/graphql/__generated__/**"],
      preset: "client",
      presetConfig: { fragmentMasking: false },
      config: { documentMode: "string", enumsAsTypes: true, useTypeImports: true },
    },
  },
};

export default config;
