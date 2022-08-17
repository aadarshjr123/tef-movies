import gql from "graphql-tag";



export const getSeason = (names) => gql`
{
  getSeason(seasonId:"${names}") {
    name
    seasonId
    season
    seasonStart
    seasonEnd
    episodes{
      episodeName
      episodeDescription
    }
  }
      }
  `;
