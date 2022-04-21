import gql from "graphql-tag";


export const GetTvshows = gql`
{
   getTVshows( limit: "${names}") {
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
      link
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
