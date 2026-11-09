import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { paths } from "@/shared/lib/routes";
import { gradientText } from "@/shared/ui/Section";

function Message({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center font-mono">
      <h1 className={`text-3xl font-black ${gradientText}`}>{title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">{body}</p>
      <Link
        to={paths.home}
        className="rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}

export function NotFoundPage({ what = "page" }: { what?: string }) {
  useDocumentTitle("Not found");
  return <Message title="Not found" body={`We couldn't find that ${what}.`} />;
}

/**
 * Router error boundary: catches render errors and failed lazy chunks (for
 * example after a deploy), so one broken page never blanks the whole app.
 */
export function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;
  return (
    <Message title="Something went wrong" body="Please reload the page. If it keeps happening, try again later." />
  );
}
