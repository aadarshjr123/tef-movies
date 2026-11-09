import { useParams } from "react-router";
import { NotFoundPage } from "@/app/NotFoundPage";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { formatRuntime } from "@/shared/lib/format";
import { ErrorState, PageSpinner } from "@/shared/ui/feedback";
import { TitleDetailsView } from "../components/TitleDetailsView";
import { useGetMovieQuery } from "../titles.api";

export default function MovieDetailsPage() {
  const { id = "" } = useParams();
  const { data: movie, isLoading, error, refetch } = useGetMovieQuery(id);
  useDocumentTitle(movie?.name);

  if (isLoading) return <PageSpinner />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!movie) return <NotFoundPage what="movie" />;

  const runtime = formatRuntime(movie.runtimeMinutes);
  return <TitleDetailsView title={movie} crew={movie.directors} meta={runtime && <span>· {runtime}</span>} />;
}
