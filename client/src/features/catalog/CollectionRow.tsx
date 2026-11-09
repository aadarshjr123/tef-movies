import { Link } from "react-router";
import type { CollectionsQuery } from "@/graphql/__generated__/graphql";
import type { QueryState } from "@/features/titles/components/TitleRow";
import { IMAGE_WIDTHS } from "@/shared/lib/images";
import { paths } from "@/shared/lib/routes";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { CardRowSkeleton, ErrorState } from "@/shared/ui/feedback";
import { Img } from "@/shared/ui/Img";
import { Section } from "@/shared/ui/Section";

type Collection = CollectionsQuery["collections"][number];

export function CollectionTile({ collection }: { collection: Collection }) {
  const href = collection.kind === "GENRE" ? paths.genre(collection.name) : paths.collection(collection.name);
  return (
    <Link
      to={href}
      className="group relative block aspect-[4/3] w-40 overflow-hidden rounded-lg bg-gray-200 sm:w-52 dark:bg-night-raised"
    >
      <Img
        src={collection.imageUrl}
        alt=""
        widths={IMAGE_WIDTHS.backdrop}
        defaultWidth={300}
        sizes="208px"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 font-mono text-sm font-bold text-white">
        {collection.name}
      </span>
    </Link>
  );
}

/** A row of genre or collection tiles. */
export function CollectionRow({ title, query }: { title: string; query: QueryState<readonly Collection[]> }) {
  const { data, isLoading, error, refetch } = query;
  if (!isLoading && !error && data?.length === 0) return null;

  return (
    <Section title={title}>
      {isLoading ? (
        <CardRowSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <HorizontalScroller label={title}>
          {data?.map((collection) => (
            <CollectionTile key={collection.name} collection={collection} />
          ))}
        </HorizontalScroller>
      )}
    </Section>
  );
}
