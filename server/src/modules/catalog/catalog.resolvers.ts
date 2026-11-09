import type { Resolvers } from "../../graphql/__generated__/resolvers";
import { requireAdmin } from "../../graphql/context";

export const catalogResolvers: Resolvers = {
  Query: {
    collections: (_, { kind }, { services }) => services.catalog.listCollections(kind),
    platforms: (_, __, { services }) => services.catalog.listPlatforms(),
  },

  Mutation: {
    upsertCollection: (_, { input }, ctx) => (requireAdmin(ctx), ctx.services.catalog.upsertCollection(input)),
    deleteCollection: (_, { name }, ctx) => (requireAdmin(ctx), ctx.services.catalog.deleteCollection(name)),
    upsertPlatform: (_, { input }, ctx) => (requireAdmin(ctx), ctx.services.catalog.upsertPlatform(input)),
    deletePlatform: (_, { name }, ctx) => (requireAdmin(ctx), ctx.services.catalog.deletePlatform(name)),
  },
};
