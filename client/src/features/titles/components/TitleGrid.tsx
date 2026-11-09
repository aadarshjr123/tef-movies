import type { TitleCardFragment } from "@/graphql/__generated__/graphql";
import { TitleCard } from "./TitleCard";

/** Responsive poster grid: 2 columns on phones up to 7 on wide screens. */
export function TitleGrid({ titles, label }: { titles: readonly TitleCardFragment[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="grid grid-cols-2 gap-x-3 gap-y-6 px-4 sm:grid-cols-3 sm:gap-x-5 sm:px-8 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7"
    >
      {titles.map((title) => (
        <li key={title.id}>
          <TitleCard title={title} layout="grid" />
        </li>
      ))}
    </ul>
  );
}
