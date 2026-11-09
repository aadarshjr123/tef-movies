import type { Resolvers } from "../../graphql/__generated__/resolvers";
import { requireAdmin, type GraphQLContext } from "../../graphql/context";
import type { Title } from "./title.types";

/** Field resolvers shared by Movie and TvShow (the Title interface). */
const titleFields = {
  year: (title: Title) => Number(title.releaseDate.slice(0, 4)),
  cast: (title: Title) => title.cast.map((member) => ({ name: member.name, role: member.character })),
  watchOptions: (title: Title) => title.watchOptions,
  similar: (title: Title, args: { limit?: number | null }, { services }: GraphQLContext) =>
    services.titles.similar(title, args.limit),
};

export const titleResolvers: Resolvers = {
  Query: {
    movies: (_, args, { services }) => services.titles.listMovies(args),
    movie: (_, { id }, { services }) => services.titles.getMovie(id),
    tvShows: (_, args, { services }) => services.titles.listTvShows(args),
    tvShow: (_, { id }, { services }) => services.titles.getTvShow(id),
    search: (_, { query, limit }, { services }) => services.titles.search(query, limit),
    latestTrailers: (_, { limit }, { services }) => services.titles.latestTrailers(limit),
  },

  Mutation: {
    createMovie: (_, { input }, ctx) => (requireAdmin(ctx), ctx.services.titles.createMovie(input)),
    updateMovie: (_, { id, input }, ctx) => (requireAdmin(ctx), ctx.services.titles.updateMovie(id, input)),
    deleteMovie: (_, { id }, ctx) => (requireAdmin(ctx), ctx.services.titles.deleteTitle(id, "MOVIE")),
    createTvShow: (_, { input }, ctx) => (requireAdmin(ctx), ctx.services.titles.createTvShow(input)),
    updateTvShow: (_, { id, input }, ctx) => (requireAdmin(ctx), ctx.services.titles.updateTvShow(id, input)),
    deleteTvShow: (_, { id }, ctx) => (requireAdmin(ctx), ctx.services.titles.deleteTitle(id, "TV_SHOW")),
    setSeason: (_, { tvShowId, input }, ctx) => (requireAdmin(ctx), ctx.services.titles.setSeason(tvShowId, input)),
    deleteSeason: (_, { tvShowId, number }, ctx) =>
      (requireAdmin(ctx), ctx.services.titles.deleteSeason(tvShowId, number)),
  },

  Title: {
    __resolveType: (title) => (title.kind === "MOVIE" ? "Movie" : "TvShow"),
  },

  Movie: {
    ...titleFields,
    directors: (movie) => movie.directors.map((name) => ({ name, role: "Director" })),
  },

  TvShow: {
    ...titleFields,
    creators: (show) => show.creators.map((name) => ({ name, role: "Creator" })),
    seasons: (show, _, { loaders }) => loaders.seasonsByTitleId.load(show.id),
  },

  Credit: {
    person: (credit, _, { loaders }) => loaders.personByName.load(credit.name),
  },

  WatchOption: {
    platform: (option, _, { loaders }) => loaders.platformByName.load(option.platform),
  },
};
