# GraphQL API reference

The API has a single endpoint, `POST /graphql`. Locally that's <http://localhost:4000/graphql>; open it in a browser to use GraphQL Playground, which has autocomplete and a schema explorer.

The schema is defined in [server/schema.js](../server/schema.js). Other routes:

| Route | Purpose |
| --- | --- |
| `GET /health` | `{ "ok": true }` when the database is connected |
| `GET /` | Redirects to `/graphql` |

## Data model

| Type | Mongo collection | Key fields |
| --- | --- | --- |
| `Movie` | `movies` | `name`, `storyline`, `rating[]` (`imdb`, `rottenTomatoes`, `mydramalist`), `casts[]`, `posters[]`, `rectanglePosters[]` (backdrops), `watchOn[]`, `movieInfo[]` (director, runtime, trailer `link`s, `releaseDate`, `dateFormat`, genres), `availLanguages[]` |
| `Tvshows` | `tvshows` | Same as `Movie`, plus `Type` (always `"Tvshows"`), and `tvshowInfo[]` (creators, `noOfseasons`, `status`, …) in place of `movieInfo` |
| `Seasons` | `seasons` | One document per season: `seasonId` (the show's `id`), `season` (`"Season 1"`), `seasonStart`, `seasonEnd`, `episodes[]` |
| `ActorSchema` | `actors` | `name`, `description`, `image`. Also used for directors and creators. |
| `CollectionsSchema` | `collections` | `name`, `image`, `type` (`"genre"` or `"collection"`). A tile matches movies whose genre list contains its `name`. |
| `OttSchema` | `otts` | Streaming platform: `name`, `image` (logo), `perMonth` (pricing label) |
| `TrailerSchema` | `trailers` | `name`, `link` (YouTube URL), `date` |

Conventions the client relies on:

- `releaseDate` is a display string (`"July 15, 2010"`), and `dateFormat` is the same date as a sortable `YYYYMMDD` string.
- `watchOn[].watchOn` is a platform name, optionally followed by an offer type: `"Netflix"`, `"Apple TV-Rent"`, `"YouTube-Free"`. The part before `-` must match an `OttSchema.name` for its logo to show.
- Images are full URLs. Bare Cloudinary public IDs from the 2022 data still work when `REACT_APP_CLOUDINARY_CLOUD` is set.

## Queries

| Query | Returns |
| --- | --- |
| `getMovies` | All movies |
| `getMovie(name)` | Movies with that exact name |
| `searchMovie(name)` | Movies whose title, genre or cast contains `name` (case-insensitive) |
| `searchMovieautoComplete(name)` | Fuzzy title search. Uses an Atlas Search index named `default` on `name` when one exists, and falls back to a regex match otherwise. |
| `searchActorMovie(casts)` | Movies featuring that cast member |
| `getTVshows` / `getTVshow1(Type)` / `getTVshow(name)` | All shows / shows of a `Type` / shows with that exact name |
| `searchTvshows(name)` | Shows whose title, genre or cast contains `name` |
| `searchActorTvshows(casts)` | Shows featuring that cast member |
| `getSeason(seasonId)` | All seasons of the show whose `id` is `seasonId` |
| `getActors` / `getActor(name)` | People |
| `getCollections` / `getCollection(name)` | Genre and collection tiles |
| `getOtts` / `getOtt(name)` | Streaming platforms |
| `getTrailers` / `getTrailer(name)` | Featured trailers |

### Examples

Latest movies, with what the cards need:

```graphql
{
  getMovies {
    id
    name
    posters { posters }
    watchOn { watchOn watchOnLink }
    movieInfo { releaseDate dateFormat genre { genre } }
  }
}
```

Search across movies and TV shows:

```graphql
{
  searchMovie(name: "nolan") { name }
  searchTvshows(name: "crime") { name }
}
```

A show and its episode guide:

```graphql
{
  getTVshow(name: "Breaking Bad") {
    id
    tvshowInfo { noOfseasons status }
  }
}

# then, with the id from above:
{
  getSeason(seasonId: "<show id>") {
    season
    seasonStart
    seasonEnd
    episodes { episodeName episodeDescription episodeDuration }
  }
}
```

From the command line:

```bash
curl http://localhost:4000/graphql \
  -H 'content-type: application/json' \
  -d '{"query":"{ getOtts { name perMonth } }"}'
```

## Mutations

Every collection has `add…`, `update…` and `delete…` mutations. Records are identified by `name`, and `update…` takes the new name as `changedName` (pass the same value to keep it).

| Collection | Mutations |
| --- | --- |
| Movies | `addMovie`, `updateMovie`, `deleteMovie` |
| TV shows | `addTvshow`, `updateTvshow`, `deleteTvshow` |
| Seasons | `addSeason`, `updateSeason` (matched by `seasonId` + `season`), `deleteSeason(seasonId)` |
| People | `addActors`, `updateActors`, `deleteActors` |
| Trailers | `addTrailers`, `updateTrailers`, `deleteTrailers` |
| Collections | `addCollections`, `updateCollections`, `deleteCollections` |
| Platforms | `addOtt`, `updateOtt`, `deleteOtt` |

`update…` and `delete…` return an error when no record has that name.

### Authorisation

When the server has `ADMIN_TOKEN` set, every mutation requires that token:

```bash
curl http://localhost:4000/graphql \
  -H 'content-type: application/json' \
  -H 'Authorization: Bearer <ADMIN_TOKEN>' \
  -d '{"query":"mutation { addOtt(name: \"MX Player\", image: \"https://example.com/mx.png\", perMonth: \"Free\") { name } }"}'
```

Without a valid token, the response is an `UNAUTHENTICATED` error. When `ADMIN_TOKEN` isn't set, mutations are open. That's convenient locally, but always set the token on a public deployment.

In GraphQL Playground, add the header in the **HTTP HEADERS** panel:

```json
{ "Authorization": "Bearer <ADMIN_TOKEN>" }
```

### Example: add a person

```graphql
mutation {
  addActors(
    name: "Florence Pugh"
    description: "Known for Oppenheimer, Dune: Part Two."
    image: "https://image.tmdb.org/t/p/w300_and_h450_face/<path>.jpg"
  ) {
    name
  }
}
```
