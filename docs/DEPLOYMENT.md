# Deployment guide

The recommended setup uses free tiers throughout:

| Part | Host | Why |
| --- | --- | --- |
| Database | MongoDB Atlas (M0 free cluster) | Managed MongoDB |
| API (`server/`) | Render web service | Long-running Node process; blueprint included in [render.yaml](../render.yaml) |
| Website (`client/`) | Vercel | Static React build; SPA routing in [client/vercel.json](../client/vercel.json) |

Deploy them in that order, because each step needs a URL from the one before.

## 1. MongoDB Atlas

1. Create a free **M0** cluster at <https://cloud.mongodb.com>.
2. Under **Database Access**, add a database user with a generated password.
3. Under **Network Access**, allow `0.0.0.0/0`. Render's free tier has no fixed outbound IP.
4. Under **Connect → Drivers**, copy the connection string and add a database name before the `?`:

   ```
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/tefdatabase?retryWrites=true&w=majority
   ```

The API seeds the sample data the first time it connects to an empty database.

**Optional:** for fuzzy autocomplete (`searchMovieautoComplete`), create an Atlas Search index named `default` on the `movies` collection, with an `autocomplete` mapping on `name`. Without it, the query falls back to a regex match.

## 2. API on Render

1. In Render, choose **New → Blueprint** and select this repository. Render reads `render.yaml` and creates the `tef-movies-api` service.
2. When prompted, fill in the environment variables:
   - `MONGODB_URI`: the Atlas connection string from step 1.
   - `CORS_ORIGINS`: leave empty for now; you'll set it in step 4.
   - `ADMIN_TOKEN`: generated automatically. Copy it from the service's **Environment** tab when you need to run mutations.
3. Deploy. When it's live, check `https://<your-api>.onrender.com/health` (it should return `{"ok":true}`) and open `/graphql` to see the Playground.

Free Render services sleep after 15 minutes of inactivity, so the first request after a pause takes around 30 seconds.

<details>
<summary>Manual setup (without the blueprint)</summary>

Create a **Web Service** with root directory `server`, build command `npm ci`, start command `npm start` and health check path `/health`. Then add the environment variables above.
</details>

## 3. Website on Vercel

1. In Vercel, choose **Add New → Project** and import this repository.
2. Set **Root Directory** to `client`. Vercel detects Create React App.
3. Add the environment variable `REACT_APP_API_URL` = `https://<your-api>.onrender.com/graphql`.
4. Deploy.

`REACT_APP_API_URL` is baked in at build time, so redeploy the site after changing it.

## 4. Lock down CORS

Back in Render, set `CORS_ORIGINS` to your Vercel URL (for example `https://tef-movies.vercel.app`) and save. The service restarts with the new setting.

## Alternatives

- **Railway / Fly.io / any Node host** can run the API the same way: run `npm ci && npm start` in `server/` with the same environment variables.
- **Netlify** can host the site. Set the base directory to `client`, the build command to `npm run build` and the publish directory to `build`, and add a `client/public/_redirects` file containing `/* /index.html 200` for client-side routing.
- **Without Atlas:** if `MONGODB_URI` is unset, the API runs on an in-memory database seeded at startup. That's fine for a demo, but changes are lost on every restart.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Site shows "Something went wrong!" or loads forever | `REACT_APP_API_URL` is wrong, or the API is asleep or down. Check `/health`. |
| Browser console shows a CORS error | The site's origin is missing from `CORS_ORIGINS` (it must match exactly, with no trailing slash). |
| API logs `MongoServerSelectionError` | Atlas network access doesn't allow Render, or the user or password is wrong. |
| Mutations return `UNAUTHENTICATED` | Send `Authorization: Bearer <ADMIN_TOKEN>`. |
| Refreshing a page like `/Movies` gives a 404 | SPA rewrites are missing (see `client/vercel.json`). |
