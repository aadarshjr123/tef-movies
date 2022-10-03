import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
import { SearchResults } from "../query/SearchResults";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';




function SearchData(names) {


  const searchDatas = ({ queryKey }) => {
    const [_, names] = queryKey;
    console.log("season id",names);
    const somes = request(
      'https://tefmovies.herokuapp.com/graphql',
      gql `query SearchMovie($name: String!){
          searchMovie(name:$name){
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
    
    searchTvshows(name:$name){
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
      { name: names }
    ).catch(e => {
      console.log(e);
    })
    console.log("getSeason",somes);
    return somes;
  }
  
  console.log("start");
  console.log(names);

  // const searchDatas = (names) => gql`
  // query {

  //   searchMovie(name:"${names}"){
  //     id
  //     name
  //     storyline
  //     casts {
  //       castName
  //       CharacterName
  //     }
  //     rating {
  //       imdb
  //       rottenTomatoes
  //     }
  //     posters {
  //       posters
  //     }
  //     movieInfo {
  //       rating{
  //         rating
  //       }
  //       director{
  //         director
  //       }
  //       runtime
  //       link {
  //           title
  //           link
  //           date
  //       }
  //       releaseDate
  //       dateFormat
  //       genre {
  //           genre
  //       }
  //     }
  //     watchOn{
  //       watchOnLink
  //       watchOn
  //     }
  //     rectanglePosters{
  //       rectanglePosters
  //     }
  //     availLanguages {
  //       languages
  //     }
      
  //   }
  
  //       searchTvshows(name:"${names}"){
  //         id
  //         name
  //         Type
  //         storyline
  //         casts {
  //           castName
  //           CharacterName
  //         }
  //         rating {
  //           imdb
  //           rottenTomatoes
  //         }
  //         posters {
  //           posters
  //         }
  //         tvshowInfo {
  //           rating{
  //             rating
  //           }
  //           creator{
  //             creator
  //           }
  //           writer
  //           genre {
  //             genre
  //           }
  //           link {
  //             title
  //             link
  //             date
  //         }
  //           originalTitle
  //           noOfseasons
  //           status
  //           releaseDate
  //           dateFormat
  //         }
  //         watchOn {
  //           watchOnLink
  //           watchOn
  //         }
  //         rectanglePosters {
  //           rectanglePosters
  //         }
  //         availLanguages {
  //           languages
  //         }
  //       }
  //       }
  // `;

  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';
  
  // const SearchResults = (names) => request(API_URL,
  //   searchDatas(names),
  //   queryVariables,
  //   // headers
  // );

  const { isLoading:SearchLoading, error:SearchError, data:SearchData, refetch } = useQuery(["searchData",names.names],searchDatas);

  // const { isLoading:SearchLoading, error:SearchError, data:SearchData }  = useQuery("searchData",SearchResults(names.names));

if (SearchError) return <h1>Something went wrong!</h1>;
if (SearchLoading) 
return <HomepageSkeleton />
console.log(SearchData);
function containsUndefined(arr) {
  return SearchData.searchMovie.includes(undefined);
}

console.log(containsUndefined([1, undefined])); // 👉️ true
console.log(containsUndefined([1, 2])); // 👉️ false
  return (
    
    <main class="w-full flex justify-center lg:justify-start"> 
    <div >
            <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    <div class=" m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         SearchData.searchMovie.map((movies) => (
          // console.log(movies.name)
           <CardLayout user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed tvshoes</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden hide-scroll-bar ">
    {
         SearchData.searchTvshows.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>

     </div>
            </div>
    </main>
  );
}
export default SearchData;
