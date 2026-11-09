import { useEffect } from "react";

/** Sets the browser tab title for the current page. */
export function useDocumentTitle(title: string | null | undefined) {
  useEffect(() => {
    document.title = title ? `${title} · TEF Movies` : "TEF Movies";
  }, [title]);
}
