import { useId, useState } from "react";
import type { TvShowDetailsQuery } from "@/graphql/__generated__/graphql";
import { formatDate, formatRuntime } from "@/shared/lib/format";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { Section, gradientText } from "@/shared/ui/Section";

type Show = NonNullable<TvShowDetailsQuery["tvShow"]>;

/** Series facts, a season picker and that season's episodes. */
export function SeasonGuide({ show }: { show: Show }) {
  const [selected, setSelected] = useState(show.seasons[0]?.number ?? 1);
  const selectId = useId();
  const season = show.seasons.find((s) => s.number === selected);

  return (
    <Section title="Seasons">
      <div className="px-4 font-mono text-sm sm:px-8">
        <dl className="grid max-w-md grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt className="font-bold text-gray-900 dark:text-white">Original title</dt>
          <dd className={gradientText}>{show.originalName ?? show.name}</dd>
          <dt className="font-bold text-gray-900 dark:text-white">Seasons</dt>
          <dd className={gradientText}>{show.seasonCount}</dd>
          {show.status && (
            <>
              <dt className="font-bold text-gray-900 dark:text-white">Status</dt>
              <dd>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-semibold text-white ${show.status === "Ended" ? "bg-red-700" : "bg-green-700"}`}
                >
                  {show.status}
                </span>
              </dd>
            </>
          )}
          {season && (
            <>
              <dt className="font-bold text-gray-900 dark:text-white">Season starts</dt>
              <dd className={gradientText}>{formatDate(season.startDate)}</dd>
              <dt className="font-bold text-gray-900 dark:text-white">Season ends</dt>
              <dd className={gradientText}>{formatDate(season.endDate)}</dd>
            </>
          )}
        </dl>

        {show.seasons.length > 0 && (
          <div className="mt-6">
            <label htmlFor={selectId} className="sr-only">
              Season
            </label>
            <select
              id={selectId}
              value={selected}
              onChange={(event) => setSelected(Number(event.target.value))}
              className="rounded-md border-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white"
            >
              {show.seasons.map((s) => (
                <option key={s.number} value={s.number} className="text-black">
                  Season {s.number}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {season && (
        <div className="mt-6">
          <HorizontalScroller label={`Season ${season.number} episodes`}>
            {season.episodes.map((episode) => (
              <article
                key={episode.number}
                className="flex h-full w-64 flex-col gap-2 rounded-lg border-2 border-dashed border-indigo-600 p-4 font-mono sm:w-72"
              >
                <h3 className={`text-sm font-extrabold ${gradientText}`}>
                  {episode.number}. {episode.name}
                </h3>
                {episode.runtimeMinutes && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {formatRuntime(episode.runtimeMinutes)}
                  </p>
                )}
                <p className="line-clamp-6 text-xs leading-5 text-gray-700 dark:text-gray-300">
                  {episode.overview ?? "No overview yet."}
                </p>
              </article>
            ))}
          </HorizontalScroller>
        </div>
      )}
    </Section>
  );
}
