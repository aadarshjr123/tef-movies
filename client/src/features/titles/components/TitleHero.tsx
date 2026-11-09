import { useState, type ReactNode } from "react";
import type { TitleDetailsFragment } from "@/graphql/__generated__/graphql";
import { formatDate } from "@/shared/lib/format";
import { IMAGE_WIDTHS } from "@/shared/lib/images";
import { Img } from "@/shared/ui/Img";
import { Modal } from "@/shared/ui/Modal";

const OVERVIEW_PREVIEW_CHARS = 400;

interface TitleHeroProps {
  title: TitleDetailsFragment;
  /** Kind-specific facts appended to the date line, e.g. the runtime. */
  meta?: ReactNode;
}

function RatingBadge({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className="flex w-20 flex-col items-center gap-1 rounded-md bg-white/10 px-3 py-2 backdrop-blur">
      <span className={`rounded px-1.5 py-0.5 text-[10px] font-black ${className}`}>{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}

/** Header of a title page: backdrop, poster, facts, overview and ratings. */
export function TitleHero({ title, meta }: TitleHeroProps) {
  const [showOverview, setShowOverview] = useState(false);
  const isLong = title.overview.length > OVERVIEW_PREVIEW_CHARS;

  return (
    <header className="relative overflow-hidden bg-black font-mono text-white lg:mx-8 lg:rounded-xl">
      <Img
        src={title.backdropUrl}
        alt=""
        widths={IMAGE_WIDTHS.backdrop}
        defaultWidth={780}
        sizes="100vw"
        priority
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
      />
      <div className="relative flex flex-col-reverse gap-6 p-5 sm:p-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold sm:text-3xl">{title.name}</h1>
          {title.originalName && title.originalName !== title.name && (
            <p className="mt-1 text-sm text-gray-300">{title.originalName}</p>
          )}
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-200 sm:text-sm">
            <span>{formatDate(title.releaseDate)}</span>
            {meta}
            {title.certification && (
              <span className="rounded bg-gradient-to-br from-indigo-500 to-pink-500 px-2 py-0.5 text-xs font-bold">
                {title.certification}
              </span>
            )}
          </p>
          {title.languages.length > 0 && <p className="mt-2 text-xs text-gray-300">{title.languages.join(", ")}</p>}

          <p className="mt-4 text-sm leading-6 text-gray-100">
            {isLong ? `${title.overview.slice(0, OVERVIEW_PREVIEW_CHARS)}…` : title.overview}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => setShowOverview(true)}
              className="mt-1 text-sm font-semibold text-purple-300 underline underline-offset-2"
            >
              Read more
            </button>
          )}

          {title.genres.length > 0 && (
            <ul aria-label="Genres" className="mt-4 flex flex-wrap gap-2">
              {title.genres.slice(0, 3).map((genre) => (
                <li
                  key={genre}
                  className="rounded bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-2 py-0.5 text-xs font-semibold"
                >
                  #{genre}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex gap-3">
            {title.ratings.imdb != null && (
              <RatingBadge label="IMDb" value={title.ratings.imdb.toFixed(1)} className="bg-yellow-400 text-black" />
            )}
            {title.ratings.rottenTomatoes != null && (
              <RatingBadge
                label="Tomatometer"
                value={`${title.ratings.rottenTomatoes}%`}
                className="bg-red-600 text-white"
              />
            )}
          </div>
        </div>

        <div className="mx-auto aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-lg shadow-2xl sm:w-52 md:mx-0 lg:w-60">
          <Img
            src={title.posterUrl}
            alt={`${title.name} poster`}
            widths={IMAGE_WIDTHS.poster}
            defaultWidth={342}
            sizes="(min-width: 1024px) 240px, 208px"
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <Modal open={showOverview} onClose={() => setShowOverview(false)} label={`${title.name} overview`}>
        <div className="p-6 pr-12 font-mono">
          <h2 className="text-lg font-bold">{title.name}</h2>
          <p className="mt-3 text-sm leading-6">{title.overview}</p>
        </div>
      </Modal>
    </header>
  );
}
