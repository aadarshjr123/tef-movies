import type { WatchType } from "@/graphql/__generated__/graphql";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2010-07-15" → "July 15, 2010". Dates are calendar dates, so format in UTC. */
export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "TBA";
  const date = new Date(`${isoDate}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? isoDate : dateFormatter.format(date);
}

/** 148 → "2h 28m"; 45 → "45m". */
export function formatRuntime(minutes: number | null | undefined): string | null {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours ? `${hours}h ${rest}m` : `${rest}m`;
}

export const WATCH_TYPE_LABEL: Record<WatchType, string> = {
  SUBSCRIPTION: "Stream",
  FREE: "Free",
  RENT: "Rent",
  BUY: "Buy",
};

/** Long text is truncated at a word boundary, e.g. for the hero carousel. */
export function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  return words.length <= maxWords ? text : `${words.slice(0, maxWords).join(" ")}…`;
}
