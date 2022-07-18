import gql from "graphql-tag";



export const GetMovie = (names) => gql`
{
    getMovie(name:"${names}") {
      id
      name
      storyline
      casts{
        castName
      }
      rating{
        imdb
        rottenTomatoes
      }
      posters{
        posters
      }
      movieInfo{
        rating
        link {
          title
          link
          date
      }
        director
        runtime
        releaseDate
      }
      availLanguages{
        languages
      }
    
  }
      }
  `;
