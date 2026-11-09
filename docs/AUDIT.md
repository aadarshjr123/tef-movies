# Audit and improvements

This document records where the 2022 codebase was weak, what was changed, and the measured results. It was a refactor, not a feature project: every page and feature of the original site still exists, and the visual design (dark navy, purple–pink gradients, Roboto Mono) is kept.

## Results

Measured locally with Lighthouse 12 (mobile preset unless noted) and the project's own tooling.

| Metric                                  | Before (2022 code)         | After                                                        |
| --------------------------------------- | -------------------------- | ------------------------------------------------------------ |
| Lighthouse performance, home (mobile)   | 56                         | **91**                                                       |
| Lighthouse performance, home (desktop)  | 91                         | **99**                                                       |
| Lighthouse accessibility                | 79                         | **100**                                                      |
| Largest Contentful Paint, home (mobile) | 7.5 s                      | **3.1 s**                                                    |
| Cumulative Layout Shift, home (mobile)  | 0.20                       | **0.06**                                                     |
| Page weight, home                       | 4.5 MB                     | **2.2 MB**                                                   |
| JavaScript (gzip)                       | 448 KB in one bundle       | 131 KB cached vendor + ~9 KB app entry + 0.5–2.5 KB per page |
| Frontend source                         | ~9,000 lines of JavaScript | ~2,550 lines of TypeScript                                   |
| Automated tests                         | 0                          | 51 API + 39 frontend + 46 end-to-end                         |
| Test coverage                           | —                          | API 92%, frontend 88% (statements)                           |
| Type safety                             | none                       | strict TypeScript; API types generated from the schema       |

## Frontend findings

| Area            | Finding (2022)                                                                                                                                             | Change                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Structure       | Components fetched data, transformed it and rendered it; 16 components called the API directly with 43 inline queries                                      | Feature folders; data access only through RTK Query endpoints; presentational components receive data                                 |
| Duplication     | 9 card components, 2 detail pages of 900–1,100 lines, duplicated Movies/TV pages, 32 copy-pasted scroll handlers                                           | One component per pattern (`TitleCard`, `HorizontalScroller`, `TitleDetailsView`…); pages parameterised by kind                       |
| Data flow       | Detail pages downloaded the **whole catalog and all 293 people** to show one title, then mutated the cached objects to attach images                       | `movie(id)` / `tvShow(id)` queries; the server resolves cast photos and logos; cached data is immutable                               |
| Routing         | IDs parsed from `window.location.href.split("?")`; full page reloads through `<a href>`                                                                    | Path params (`/movies/:id`), client-side links, lazy routes, an error boundary and a 404 page                                         |
| State           | Ad-hoc React Context for the theme; `window.innerWidth` read once at render                                                                                | Redux Toolkit: RTK Query for server state, slices for theme and player, URL params for search and filters                             |
| Correctness     | `Math.random()` in render (similar titles reshuffled on every render); keys on 18 of 93 lists; 111 `console.log` calls                                     | Deterministic server-side `similar`; keys everywhere; lint enforces hooks rules                                                       |
| Responsiveness  | 89 fixed widths and margins (`w-80`, `ml-44`, `w-screen`), nested `<body>`, no aspect ratios, a nav that wrapped on phones                                 | Mobile-first layout, aspect-ratio boxes, a scrollable nav row on phones, touch scrolling with snap; e2e check for horizontal overflow |
| Performance     | Single 448 KB bundle, react-player per trailer, Lottie icon animations, three icon libraries, a 14 MB unused SVG, 800 KB of unused fonts, full-size images | Code splitting, vendor chunk, srcset, click-to-load trailers, inline SVG icons, one variable font, route-level prefetching            |
| Accessibility   | `alt="Image"`/`"Mountain"` on 60 images, clickable `div`s, no focus management, low-contrast text                                                          | Semantic HTML, accessible names, native dialogs, skip link, contrast fixed in both themes; axe in CI                                  |
| Broken features | Images pointed to a disabled Cloudinary account; the API was offline; "Similar movies" was commented out; dead "Add to List" and footer links              | Working images and data; similar titles computed by the API; dead controls removed                                                    |

## Backend findings

| Area        | Finding (2022)                                                                                                                               | Change                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure   | One 1,325-line `schema.js` with type definitions and every resolver; resolvers called Mongoose directly                                      | Modules split into model → repository → service → resolver, wired in one composition root                                                           |
| Correctness | Mutation resolvers returned before their writes finished; a duplicated `deleteMovie` key deleted **seasons**; `deleteSeason` had no resolver | Async/await throughout, typed resolvers generated from the schema (a missing or mismatched resolver is a type error), tests for every mutation path |
| Schema      | `getTVshow1`, single-element arrays (`movieInfo[0]`), `{ posters: "url" }` wrappers, numbers and dates as strings, lookups by name           | `Title` interface, `movie(id)`, enums, numbers, ISO dates, filters and sorts as arguments                                                           |
| Performance | No indexes; clients downloaded everything and filtered in the browser                                                                        | Indexes for every filter and sort; server-side filtering, sorting and limits; DataLoader batching                                                   |
| Security    | MongoDB credentials hard-coded in a public repo; mutations open to anyone; no input validation; no rate limiting                             | Validated env config; admin token for mutations; zod validation; helmet, rate limit, depth limit, escaped regex input; errors masked in production  |
| Operations  | No logging, no health check, no shutdown handling; end-of-life Apollo Server 2 and Mongoose 5                                                | pino structured logs, `/health`, graceful shutdown, Apollo Server 5, Mongoose 8, Docker image, CI                                                   |

## Notes for reviewers

- **What was intentionally removed:** the separate "Posters" row on title pages (each title has one poster, already shown in the header), the non-functional "Add to List" button, and footer items that weren't links (Terms, Privacy, FAQ, social icons). They can come back once they have real destinations.
- **Data:** the original database no longer exists. The sample data is real TMDB metadata; IMDb and Rotten Tomatoes scores are approximate.
