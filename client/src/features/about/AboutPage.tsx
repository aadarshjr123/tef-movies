import { API_URL } from "@/services/api";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { gradientText } from "@/shared/ui/Section";

const features: [string, string][] = [
  ["Browse", "Movies and TV shows in rows for latest releases, IMDb top 10, free titles and each streaming platform."],
  ["Details", "Trailers, cast and crew, ratings, runtime, languages and where to watch in India."],
  ["Seasons", "Season-by-season episode guides for every TV show."],
  ["Discover", "Genres, curated collections and people pages that link everything together."],
  ["Search", "Search by title, genre or cast member across movies and TV shows."],
  ["Dark mode", "A light and dark theme that remembers your choice."],
];

const stack: [string, string][] = [
  ["Frontend", "React 19, TypeScript, Redux Toolkit + RTK Query, React Router, Tailwind CSS, Vite"],
  ["API", "Node.js, Express 5, Apollo Server 5 (GraphQL), TypeScript"],
  ["Database", "MongoDB with Mongoose 8"],
  ["Quality", "Vitest, Testing Library, MSW, Playwright, GraphQL Code Generator"],
];

export default function AboutPage() {
  useDocumentTitle("About");
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-6 font-mono sm:px-8">
      <h1 className={`text-3xl font-black sm:text-5xl ${gradientText}`}>About TEF Movies</h1>
      <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-300">
        TEF Movies is a movie and TV show discovery site, similar to IMDb crossed with a streaming guide. It is a
        full-stack project: this React app talks to a GraphQL API built with Apollo Server, Express and MongoDB.
      </p>

      <h2 className={`mt-12 text-lg font-black ${gradientText}`}>Features</h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map(([title, text]) => (
          <li key={title} className="rounded-lg border border-gray-200 p-4 dark:border-night-border">
            <p className="text-sm font-bold dark:text-white">{title}</p>
            <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300">{text}</p>
          </li>
        ))}
      </ul>

      <h2 className={`mt-12 text-lg font-black ${gradientText}`}>Tech stack</h2>
      <dl className="mt-4 text-sm">
        {stack.map(([layer, tech]) => (
          <div key={layer} className="flex flex-col border-b border-gray-200 py-3 md:flex-row dark:border-night-border">
            <dt className="font-bold md:w-40 dark:text-white">{layer}</dt>
            <dd className="text-gray-600 dark:text-gray-300">{tech}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          className="rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white"
          href="https://github.com/aadarshjr123/tef-movies"
        >
          Source on GitHub
        </a>
        <a
          className="rounded-md border border-purple-500 px-4 py-2 text-sm font-semibold text-purple-600 dark:text-purple-400"
          href={API_URL}
        >
          Explore the GraphQL API
        </a>
      </div>

      <p className="mt-12 text-xs leading-6 text-gray-500 dark:text-gray-400">
        Movie and TV metadata and images come from{" "}
        <a className="underline" href="https://www.themoviedb.org/">
          TMDB
        </a>
        , and streaming availability from JustWatch via TMDB. This product uses TMDB data but is not endorsed or
        certified by TMDB. IMDb and Rotten Tomatoes scores are approximate snapshots.
      </p>
    </div>
  );
}
