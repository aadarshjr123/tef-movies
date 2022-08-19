import gql from "graphql-tag";


export const GetCollections = gql`
{
  getCollections {
    name
    image
    type
  }
      }
  `;
