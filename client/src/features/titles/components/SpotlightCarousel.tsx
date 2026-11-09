import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { TitleSpotlightFragment } from "@/graphql/__generated__/graphql";
import { formatDate, truncateWords } from "@/shared/lib/format";
import { IMAGE_WIDTHS } from "@/shared/lib/images";
import { paths } from "@/shared/lib/routes";
import { Skeleton } from "@/shared/ui/feedback";
import { StarIcon } from "@/shared/ui/icons";
import { Img } from "@/shared/ui/Img";

const INTERVAL_MS = 6000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface SpotlightCarouselProps {
  titles: readonly TitleSpotlightFragment[] | undefined;
  isLoading: boolean;
}

/**
 * Auto-advancing hero. It pauses while hovered or focused and doesn't
 * auto-advance for users who prefer reduced motion.
 */
export function SpotlightCarousel({ titles = [], isLoading }: SpotlightCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || titles.length < 2 || prefersReducedMotion()) return;
    const timer = setInterval(() => setCurrent((index) => (index + 1) % titles.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, titles.length]);

  if (isLoading) return <Skeleton className="aspect-video max-h-[70vh] w-full sm:aspect-[21/9]" />;
  if (titles.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured titles"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative aspect-[4/3] w-full overflow-hidden bg-black sm:aspect-video lg:aspect-[21/9] lg:rounded-xl"
    >
      {titles.map((title, index) => (
        <Link
          key={title.id}
          to={paths.title(title.kind, title.id)}
          aria-hidden={index !== current}
          tabIndex={index === current ? 0 : -1}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <Img
            src={title.backdropUrl ?? title.posterUrl}
            alt=""
            widths={IMAGE_WIDTHS.backdrop}
            defaultWidth={1280}
            sizes="100vw"
            priority={index === 0}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 pb-10 font-mono text-white sm:p-8 sm:pb-12">
            {title.ratings.imdb != null && (
              <p className="flex items-center gap-1.5 text-sm">
                <StarIcon className="h-4 w-4 text-yellow-400" /> {title.ratings.imdb.toFixed(1)}
              </p>
            )}
            <h2 className="mt-1 text-lg font-bold uppercase sm:text-3xl">{title.name}</h2>
            <p className="mt-1 text-xs font-semibold sm:text-sm">
              {formatDate(title.releaseDate)}
              {title.genres[0] && ` · ${title.genres[0]}`}
            </p>
            <p className="mt-2 hidden max-w-3xl text-sm font-light text-gray-200 sm:block">
              {truncateWords(title.overview, 30)}
            </p>
          </div>
        </Link>
      ))}

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {titles.map((title, index) => (
          <button
            key={title.id}
            type="button"
            aria-label={`Show ${title.name}`}
            aria-current={index === current}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all ${index === current ? "w-8 bg-white" : "w-4 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
