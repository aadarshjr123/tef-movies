import gql from "graphql-tag";


export const getOtts = gql`
{
  getOtts {
    
    name
    image
    perMonth
  }
      }
  `;
