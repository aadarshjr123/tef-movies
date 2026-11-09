# GraphQL API reference

The API has a single endpoint, `POST /graphql` (locally <http://localhost:4000/graphql>). Opening it in a browser shows Apollo's Explorer, with autocomplete and the full schema.

The schema lives in `server/src/modules/*/*.typeDefs.ts`, and TypeScript types for both server and client are generated from it (`npm run codegen`).

| Route           | Purpose                                                      |
| --------------- | ------------------------------------------------------------ |
| `POST /graphql` | GraphQL queries and mutations                                |
| `GET /health`   | `200 {"ok":true}` when connected to MongoDB, `503` otherwise |

## Types

```graphql
interface Title {            # implemented by Movie and TvShow
  id: ID!
  kind: TitleKind!           # MOVIE | TV_SHOW
  name: String!
  overview: String!
  posterUrl: String
  backdropUrl: String
  releaseDate: String!       # ISO date, e.g. "2010-07-15"
  year: Int!
  certification: String
  genres: [String!]!
  collections: [String!]!    # curated collections, e.g. "Christopher Nolan"
  languages: [String!]!
  ratings: Ratings!          # { imdb: Float, rottenTomatoes: Int }
  cast: [Credit!]!           # { name, role, person { imageUrl … } }
  trailers: [Trailer!]!      # { name, youtubeId }
  watchOptions: [WatchOption!]!  # { platform { name logoUrl pricing }, type: SUBSCRIPTION|FREE|RENT|BUY, url }
  similar(limit: Int = 12): [Title!]!
}

type Movie implements Title { …; runtimeMinutes: Int; directors: [Credit!]! }
type TvShow implements Title { …; creators: [Credit!]!; status: String; seasonCount: Int!; seasons: [Season!]! }
type Season { number: Int!; startDate: String; endDate: String; episodes: [Episode!]! }
type Person { name: String!; imageUrl: String; bio: String; movies: [Movie!]!; tvShows: [TvShow!]! }
type Collection { name: String!; kind: CollectionKind!; imageUrl: String }   # GENRE | COLLECTION
type Platform { name: String!; logoUrl: String; pricing: String }
```

## Queries

| Query                                                          | Returns                                                                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `movies(filter, sort, limit)` / `tvShows(filter, sort, limit)` | Filtered, sorted list (`limit` 1–100, default 20)                                              |
| `movie(id)` / `tvShow(id)`                                     | One title, or `null`                                                                           |
| `search(query, limit)`                                         | Movies and TV shows whose title, genre, collection or cast contains `query` (2–100 characters) |
| `latestTrailers(limit)`                                        | The first trailer of the most recently released titles                                         |
| `people(limit)` / `person(name)`                               | Most-credited people first / one person (case-insensitive) with their titles                   |
| `collections(kind)` / `platforms`                              | Browse tiles / streaming services                                                              |

`TitleFilter` fields can be combined:

| Field                   | Matches                                             |
| ----------------------- | --------------------------------------------------- |
| `genre`                 | `genres` (case-insensitive)                         |
| `collection`            | `collections`                                       |
| `person`                | Cast members, directors or creators                 |
| `platform`, `watchType` | A watch option with that platform and/or offer type |

`TitleSort` is one of `RELEASE_DATE_DESC` (default), `IMDB_RATING_DESC` or `NAME_ASC`.

### Examples

Top-rated movies streaming on Netflix:

```graphql
{
  movies(filter: { platform: "Netflix", watchType: SUBSCRIPTION }, sort: IMDB_RATING_DESC, limit: 3) {
    name
    ratings {
      imdb
    }
  }
}
```

A TV show with its episode guide, cast photos and similar shows, in one request:

```graphql
query ($id: ID!) {
  tvShow(id: $id) {
    name
    seasons {
      number
      episodes {
        number
        name
        runtimeMinutes
      }
    }
    cast {
      name
      role
      person {
        imageUrl
      }
    }
    similar(limit: 6) {
      name
    }
  }
}
```

Search across both kinds, with type-specific fields:

```graphql
{
  search(query: "nolan") {
    __typename
    name
    ... on Movie {
      runtimeMinutes
    }
    ... on TvShow {
      seasonCount
    }
  }
}
```

From the command line:

```bash
curl http://localhost:4000/graphql -H 'content-type: application/json' \
  -d '{"query":"{ platforms { name pricing } }"}'
```

## Mutations

Mutations require `Authorization: Bearer <ADMIN_TOKEN>`. If the server has no `ADMIN_TOKEN` configured, all mutations are rejected.

| Mutation                                                             | Notes                                                       |
| -------------------------------------------------------------------- | ----------------------------------------------------------- |
| `createMovie(input)`, `updateMovie(id, input)`, `deleteMovie(id)`    | `update` replaces every field                               |
| `createTvShow(input)`, `updateTvShow(id, input)`, `deleteTvShow(id)` | Deleting a show also deletes its seasons                    |
| `setSeason(tvShowId, input)`, `deleteSeason(tvShowId, number)`       | `setSeason` creates or replaces the season with that number |
| `upsertPerson(input)`, `deletePerson(name)`                          |                                                             |
| `upsertCollection(input)`, `deleteCollection(name)`                  |                                                             |
| `upsertPlatform(input)`, `deletePlatform(name)`                      |                                                             |

Inputs are validated: URLs must be `http(s)` or site-relative, dates must be ISO `YYYY-MM-DD`, IMDb ratings are 0–10, Rotten Tomatoes 0–100, YouTube IDs are 11 characters.

```bash
curl http://localhost:4000/graphql -H 'content-type: application/json' \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"query":"mutation { upsertPlatform(input: { name: \"MUBI\", pricing: \"Subscription\" }) { name } }"}'
```

In Explorer, add the header under **Headers**.

## Errors

Errors follow the GraphQL spec, with a machine-readable `extensions.code`:

| Code                        | When                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| `BAD_USER_INPUT`            | Invalid input. `extensions.issues` lists `{ path, message }` per field.           |
| `UNAUTHENTICATED`           | A mutation without a valid admin token                                            |
| `NOT_FOUND`                 | Updating or deleting something that doesn't exist (queries return `null` instead) |
| `GRAPHQL_VALIDATION_FAILED` | Malformed query, unknown field, or nesting deeper than 8 levels                   |
| `INTERNAL_SERVER_ERROR`     | Unexpected failure (details hidden in production, logged on the server)           |

```json
{
  "errors": [
    {
      "message": "Invalid input.",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "issues": [{ "path": "releaseDate", "message": "must be an ISO date (YYYY-MM-DD)" }]
      }
    }
  ]
}
```

## Limits

- Lists return at most 100 items; search at most 50.
- Queries nested deeper than 8 levels are rejected.
- `/graphql` allows `RATE_LIMIT_PER_MINUTE` requests per IP (default 300); responses include `RateLimit` headers.
- Request bodies are limited to 1 MB.
