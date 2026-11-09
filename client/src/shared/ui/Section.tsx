import { useId, type ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  /** Optional element shown next to the heading, e.g. a "See all" link. */
  action?: ReactNode;
  className?: string;
}

export const gradientText =
  "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent";

/** A titled page section; the heading labels the region for screen readers. */
export function Section({ title, children, action, className = "" }: SectionProps) {
  const id = useId();
  return (
    <section aria-labelledby={id} className={`mt-10 sm:mt-14 ${className}`}>
      <div className="mb-4 flex items-baseline justify-between gap-4 px-4 sm:px-8">
        <h2 id={id} className={`font-mono text-base font-black sm:text-xl ${gradientText}`}>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
