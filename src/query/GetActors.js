// import gql from "graphql-tag";


// export const getActors = gql`
// {
//   getActors {
    
//     name
//     image
//   }
//       }
//   `;



// useRequest.js
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = 'https://tefmovies.herokuapp.com/graphql';

const graphQLClient = new GraphQLClient(API_URL);
console.log(graphQLClient);

export function GetActors() {
  return useQuery("getActors", async () => {
    const { getActors } = await graphQLClient.request(gql`
      query {
        getActors {
          
          name
          image
        }
            }
    `);
    return getActors;
  });
}

export function GetMovies() {
  return useQuery("getMovies", async () => {
    const { getMovies } = await graphQLClient.request(gql`
      query {
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
            }
    `);
    return getMovies;
  });
}

// export function GetTvshows() {
//   return useQuery("getTVshows", async () => {
//     const { getTVshows } = await graphQLClient.request(gql`
//       query {
//         getTVshows {
//          id
//          name
//          storyline
//          casts {
//            castName
//          }
//          rating {
//            imdb
//            rottenTomatoes
//          }
//          posters {
//            posters
//          }
//          tvshowInfo {
//            rating
//            creator
//            writer
//            genre {
//                genre
//            }
//            originalTitle
//            noOfseasons
//            status
//            Type
//            releaseDate
//          }
//          watchOn{
//            watchOnLink
//            watchOn
//          }
//          rectanglePosters{
//            rectanglePosters
//          }
//          availLanguages {
//            languages
//          }
//        }
//            }
//     `);
//     return getTVshows;
//   });
// }


export function GetCollections() {
  return useQuery("getCollection", async () => {
    const { getCollections } = await graphQLClient.request(gql`
      query {
        getCollections {
          name
          image
          type
        }
            }
    `);
    return getCollections;
  });
}

export function GetMovie(names) {
  return useQuery(["getMovie", names], async () => {
    const { getMovie } = await graphQLClient.request(
      gql`
        query {
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
      `,
      { names }
    );
    return getMovie;
  });
}

export function GetOtts() {
  return useQuery("getOtts", async () => {
    const { getOtts } = await graphQLClient.request(gql`
      query {
        getOtts {
          
          name
          image
          perMonth
        }
            }
    `);
    return getOtts;
  });
}

export function GetSeason(names) {
  return useQuery(["getSeason", names], async () => {
    const { getSeason } = await graphQLClient.request(
      gql`
        query {
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
      `,
      { names }
    );
    return getSeason;
  });
}

// export function GetTvshows(names) {
//   return useQuery(["getTVshows", names], async () => {
//     const { getTVshows } = await graphQLClient.request(
//       gql`
//         query {
//           getTVshows( limit: "${names}") {
//            id
//            name
//            storyline
//            casts {
//              castName
//            }
//            rating {
//              imdb
//              rottenTomatoes
//            }
//            posters {
//              posters
//            }
//            tvshowInfo {
//              rating
//              creator
//              writer
//              genre {
//                  genre
//              }
//              originalTitle
//              noOfseasons
//              status
//              Type
//              releaseDate
//            }
//            watchOn{
//              watchOnLink
//              watchOn
//            }
//            rectanglePosters{
//              rectanglePosters
//            }
//            availLanguages {
//              languages
//            }
//          }
//              }
//       `,
//       { names }
//     );
//     return getTVshows;
//   });
// }

export function GetTvshows(names) {
  return useQuery(["getTVshow1", names], async () => {
    const { getTVshow1 } = await graphQLClient.request(
      gql`
        query {
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
      `,
      { names }
    );
    return getTVshow1;
  });
}

export function SearchResults(names) {
  return useQuery(["searchMovie", names], async () => {
    const { searchMovie } = await graphQLClient.request(
      gql`
        query {

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
      `,
      { names }
    );
    return searchMovie;
  });
}