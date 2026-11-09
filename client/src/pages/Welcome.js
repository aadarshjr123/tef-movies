import React from "react";
import { API_URL } from "../config";

const gradientText =
  "text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500";

const features = [
  ["Browse", "Movies and TV shows in rows for latest releases, IMDb top 10, free titles and each streaming platform."],
  ["Details", "Trailers, cast and crew, posters, ratings, runtime, languages and where to watch in India."],
  ["Seasons", "Season-by-season episode guides for every TV show."],
  ["Discover", "Genres, curated collections and actor pages that link everything together."],
  ["Search", "Search by title, genre or cast member across movies and TV shows."],
  ["Dark mode", "A light and dark theme that remembers your choice."],
];

const stack = [
  ["Frontend", "React 17, React Router, React Query, Tailwind CSS, Framer Motion"],
  ["API", "Node.js, Express, Apollo Server (GraphQL)"],
  ["Database", "MongoDB with Mongoose; in-memory MongoDB for local runs"],
];

const Welcome = () => (
  <main className="mt-48 lg:mt-56 w-full flex justify-center px-6">
    <div className="w-full max-w-4xl font-RobotoMono dark:text-white">
      <h1 className={`text-3xl lg:text-5xl font-black ${gradientText}`}>About TEF Movies</h1>
      <p className="mt-6 text-sm lg:text-base leading-7 text-gray-600 dark:text-gray-300">
        TEF Movies is a movie and TV show discovery site, similar to IMDb crossed with a streaming
        guide. It is a full-stack project: this React app talks to a GraphQL API built with
        Apollo Server, Express and MongoDB.
      </p>

      <h2 className={`mt-12 text-lg font-black ${gradientText}`}>Features</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map(([title, text]) => (
          <div key={title} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <p className="font-bold text-sm">{title}</p>
            <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300">{text}</p>
          </div>
        ))}
      </div>

      <h2 className={`mt-12 text-lg font-black ${gradientText}`}>Tech stack</h2>
      <dl className="mt-4 text-sm">
        {stack.map(([layer, tech]) => (
          <div key={layer} className="flex flex-col md:flex-row py-3 border-b border-gray-200 dark:border-gray-700">
            <dt className="md:w-40 font-bold">{layer}</dt>
            <dd className="text-gray-600 dark:text-gray-300">{tech}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
          href="https://github.com/aadarshjr123/tef-movies"
        >
          Source on GitHub
        </a>
        <a
          className="rounded-md px-4 py-2 text-sm font-semibold border border-purple-500 text-purple-500"
          href={API_URL}
        >
          Explore the GraphQL API
        </a>
      </div>

      <p className="mt-12 text-xs leading-6 text-gray-500">
        Movie and TV metadata and images come from{" "}
        <a className="underline" href="https://www.themoviedb.org/">TMDB</a>, and streaming
        availability from JustWatch via TMDB. This product uses TMDB data but is not endorsed
        or certified by TMDB. IMDb and Rotten Tomatoes scores are approximate snapshots.
      </p>
    </div>
  </main>
);

export default Welcome;
