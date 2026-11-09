import { Link } from "react-router";
import { IMAGE_WIDTHS } from "@/shared/lib/images";
import { paths } from "@/shared/lib/routes";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { CardRowSkeleton, ErrorState } from "@/shared/ui/feedback";
import { Img } from "@/shared/ui/Img";
import { Section } from "@/shared/ui/Section";
import { useGetPeopleQuery } from "./people.api";

/** The most-credited people, linking to their filmographies. */
export function PeopleRow() {
  const { data, isLoading, error, refetch } = useGetPeopleQuery(24);

  return (
    <Section title="Popular people">
      {isLoading ? (
        <CardRowSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <HorizontalScroller label="Popular people">
          {data?.map((person) => (
            <Link key={person.name} to={paths.person(person.name)} className="group block w-28 font-mono sm:w-36">
              <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-night-raised">
                <Img
                  src={person.imageUrl}
                  alt=""
                  widths={IMAGE_WIDTHS.profile}
                  defaultWidth={185}
                  sizes="(min-width: 640px) 144px, 112px"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-center text-xs font-bold text-gray-500 dark:text-gray-400">
                {person.name}
              </p>
            </Link>
          ))}
        </HorizontalScroller>
      )}
    </Section>
  );
}
