import { HttpResponse, graphql } from "msw";
import { setupServer } from "msw/node";
import { cardFixture, movieDetailsFixture, spotlightFixture, tvShowDetailsFixture } from "./fixtures";

/**
 * Default API responses for component and page tests. MSW intercepts fetch at
 * the network layer, so tests exercise the real RTK Query + base query code.
 * Individual tests override handlers with `server.use(...)`.
 */
export const handlers = [
  graphql.query("Movies", ({ variables }) =>
    HttpResponse.json({
      data: {
        movies:
          variables.filter?.watchType === "FREE"
            ? [cardFixture({ name: "Nosferatu" })]
            : [cardFixture({ name: "Dune: Part Two" }), cardFixture({ name: "Oppenheimer" })],
      },
    }),
  ),
  graphql.query("TvShows", ({ variables }) =>
    HttpResponse.json({
      data: {
        tvShows:
          variables.filter?.watchType === "FREE"
            ? []
            : [cardFixture({ name: "Dark", kind: "TV_SHOW", __typename: "TvShow" } as never)],
      },
    }),
  ),
  graphql.query("SpotlightMovies", () => HttpResponse.json({ data: { movies: [spotlightFixture()] } })),
  graphql.query("SpotlightTvShows", () =>
    HttpResponse.json({ data: { tvShows: [spotlightFixture({ name: "Dark", kind: "TV_SHOW" })] } }),
  ),
  graphql.query("LatestTrailers", () =>
    HttpResponse.json({
      data: {
        latestTrailers: [
          {
            name: "Official Trailer",
            youtubeId: "Way9Dexny3w",
            title: { __typename: "Movie", id: "m1", kind: "MOVIE", name: "Dune: Part Two" },
          },
        ],
      },
    }),
  ),
  graphql.query("Collections", ({ variables }) =>
    HttpResponse.json({
      data: {
        collections: [
          { name: variables.kind === "GENRE" ? "Drama" : "Oscar Winners", kind: variables.kind, imageUrl: null },
        ],
      },
    }),
  ),
  graphql.query("People", () =>
    HttpResponse.json({ data: { people: [{ name: "Christopher Nolan", imageUrl: null }] } }),
  ),
  graphql.query("MovieDetails", ({ variables }) =>
    HttpResponse.json({
      data: { movie: variables.id === "missing" ? null : movieDetailsFixture({ id: variables.id }) },
    }),
  ),
  graphql.query("TvShowDetails", ({ variables }) =>
    HttpResponse.json({ data: { tvShow: tvShowDetailsFixture({ id: variables.id }) } }),
  ),
  graphql.query("SearchTitles", ({ variables }) =>
    HttpResponse.json({
      data: {
        search: String(variables.query).toLowerCase().includes("nolan")
          ? [cardFixture({ name: "Inception" }), cardFixture({ name: "Westworld", kind: "TV_SHOW" })]
          : [],
      },
    }),
  ),
];

export const server = setupServer(...handlers);
