import { Link } from "react-router";
import type { CreditFieldsFragment } from "@/graphql/__generated__/graphql";
import { paths } from "@/shared/lib/routes";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { Img } from "@/shared/ui/Img";
import { Section, gradientText } from "@/shared/ui/Section";

/** Cast or crew row; each person links to their filmography. */
export function CreditRow({ title, credits }: { title: string; credits: readonly CreditFieldsFragment[] }) {
  if (credits.length === 0) return null;

  return (
    <Section title={title}>
      <HorizontalScroller label={title}>
        {credits.map((credit) => (
          <Link
            key={`${credit.name}-${credit.role}`}
            to={paths.person(credit.name)}
            className="group block w-28 font-mono sm:w-36"
          >
            <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-night-raised">
              {credit.person?.imageUrl ? (
                <Img
                  src={credit.person.imageUrl}
                  alt={credit.name}
                  sizes="144px"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <span className={`flex h-full items-center justify-center text-xs font-bold ${gradientText}`}>
                  TEF Movies
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-xs font-semibold text-gray-900 dark:text-white">{credit.name}</p>
            {credit.role && <p className="line-clamp-2 text-[11px] text-gray-500 dark:text-gray-400">{credit.role}</p>}
          </Link>
        ))}
      </HorizontalScroller>
    </Section>
  );
}
