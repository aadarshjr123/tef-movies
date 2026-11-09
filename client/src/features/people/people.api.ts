import { graphql } from "@/graphql/__generated__";
import type { PeopleQuery, PersonQuery } from "@/graphql/__generated__/graphql";
import { api } from "@/services/api";

const PeopleDocument = graphql(`
  query People($limit: Int) {
    people(limit: $limit) {
      name
      imageUrl
    }
  }
`);

const PersonDocument = graphql(`
  query Person($name: String!) {
    person(name: $name) {
      name
      imageUrl
      bio
      movies {
        ...TitleCard
      }
      tvShows {
        ...TitleCard
      }
    }
  }
`);

export const peopleApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPeople: build.query<PeopleQuery["people"], number>({
      query: (limit) => ({ document: PeopleDocument, variables: { limit } }),
      transformResponse: (data: PeopleQuery) => data.people,
    }),
    getPerson: build.query<PersonQuery["person"], string>({
      query: (name) => ({ document: PersonDocument, variables: { name } }),
      transformResponse: (data: PersonQuery) => data.person,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
