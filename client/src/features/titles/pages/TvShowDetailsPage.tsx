import { useParams } from "react-router";
import { NotFoundPage } from "@/app/NotFoundPage";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { ErrorState, PageSpinner } from "@/shared/ui/feedback";
import { SeasonGuide } from "../components/SeasonGuide";
import { TitleDetailsView } from "../components/TitleDetailsView";
import { useGetTvShowQuery } from "../titles.api";

export default function TvShowDetailsPage() {
  const { id = "" } = useParams();
  const { data: show, isLoading, error, refetch } = useGetTvShowQuery(id);
  useDocumentTitle(show?.name);

  if (isLoading) return <PageSpinner />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!show) return <NotFoundPage what="TV show" />;

  return (
    <TitleDetailsView
      title={show}
      crew={show.creators}
      meta={
        <span>
          · {show.seasonCount} {show.seasonCount === 1 ? "season" : "seasons"}
        </span>
      }
    >
      {/* Keyed by id so the selected season resets when navigating to another show. */}
      <SeasonGuide key={show.id} show={show} />
    </TitleDetailsView>
  );
}
