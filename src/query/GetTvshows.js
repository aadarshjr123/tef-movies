import gql from "graphql-tag";


export const GetTvshows =(names) => gql`
{
  getTVshow1( Type: "${names}") {
    id
    name
    Type
    storyline
    casts {
      castName
      CharacterName
    }
    rating {
      imdb
      rottenTomatoes
    }
    posters {
      posters
    }
    tvshowInfo {
      rating{
        rating
      }
      creator{
        creator
      }
      link
      writer
      genre {
        genre
      }
      originalTitle
      noOfseasons
      status
      releaseDate
      dateFormat
    }
    watchOn {
      watchOnLink
      watchOn
    }
    rectanglePosters {
      rectanglePosters
    }
    availLanguages {
      languages
    }
  }
      }
  `;
