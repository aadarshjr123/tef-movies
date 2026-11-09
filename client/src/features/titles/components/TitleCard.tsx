import { Link } from "react-router";
import type { TitleCardFragment } from "@/graphql/__generated__/graphql";
import { IMAGE_WIDTHS } from "@/shared/lib/images";
import { paths } from "@/shared/lib/routes";
import { Img } from "@/shared/ui/Img";
import { useTitlesPrefetch } from "../titles.api";

// Brand colours from the original cards, in shades that keep 4.5:1 contrast
// on both the light and dark backgrounds.
const PLATFORM_COLOR: Record<string, string> = {
  Netflix: "text-red-600 dark:text-red-500",
  "Amazon Prime Video": "text-sky-700 dark:text-sky-400",
  JioHotstar: "text-blue-700 dark:text-blue-400",
  YouTube: "text-red-700 dark:text-red-400",
  "Apple TV": "text-gray-600 dark:text-gray-400",
};

interface TitleCardProps {
  title: TitleCardFragment;
  /** Grid cards fill their cell; row cards have a fixed responsive width. */
  layout?: "row" | "grid";
}

/** Poster card used by every row and grid of movies and TV shows. */
export function TitleCard({ title, layout = "row" }: TitleCardProps) {
  const prefetchMovie = useTitlesPrefetch("getMovie");
  const prefetchTvShow = useTitlesPrefetch("getTvShow");
  const platform = title.watchOptions[0]?.platform.name;

  // Start loading the details page as soon as the user shows intent.
  const prefetch = () => (title.kind === "MOVIE" ? prefetchMovie(title.id) : prefetchTvShow(title.id));

  return (
    <Link
      to={paths.title(title.kind, title.id)}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      className={`group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 ${
        layout === "row" ? "w-32 sm:w-40 lg:w-44" : "w-full"
      }`}
    >
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 shadow-md transition-shadow duration-300 group-hover:shadow-xl dark:bg-night-raised">
        <Img
          src={title.posterUrl}
          alt={title.name}
          widths={IMAGE_WIDTHS.poster}
          defaultWidth={342}
          sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 128px"
          width={342}
          height={513}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 line-clamp-2 font-mono text-xs font-bold text-gray-900 dark:text-white">{title.name}</p>
      {platform && (
        <p
          className={`mt-0.5 truncate font-mono text-[11px] font-bold ${PLATFORM_COLOR[platform] ?? "text-gray-600 dark:text-gray-400"}`}
        >
          {platform}
        </p>
      )}
    </Link>
  );
}
