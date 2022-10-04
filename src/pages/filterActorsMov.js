import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";



function FilterActor() {

    let ddd
    let ddd1

  if(window.location.href.split("?")[1]) {
    ddd1 = window.location.href.split("?")[1];
    console.log(window.location.href);
    console.log(decodeURI(ddd));
    ddd = decodeURI(ddd1);
  } else {
    console.log("no params");
  }

  console.log("start");

  const getActors = gql`
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
  `;


  const getActorMov = ({ queryKey }) => {
    const [_, ddd] = queryKey;
    console.log("season id",ddd);
    const somes = request(
      'https://tefmovies.herokuapp.com/graphql',
      gql `query GetActorMov($name: String!){
        searchActorTvshows(casts:$name){
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

        searchActorMovie(casts:$name){
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
      `,
      { name: ddd }
    ).catch(e => {
      console.log(e);
    })
    console.log("getActorMovies",somes);
    return somes;
  }

  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';

  // const ActorsMov = () => request(API_URL,
  //   getActorMov,
  //   queryVariables,
  //   // headers
  // );

  const { isLoading, error, data } = useQuery(["getActorsMov",ddd],getActorMov);
  console.log("start1");
  console.log(data);


  // const [filterData, setFilterData] = useState([]);
  // const [filterState, setFilterState] = useState(false);
  // let marvel = [];
  // console.log(data);

  // data.getMovies.map((i) => {
  //   // console.log(i.movieInfo[0].genre);
  //   i.movieInfo[0].genre.map((j) => {
  //     if( j.genre.split(" ").join("") === ddd)
  //     {
  //       marvel.push(i);
  //     }
  //   })
  // })
  
  // console.log(marvel);



if (error) return <h1>Something went wrong!</h1>;
if (isLoading) 
return <h1 class="border-1">Loading</h1>;

  return (
    
    <main class="mt-40 w-full flex justify-center lg:justify-start"> 
    <div >
            <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    <div class=" m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         data.searchActorMovie.map((movies) => (
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
         data.searchActorTvshows.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>

     </div>
            </div>
    </main>
  );
}
export default FilterActor;
// filterData.map((movies) => (
//   <CardLayout  user={movies}/>
//  ))