import { graphql } from "@/graphql/__generated__";
import type { CollectionKind, CollectionsQuery } from "@/graphql/__generated__/graphql";
import { api } from "@/services/api";

const CollectionsDocument = graphql(`
  query Collections($kind: CollectionKind) {
    collections(kind: $kind) {
      name
      kind
      imageUrl
    }
  }
`);

export const catalogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCollections: build.query<CollectionsQuery["collections"], CollectionKind>({
      query: (kind) => ({ document: CollectionsDocument, variables: { kind } }),
      transformResponse: (data: CollectionsQuery) => data.collections,
    }),
  }),
});

export const { useGetCollectionsQuery } = catalogApi;
