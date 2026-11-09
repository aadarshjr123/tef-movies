import gql from "graphql-tag";

// Root types; each module adds its fields with `extend type`.
export const baseTypeDefs = gql`
  type Query
  type Mutation
`;
