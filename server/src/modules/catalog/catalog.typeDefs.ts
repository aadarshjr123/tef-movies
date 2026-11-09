import gql from "graphql-tag";

export const catalogTypeDefs = gql`
  enum CollectionKind {
    GENRE
    COLLECTION
  }

  "A browse tile. GENRE tiles match Title.genres; COLLECTION tiles match Title.collections."
  type Collection {
    name: String!
    kind: CollectionKind!
    imageUrl: String
  }

  "A streaming or rental service."
  type Platform {
    name: String!
    logoUrl: String
    "Short pricing label, e.g. 'Subscription'."
    pricing: String
  }

  input CollectionInput {
    name: String!
    kind: CollectionKind!
    imageUrl: String
  }

  input PlatformInput {
    name: String!
    logoUrl: String
    pricing: String
  }

  extend type Query {
    collections(kind: CollectionKind): [Collection!]!
    platforms: [Platform!]!
  }

  extend type Mutation {
    upsertCollection(input: CollectionInput!): Collection!
    deleteCollection(name: String!): Boolean!
    upsertPlatform(input: PlatformInput!): Platform!
    deletePlatform(name: String!): Boolean!
  }
`;
