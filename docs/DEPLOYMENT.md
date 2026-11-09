# Deployment guide

| Part     | Recommended host                | Config in this repo                                                      |
| -------- | ------------------------------- | ------------------------------------------------------------------------ |
| Database | MongoDB Atlas (free M0 cluster) | —                                                                        |
| API      | Render (Docker web service)     | [render.yaml](../render.yaml), [server/Dockerfile](../server/Dockerfile) |
| Website  | Vercel (static build)           | [client/vercel.json](../client/vercel.json)                              |

Deploy them in this order, because each step needs a URL from the previous one.

## 1. MongoDB Atlas

1. Create a free **M0** cluster at <https://cloud.mongodb.com>.
2. Under **Database Access**, add a user with a generated password.
3. Under **Network Access**, allow `0.0.0.0/0` (Render's free tier has no fixed outbound IP).
4. Copy the connection string from **Connect → Drivers** and add a database name:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/tefmovies?retryWrites=true&w=majority`

The API seeds the sample data the first time it connects to an empty database.

## 2. API on Render

1. In Render, choose **New → Blueprint** and select this repository. Render reads `render.yaml` and builds `server/Dockerfile`.
2. Set `MONGODB_URI` to the Atlas string. `ADMIN_TOKEN` is generated for you; copy it from the **Environment** tab when you need to run mutations.
3. Deploy, then check `https://<your-api>.onrender.com/health` (it should return `{"ok":true}`).

Production refuses to start without `MONGODB_URI` and `ADMIN_TOKEN`, so a misconfigured deploy fails loudly instead of running against an empty in-memory database. Free Render services sleep after 15 idle minutes, and the first request afterwards takes about 30 seconds.

## 3. Website on Vercel

1. **Add New → Project**, import the repository, and set **Root Directory** to `client`.
2. Add the environment variable `VITE_API_URL` = `https://<your-api>.onrender.com/graphql`.
3. Deploy. `vercel.json` adds SPA rewrites and long-lived caching for hashed assets.

`VITE_API_URL` is compiled into the build, so redeploy after changing it.

## 4. Lock down CORS

In Render, set `CORS_ORIGINS` to the Vercel URL (for example `https://tef-movies.vercel.app`; several origins can be comma-separated) and save.

## Environment variables

### API (`server/.env`)

| Variable                | Default                       | Notes                                    |
| ----------------------- | ----------------------------- | ---------------------------------------- |
| `NODE_ENV`              | `development`                 | `production` in the Docker image         |
| `MONGODB_URI`           | _(in-memory)_                 | Required in production                   |
| `ADMIN_TOKEN`           | _(unset: mutations disabled)_ | ≥16 characters; required in production   |
| `PORT`                  | `4000`                        |                                          |
| `CORS_ORIGINS`          | _(any origin)_                | Comma-separated                          |
| `SEED_ON_START`         | `true`                        | Seeds sample data into an empty database |
| `LOG_LEVEL`             | `info`                        | `fatal` … `trace`, or `silent`           |
| `RATE_LIMIT_PER_MINUTE` | `300`                         | Per IP, on `/graphql`                    |

### Website (`client/.env`)

| Variable       | Default                         |
| -------------- | ------------------------------- |
| `VITE_API_URL` | `http://localhost:4000/graphql` |

## Docker

A production-like stack (MongoDB, the API image and the site served by nginx) runs with one command:

```bash
docker compose up --build
# site: http://localhost:8080   API: http://localhost:4000/graphql
```

The images can also be built and pushed on their own. The build context is the repository root, because the workspaces share one lockfile:

```bash
docker build -f server/Dockerfile -t tef-movies-api .
docker build -f client/Dockerfile --build-arg VITE_API_URL=https://api.example.com/graphql -t tef-movies-web .
```

The API image runs as a non-root user, contains only production dependencies, and has a `HEALTHCHECK` on `/health`. The web image is nginx with SPA routing, security headers and immutable caching for `/assets`.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull request:

1. **verify:** install, check generated GraphQL types are committed, lint, check formatting, typecheck, run unit and integration tests with coverage, build both packages.
2. **e2e:** start the API and the production client build, then run the Playwright suite on desktop and mobile viewports. On failure, the HTML report is uploaded as an artifact.

## Troubleshooting

| Symptom                                            | Likely cause                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Rows show "Couldn't reach the server"              | `VITE_API_URL` is wrong, or the API is asleep or down. Check `/health`.                    |
| CORS error in the browser console                  | The site's origin isn't in `CORS_ORIGINS` (it must match exactly, with no trailing slash). |
| API exits with "Invalid environment configuration" | A required variable is missing or invalid; the message names it.                           |
| `MongooseServerSelectionError` in API logs         | Atlas network access or credentials                                                        |
| Mutations return `UNAUTHENTICATED`                 | Missing or wrong `Authorization: Bearer <ADMIN_TOKEN>` header                              |
