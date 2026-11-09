import { peopleApi } from "@/features/people/people.api";
import { titlesApi, type TitlesArgs } from "@/features/titles/titles.api";
import type { TitleKind } from "@/graphql/__generated__/graphql";
import type { AppStore } from "./store";

/**
 * Query arguments shared by route loaders and the pages they prefetch for.
 * RTK Query caches by endpoint + args, so both sides must use the same values.
 */
export const spotlightArgs = (kind: TitleKind) => ({ kind, limit: 5 });
export const latestArgs = (kind: TitleKind): TitlesArgs => ({ kind, limit: 20 });

/**
 * Route loaders start the page's main requests while its code chunk is still
 * downloading ("render as you fetch"), instead of waiting for the component
 * to mount. They don't block navigation; the page reads the same cache.
 */
export function createPrefetchers({ dispatch }: AppStore) {
  return {
    landing(kind: TitleKind) {
      dispatch(titlesApi.util.prefetch("getSpotlight", spotlightArgs(kind), {}));
      dispatch(titlesApi.util.prefetch("getTitles", latestArgs(kind), {}));
      return null;
    },
    movie(id = "") {
      dispatch(titlesApi.util.prefetch("getMovie", id, {}));
      return null;
    },
    tvShow(id = "") {
      dispatch(titlesApi.util.prefetch("getTvShow", id, {}));
      return null;
    },
    person(name = "") {
      dispatch(peopleApi.util.prefetch("getPerson", name, {}));
      return null;
    },
  };
}
