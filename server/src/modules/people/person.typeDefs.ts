import gql from "graphql-tag";

export const personTypeDefs = gql`
  type Person {
    name: String!
    imageUrl: String
    bio: String
    "Movies they acted in or directed."
    movies: [Movie!]!
    "TV shows they acted in or created."
    tvShows: [TvShow!]!
  }

  input PersonInput {
    name: String!
    imageUrl: String
    bio: String
    popularity: Int
  }

  extend type Query {
    "Most popular people first."
    people(limit: Int = 24): [Person!]!
    person(name: String!): Person
  }

  extend type Mutation {
    "Creates the person, or replaces the one with the same name."
    upsertPerson(input: PersonInput!): Person!
    deletePerson(name: String!): Boolean!
  }
`;
