import type { TitleKind } from "@/graphql/__generated__/graphql";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { SpotlightCarousel } from "../components/SpotlightCarousel";
import { SpotlightSidebar } from "../components/SpotlightSidebar";
import { TitleRow } from "../components/TitleRow";
import { FEATURED_PLATFORMS, KIND } from "../kinds";
import { useGetSpotlightQuery, useGetTitlesQuery } from "../titles.api";

function PlatformRow({ kind, platform }: { kind: TitleKind; platform: string }) {
  const query = useGetTitlesQuery({ kind, filter: { platform, watchType: "SUBSCRIPTION" }, limit: 20 });
  return <TitleRow title={`${platform} ${KIND[kind].lower}`} query={query} />;
}

/** The Movies and TV Shows pages: hero, popular picks and one row per platform. */
export default function KindLandingPage({ kind }: { kind: TitleKind }) {
  const { plural, lower, browse } = KIND[kind];
  useDocumentTitle(plural);
  const spotlight = useGetSpotlightQuery({ kind, limit: 5 });
  const popular = useGetSpotlightQuery({ kind, sort: "IMDB_RATING_DESC", limit: 2 });
  const latest = useGetTitlesQuery({ kind, limit: 20 });

  return (
    <>
      <h1 className="sr-only">{plural}</h1>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <SpotlightCarousel titles={spotlight.data} isLoading={spotlight.isLoading} />
        {popular.data && <SpotlightSidebar heading={`Popular ${lower}`} titles={popular.data} seeAllHref={browse} />}
      </div>
      <TitleRow title={`Latest ${lower}`} query={latest} />
      {FEATURED_PLATFORMS.map((platform) => (
        <PlatformRow key={platform} kind={kind} platform={platform} />
      ))}
    </>
  );
}
