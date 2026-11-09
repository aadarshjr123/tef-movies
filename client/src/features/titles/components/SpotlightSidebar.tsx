import { Link } from "react-router";
import type { TitleSpotlightFragment } from "@/graphql/__generated__/graphql";
import { formatDate, truncateWords } from "@/shared/lib/format";
import { IMAGE_WIDTHS } from "@/shared/lib/images";
import { paths } from "@/shared/lib/routes";
import { Img } from "@/shared/ui/Img";
import { gradientText } from "@/shared/ui/Section";

interface SpotlightSidebarProps {
  heading: string;
  titles: readonly TitleSpotlightFragment[];
  seeAllHref: string;
}

/** "Popular" list beside the hero on the Movies and TV Shows pages. */
export function SpotlightSidebar({ heading, titles, seeAllHref }: SpotlightSidebarProps) {
  return (
    <aside aria-label={heading} className="flex flex-col gap-4 px-4 font-mono lg:px-0">
      <h2 className={`text-sm font-bold ${gradientText}`}>{heading}</h2>
      <ul className="flex flex-col gap-4">
        {titles.map((title) => (
          <li key={title.id}>
            <Link to={paths.title(title.kind, title.id)} className="group flex gap-4 rounded-lg">
              <div className="aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-md bg-gray-200 dark:bg-night-raised">
                <Img
                  src={title.posterUrl}
                  alt=""
                  widths={IMAGE_WIDTHS.poster}
                  defaultWidth={185}
                  sizes="80px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 group-hover:underline dark:text-white">{title.name}</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatDate(title.releaseDate)}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{truncateWords(title.overview, 22)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={seeAllHref}
        className="rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-center text-sm font-semibold text-white"
      >
        See all
      </Link>
    </aside>
  );
}
