import { latestArgs, spotlightArgs } from "@/app/prefetch";
import { useGetCollectionsQuery } from "@/features/catalog/catalog.api";
import { CollectionRow } from "@/features/catalog/CollectionRow";
import { PeopleRow } from "@/features/people/PeopleRow";
import { TrailerCard } from "@/features/player/TrailerCard";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { CardRowSkeleton, ErrorState } from "@/shared/ui/feedback";
import { Section } from "@/shared/ui/Section";
import { SpotlightCarousel } from "../components/SpotlightCarousel";
import { TitleRow } from "../components/TitleRow";
import { useGetLatestTrailersQuery, useGetSpotlightQuery, useGetTitlesQuery } from "../titles.api";

function LatestTrailers() {
  const { data, isLoading, error, refetch } = useGetLatestTrailersQuery(6);
  return (
    <Section title="Latest trailers">
      {isLoading ? (
        <CardRowSkeleton count={3} />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <HorizontalScroller label="Latest trailers">
          {data?.map((trailer) => (
            <TrailerCard
              key={trailer.youtubeId}
              youtubeId={trailer.youtubeId}
              name={trailer.name}
              caption={trailer.title?.name}
              size="lg"
            />
          ))}
        </HorizontalScroller>
      )}
    </Section>
  );
}

export default function HomePage() {
  useDocumentTitle(null);
  // Each row is an independent query: rows render as their data arrives, and
  // RTK Query shares results with other pages that ask for the same list.
  const spotlight = useGetSpotlightQuery(spotlightArgs("MOVIE"));
  const latestMovies = useGetTitlesQuery(latestArgs("MOVIE"));
  const latestTvShows = useGetTitlesQuery(latestArgs("TV_SHOW"));
  const topTvShows = useGetTitlesQuery({ kind: "TV_SHOW", sort: "IMDB_RATING_DESC", limit: 10 });
  const topMovies = useGetTitlesQuery({ kind: "MOVIE", sort: "IMDB_RATING_DESC", limit: 10 });
  const freeMovies = useGetTitlesQuery({ kind: "MOVIE", filter: { watchType: "FREE" }, limit: 20 });
  const freeTvShows = useGetTitlesQuery({ kind: "TV_SHOW", filter: { watchType: "FREE" }, limit: 20 });
  const genres = useGetCollectionsQuery("GENRE");
  const collections = useGetCollectionsQuery("COLLECTION");

  return (
    <>
      <h1 className="sr-only">TEF Movies</h1>
      <div className="lg:px-8">
        <SpotlightCarousel titles={spotlight.data} isLoading={spotlight.isLoading} />
      </div>
      <TitleRow title="Latest movies" query={latestMovies} />
      <LatestTrailers />
      <TitleRow title="Latest TV shows" query={latestTvShows} />
      <CollectionRow title="Genres" query={genres} />
      <CollectionRow title="Movie collections" query={collections} />
      <PeopleRow />
      <TitleRow title="Top 10 TV shows on IMDb" query={topTvShows} />
      <TitleRow title="Top 10 movies on IMDb" query={topMovies} />
      <TitleRow title="Free movies" query={freeMovies} />
      <TitleRow title="Free TV shows" query={freeTvShows} />
    </>
  );
}
