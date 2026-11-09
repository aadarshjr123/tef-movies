import gql from "graphql-tag";


export const GetTvshows = gql`
{
   getTVshows {
    id
    name
    storyline
    casts {
      castName
    }
    rating {
      imdb
      rottenTomatoes
    }
    posters {
      posters
    }
    tvshowInfo {
      rating
      creator
      writer
      genre {
          genre
      }
      originalTitle
      noOfseasons
      status
      Type
      releaseDate
    }
    watchOn{
      watchOnLink
      watchOn
    }
    rectanglePosters{
      rectanglePosters
    }
    availLanguages {
      languages
    }
  }
      }
  `;
