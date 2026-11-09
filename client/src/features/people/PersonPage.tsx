import { useParams } from "react-router";
import { NotFoundPage } from "@/app/NotFoundPage";
import { TitleGrid } from "@/features/titles/components/TitleGrid";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { ErrorState, PageSpinner } from "@/shared/ui/feedback";
import { Img } from "@/shared/ui/Img";
import { Section, gradientText } from "@/shared/ui/Section";
import { useGetPersonQuery } from "./people.api";

/** A person's photo, bio and the movies and TV shows they're credited on. */
export default function PersonPage() {
  const { name = "" } = useParams();
  const { data: person, isLoading, error, refetch } = useGetPersonQuery(name);
  useDocumentTitle(person?.name ?? name);

  if (isLoading) return <PageSpinner />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!person) return <NotFoundPage what="person" />;

  return (
    <article className="pt-4">
      <header className="flex flex-col items-center gap-6 px-4 font-mono sm:flex-row sm:items-end sm:px-8">
        <div className="aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-lg sm:w-48 dark:bg-night-raised">
          <Img src={person.imageUrl} alt={person.name} sizes="192px" priority className="h-full w-full object-cover" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className={`text-2xl font-black sm:text-3xl ${gradientText}`}>{person.name}</h1>
          {person.bio && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{person.bio}</p>}
        </div>
      </header>
      {person.movies.length > 0 && (
        <Section title="Movies">
          <TitleGrid titles={person.movies} label={`${person.name} movies`} />
        </Section>
      )}
      {person.tvShows.length > 0 && (
        <Section title="TV shows">
          <TitleGrid titles={person.tvShows} label={`${person.name} TV shows`} />
        </Section>
      )}
    </article>
  );
}
