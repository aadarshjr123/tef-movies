import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface HorizontalScrollerProps {
  children: ReactNode;
  /** Accessible name for the list, e.g. "Latest movies". */
  label: string;
}

/**
 * A horizontally scrolling row. Touch users swipe (with scroll snapping);
 * pointer users also get previous/next buttons, which disable at the ends.
 */
export function HorizontalScroller({ children, label }: HorizontalScrollerProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState({ back: false, forward: false });

  const update = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    setCanScroll({
      back: list.scrollLeft > 4,
      forward: list.scrollLeft + list.clientWidth < list.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [update, children]);

  const scrollBy = (direction: 1 | -1) => {
    const list = listRef.current;
    list?.scrollBy({ left: direction * list.clientWidth * 0.85, behavior: "smooth" });
  };

  const buttonClass =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/60 p-2 text-white shadow-lg transition hover:bg-black/80 disabled:pointer-events-none disabled:opacity-0 md:block";

  return (
    <div className="relative">
      <button
        type="button"
        className={`${buttonClass} left-2`}
        onClick={() => scrollBy(-1)}
        disabled={!canScroll.back}
        aria-label={`Scroll ${label} back`}
      >
        <ChevronLeftIcon />
      </button>
      {/* `relative` makes the list the containing block for absolutely positioned
          descendants (e.g. sr-only text), so they're clipped by its scrolling
          instead of widening the page. */}
      <ul
        ref={listRef}
        aria-label={label}
        onScroll={update}
        className="no-scrollbar relative flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:scroll-px-8 sm:gap-5 sm:px-8"
      >
        {Children.map(children, (child) => (
          <li className="shrink-0 snap-start">{child}</li>
        ))}
      </ul>
      <button
        type="button"
        className={`${buttonClass} right-2`}
        onClick={() => scrollBy(1)}
        disabled={!canScroll.forward}
        aria-label={`Scroll ${label} forward`}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
