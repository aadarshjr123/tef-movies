import React, { useEffect } from "react";
import { API_URL } from "../config";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { MovieDetails } from "../components/MovieDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { CarouselHome } from "../components/CarouselHome";
import { CardColumn } from "../components/CardColumn";
import { Link } from "react-router-dom";
// import { OneMovie } from "../pages/OneMovie";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';

let array = [];

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

export function Homepage(data) {

// console.log("moviesdata",data);
  const getMovies = gql`
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


  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }



  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );

  // const {isLoading, error, data, refetch} = useQuery("GetMovies",Mov,{staleTime: 1000 * 10});
  //   console.log()

  //     if (error) return <h1>Something went wrong!</h1>;
  //     if (isLoading) 
  //     return <Cardskeleton />

  // const url = (data) => {
  //   console.log(`/OneMovie?${data}`)
  // //  return `/OneMovie?${data}`
  // }

  // let Latest = data.getMovies.slice(-5);
  // let Latest1 = data.getMovies.sort();
  let Latest =  data.data.slice().sort(dynamicSort("id")).slice(-5);
  // console.log(Latest);
  // console.log(Latest);

// console.log(window.location);

  return (
    
    <div class=" w-full h-full flex flex-col md:flex-row lg:flex-row justify-center items-center ">
    <div class="flex justify-center items-center w-full h-full">
      <CarouselHome value={Latest} type="Movie"/>
    </div>    
    </div>  
  );
}

// export default OneMovie;
