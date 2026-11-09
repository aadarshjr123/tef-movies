import type { ReactNode } from "react";
import type { CreditFieldsFragment, TitleCardFragment, TitleDetailsFragment } from "@/graphql/__generated__/graphql";
import { TrailerCard } from "@/features/player/TrailerCard";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { Section } from "@/shared/ui/Section";
import { KIND } from "../kinds";
import { CreditRow } from "./CreditRow";
import { TitleHero } from "./TitleHero";
import { TitleRow } from "./TitleRow";
import { WatchOptions } from "./WatchOptions";

interface TitleDetailsViewProps {
  title: TitleDetailsFragment & { similar: TitleCardFragment[] };
  /** Directors for movies, creators for TV shows. */
  crew: readonly CreditFieldsFragment[];
  meta?: ReactNode;
  /** Kind-specific sections shown after the trailers (e.g. the season guide). */
  children?: ReactNode;
}

/** Layout shared by movie and TV show pages. */
export function TitleDetailsView({ title, crew, meta, children }: TitleDetailsViewProps) {
  return (
    <article className="pt-2">
      <TitleHero title={title} meta={meta} />

      {title.trailers.length > 0 && (
        <Section title="Videos">
          <HorizontalScroller label="Videos">
            {title.trailers.map((trailer) => (
              <TrailerCard key={trailer.youtubeId} youtubeId={trailer.youtubeId} name={trailer.name} />
            ))}
          </HorizontalScroller>
        </Section>
      )}

      {children}

      <CreditRow title="Cast" credits={title.cast} />
      <CreditRow title="Crew" credits={crew} />
      <WatchOptions options={title.watchOptions} />
      <TitleRow
        title={`More ${KIND[title.kind].lower} like this`}
        query={{ data: title.similar, isLoading: false, refetch: () => undefined }}
      />
    </article>
  );
}
