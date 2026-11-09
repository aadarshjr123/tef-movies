import { useSearchParams } from "react-router";
import type { TitleKind } from "@/graphql/__generated__/graphql";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { ErrorState, PageSpinner } from "@/shared/ui/feedback";
import { gradientText } from "@/shared/ui/Section";
import { TitleGrid } from "../components/TitleGrid";
import { KIND } from "../kinds";
import { useGetTitlesQuery } from "../titles.api";

const GENRE_FILTERS = ["Action", "Comedy"] as const;

/**
 * All titles of a kind, most popular first, with quick genre filters. The
 * filter lives in the URL (?genre=Action) so it survives reloads and sharing.
 */
export default function BrowsePage({ kind }: { kind: TitleKind }) {
  const [params, setParams] = useSearchParams();
  const genre = params.get("genre");
  const heading = `Popular ${KIND[kind].lower}`;
  useDocumentTitle(heading);

  const { data, isFetching, isLoading, error, refetch } = useGetTitlesQuery({
    kind,
    sort: "IMDB_RATING_DESC",
    filter: genre ? { genre } : undefined,
    limit: 100,
  });

  const chip = (label: string, value: string | null) => {
    const active = genre === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={active}
        onClick={() => setParams(value ? { genre: value } : {})}
        className={`rounded-full border px-4 py-1 font-mono text-xs transition ${
          active
            ? "border-transparent bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
            : "border-orange-300 text-gray-800 hover:bg-orange-300/20 dark:text-white"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="pt-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8">
        <h1 className={`font-mono text-xl font-black ${gradientText}`}>{heading}</h1>
        <div role="group" aria-label="Filter by genre" className="flex gap-2">
          {chip("All", null)}
          {GENRE_FILTERS.map((g) => chip(g, g))}
        </div>
      </div>
      {isLoading ? (
        <PageSpinner />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
          <TitleGrid titles={data ?? []} label={heading} />
        </div>
      )}
    </div>
  );
}
