import gql from "graphql-tag";


export const GetMovies = gql`
{
  getMovies {
    id
    name
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
    movieInfo {
      rating{
        rating
      }
      director{
        director
      }
      runtime
      releaseDate
      dateFormat
      genre {
          genre
      }
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
