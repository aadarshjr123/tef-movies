import type { Resolvers } from "../../graphql/__generated__/resolvers";
import { requireAdmin } from "../../graphql/context";
import type { Movie, TvShow } from "../titles/title.types";

export const personResolvers: Resolvers = {
  Query: {
    people: (_, { limit }, { services }) => services.people.list(limit),
    person: (_, { name }, { services }) => services.people.get(name),
  },

  Mutation: {
    upsertPerson: (_, { input }, ctx) => (requireAdmin(ctx), ctx.services.people.upsert(input)),
    deletePerson: (_, { name }, ctx) => (requireAdmin(ctx), ctx.services.people.delete(name)),
  },

  Person: {
    movies: async (person, _, { services }) =>
      (await services.titles.listByPerson("MOVIE", person.name)) as Movie[],
    tvShows: async (person, _, { services }) =>
      (await services.titles.listByPerson("TV_SHOW", person.name)) as TvShow[],
  },
};
