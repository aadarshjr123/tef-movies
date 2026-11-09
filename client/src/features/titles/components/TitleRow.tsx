import type { ReactNode } from "react";
import type { TitleCardFragment } from "@/graphql/__generated__/graphql";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { CardRowSkeleton, ErrorState } from "@/shared/ui/feedback";
import { Section } from "@/shared/ui/Section";
import { TitleCard } from "./TitleCard";

/** The subset of an RTK Query hook result a row needs. */
export interface QueryState<T> {
  data?: T;
  isLoading: boolean;
  error?: unknown;
  refetch: () => unknown;
}

interface TitleRowProps {
  title: string;
  query: QueryState<readonly TitleCardFragment[]>;
  action?: ReactNode;
}

/**
 * A titled, horizontally scrolling row of title cards with loading and error
 * states. Rows with no results are hidden rather than shown empty.
 */
export function TitleRow({ title, query, action }: TitleRowProps) {
  const { data, isLoading, error, refetch } = query;
  if (!isLoading && !error && data?.length === 0) return null;

  return (
    <Section title={title} action={action}>
      {isLoading ? (
        <CardRowSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <HorizontalScroller label={title}>
          {data?.map((item) => (
            <TitleCard key={item.id} title={item} />
          ))}
        </HorizontalScroller>
      )}
    </Section>
  );
}
