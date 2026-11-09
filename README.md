# TEF Movies

A movie and TV show discovery site: browse what's new, watch trailers, explore cast and episode guides, and find where each title is streaming in India.

Full-stack TypeScript: a **React 19 + Redux Toolkit** frontend talking to a **GraphQL API** (Apollo Server, Express, MongoDB), with unit, integration and end-to-end tests and CI.

[![CI](https://github.com/aadarshjr123/tef-movies/actions/workflows/ci.yml/badge.svg)](https://github.com/aadarshjr123/tef-movies/actions/workflows/ci.yml)

![Home page](docs/screenshots/home.png)

| Movie page                                | Light theme                                                      | Mobile                                           |
| ----------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| ![Movie page](docs/screenshots/movie.png) | ![Movies page in light theme](docs/screenshots/movies-light.png) | ![Mobile home page](docs/screenshots/mobile.png) |

## Features

- **Home, Movies and TV Shows pages** with a hero carousel and rows for latest releases, trailers, IMDb top 10, free titles and each streaming platform
- **Title pages** with trailers, cast and crew, ratings, where to watch, and similar titles
- **Episode guides** for every TV show
- **Genres, curated collections and people pages** that link everything together
- **Search** by title, genre or cast, with shareable URLs
- **Light and dark themes**, a responsive layout from phones to wide screens, and an accessible design (Lighthouse accessibility 100)

## Tech stack

|              |                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| **Frontend** | React 19, TypeScript, Redux Toolkit + RTK Query, React Router 7, Tailwind CSS, Vite                          |
| **API**      | Node.js, TypeScript, Apollo Server 5, Express 5, DataLoader, zod, pino                                       |
| **Database** | MongoDB with Mongoose 8                                                                                      |
| **Quality**  | Vitest, Testing Library, MSW, Playwright, axe-core, GraphQL Code Generator, ESLint, Prettier, GitHub Actions |
| **Delivery** | Docker, docker-compose, Render, Vercel                                                                       |

Why each of these was chosen, and how the code is organised, is explained in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## Getting started

**Prerequisites:** Node.js 20 or newer. MongoDB is optional.

```bash
git clone https://github.com/aadarshjr123/tef-movies.git
cd tef-movies
npm install
npm run dev
```

- Website: <http://localhost:5173>
- GraphQL Explorer: <http://localhost:4000/graphql>

Without `MONGODB_URI`, the API starts an in-memory MongoDB seeded with sample data (the first run downloads the MongoDB binary). To use a real database, copy `server/.env.example` to `server/.env` and set `MONGODB_URI`. Run `npm run seed` to reset it to the sample data.

To run the production-like stack instead (MongoDB, the API image and nginx), use `docker compose up --build` and open <http://localhost:8080>.

## Scripts

| Command                           | What it does                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`                     | API and website with hot reload                                                               |
| `npm test`                        | Unit and integration tests (API and frontend)                                                 |
| `npm run test:e2e`                | Playwright end-to-end tests on desktop and mobile (builds the client and starts both servers) |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                                             |
| `npm run typecheck`               | TypeScript, both packages                                                                     |
| `npm run codegen`                 | Regenerate GraphQL types after changing the schema or a query                                 |
| `npm run verify`                  | Everything CI checks except e2e                                                               |
| `npm run build`                   | Production builds of both packages                                                            |

## Project structure

```
server/   GraphQL API: modules (titles, people, catalog) split into model → repository → service → resolvers
client/   React app: features (titles, people, search, player, theme…), shared UI kit, Redux store
e2e/      Playwright tests
docs/     Architecture, API reference, deployment guide, audit
```

## Documentation

- **[Architecture](docs/ARCHITECTURE.md):** system design, SOLID, state management, performance, testing strategy, and why each tool was chosen
- **[Audit](docs/AUDIT.md):** what was weak in the 2022 version, what changed, and before/after measurements
- **[API reference](docs/API.md):** schema, queries, mutations, errors and limits
- **[Deployment](docs/DEPLOYMENT.md):** Atlas + Render + Vercel, Docker, CI and environment variables

## Testing

| Suite                       | Count | Covers                                                                                                                                                   |
| --------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API unit + integration      | 51    | Services against in-memory repositories; the HTTP API against a real MongoDB, including auth, validation, depth limiting and N+1 batching                |
| Frontend unit + integration | 39    | Redux slices and middleware, data fetching and error handling, components, and whole pages through the real router and store with a mocked network (MSW) |
| End-to-end                  | 46    | User journeys, layout overflow and axe accessibility checks on desktop and mobile, in both themes                                                        |

Coverage is 92% for the API and 88% for the frontend (statements).

## Project history

TEF Movies started in 2022 as four repositories: [MovieTEF-new](https://github.com/aadarshjr123/MovieTEF-new) (React frontend), [TEFBackend](https://github.com/aadarshjr123/TEFBackend), [BackendTEF](https://github.com/aadarshjr123/BackendTEF) and [TEFMoviesBackend](https://github.com/aadarshjr123/TEFMoviesBackend) (three copies of the GraphQL API for different hosts). They were merged here with their git history and then rebuilt in TypeScript with a layered API, Redux on the frontend and a full test suite. [docs/AUDIT.md](docs/AUDIT.md) has the details.

## Data and credits

Movie and TV metadata, images and trailer links come from [TMDB](https://www.themoviedb.org/), and streaming availability for India comes from [JustWatch](https://www.justwatch.com/) via TMDB. This product uses TMDB data but is not endorsed or certified by TMDB. IMDb and Rotten Tomatoes scores in the sample data are approximate.

## License

[MIT](LICENSE) © Aadarsh Sasikumar
