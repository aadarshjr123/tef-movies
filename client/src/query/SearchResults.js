import gql from "graphql-tag";

export const SearchResults = (names) => gql`
{

  searchMovie(name:"${names}"){
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
      link {
          title
          link
          date
      }
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

      searchTvshows(name:"${names}"){
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
