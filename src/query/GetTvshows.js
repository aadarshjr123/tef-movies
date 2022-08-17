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
      writer
      genre {
        genre
      }
      link {
        title
        link
        date
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
