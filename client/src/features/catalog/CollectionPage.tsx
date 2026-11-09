import { useParams } from "react-router";
import { TitleGrid } from "@/features/titles/components/TitleGrid";
import { useGetTitlesQuery } from "@/features/titles/titles.api";
import type { CollectionKind } from "@/graphql/__generated__/graphql";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { EmptyState, ErrorState, PageSpinner } from "@/shared/ui/feedback";
import { gradientText } from "@/shared/ui/Section";

/** Movies in a genre (/genres/:name) or curated collection (/collections/:name). */
export default function CollectionPage({ kind }: { kind: CollectionKind }) {
  const { name = "" } = useParams();
  useDocumentTitle(name);
  const filter = kind === "GENRE" ? { genre: name } : { collection: name };
  const { data, isLoading, error, refetch } = useGetTitlesQuery({
    kind: "MOVIE",
    filter,
    sort: "IMDB_RATING_DESC",
    limit: 100,
  });

  return (
    <div className="pt-4">
      <h1 className={`mb-6 px-4 font-mono text-xl font-black sm:px-8 ${gradientText}`}>{name}</h1>
      {isLoading ? (
        <PageSpinner />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : data?.length ? (
        <TitleGrid titles={data} label={`${name} movies`} />
      ) : (
        <EmptyState>No movies here yet.</EmptyState>
      )}
    </div>
  );
}
