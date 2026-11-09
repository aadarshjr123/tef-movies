import type { TitleDetailsFragment } from "@/graphql/__generated__/graphql";
import { WATCH_TYPE_LABEL } from "@/shared/lib/format";
import { Img } from "@/shared/ui/Img";
import { HorizontalScroller } from "@/shared/ui/HorizontalScroller";
import { Section, gradientText } from "@/shared/ui/Section";

type WatchOption = TitleDetailsFragment["watchOptions"][number];

/** "Watch now" cards: platform logo, offer type, pricing and an outbound link. */
export function WatchOptions({ options }: { options: readonly WatchOption[] }) {
  if (options.length === 0) return null;

  return (
    <Section title="Watch now">
      <HorizontalScroller label="Watch now">
        {options.map((option) => (
          <a
            key={`${option.platform.name}-${option.type}`}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-36 flex-col items-center gap-2 rounded-lg border border-gray-300 p-4 font-mono text-xs transition hover:border-purple-500 sm:w-40 dark:border-night-border"
          >
            <Img
              src={option.platform.logoUrl}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16"
            />
            <span className="font-semibold text-gray-900 dark:text-white">{option.platform.name}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {option.type === "SUBSCRIPTION"
                ? (option.platform.pricing ?? WATCH_TYPE_LABEL.SUBSCRIPTION)
                : WATCH_TYPE_LABEL[option.type]}
            </span>
            <span className={`font-semibold ${gradientText}`}>
              Watch now<span className="sr-only"> on {option.platform.name} (opens in a new tab)</span>
            </span>
          </a>
        ))}
      </HorizontalScroller>
    </Section>
  );
}
