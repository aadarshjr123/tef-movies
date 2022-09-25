import React, { useEffect } from "react";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { MovieDetails } from "../components/MovieDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { Carousel } from "../components/Carousel";
import { CardColumn } from "../components/CardColumn";
import { Link } from "react-router-dom";
// import { OneMovie } from "../pages/OneMovie";
import {Image, Video, Transformation} from 'cloudinary-react';
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

export function MoviesHomepage() {
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

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';

  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );
  const { isLoading, error, data } = useQuery("GetMovies",Mov);
    console.log()

  // if (error) return <h1>Something went wrong!</h1>;
  // if (loading) 
  // return <Cardskeleton />
  const url = (data) => {
    console.log(`/OneMovie?${data}`)
  //  return `/OneMovie?${data}`
  }

  // let Latest = data.getMovies.slice(-5);
  // let Latest1 = data.getMovies.sort();
  let Latest = data.getMovies.sort(dynamicSort("id")).slice(-5);
  // console.log(Latest);
  console.log(Latest);

// console.log(window.location);

  return (
    
    <div class="w-full h-full flex flex-col md:flex-row lg:flex-row ">
    <div class="flex justify-center items-center w-full h-auto ">
      <Carousel value={Latest} type="Movie"/>
    </div>
    <div class="m-5 md:m-0 lg:m-0 h-auto lg:w-2/5 ">
    <div class="m-5"></div>
    <h3 class="lg:ml-4 font-bold text-sm md:text-2xl lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Popular movies</h3>
    <div class="m-2"></div>
    {
      // console.log(data.getMovies)
      data.getMovies.slice(0,2).map((movies) => (
        // console.log(movies);
        <div class="flex  md:h-48 lg:h-48 justify-center items-center flex-wrap flex--movie ">  
    <Link to={{
    pathname: "/OneMovie",
    search: `?${movies.id}`,
    state: { fromDashboard: true }
  }}>
  <div class="w-auto h-32 md:h-40 lg:h-40 md:w-full lg:w-full max-w-4xl rounded overflow-hidden m-2 flex justify-between ">
    <div class="md:flex-shrink-0 flex justify-center items-center  w-1/3">
      {/* <img class="md:w-28 object-contain lg:h-full lg:w-full rounded-lg"
           src={movies.posters[0].posters}
           alt="A Quiet Place movie poster" /> */}
             <Image 
            class="md:w-28 object-contain lg:h-full lg:w-full rounded-lg"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={movies.posters[0].posters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>    
    </div>
    <div class="flex w-3/4 flex-col flex-grow px-4 py-4 bg-color-333 ">
      <h3 class="font-RobotoMono font-bold text-sm md:text-2xl lg:text-xs text-black movie--title dark:text-white">{movies.name}</h3>
      <div class="m-1"></div>
      <span class="font-RobotoMono movie--year text-sm md:text-xs lg:text-xs dark:text-white">{movies.movieInfo[0].releaseDate.split(",")[1]} | {movies.movieInfo[0].runtime}</span>
      <div class="m-1"></div>
      <div class="flex-grow ">
        <p class="font-RobotoMono invisible md:visible lg:visible text-sm md:text-base lg:text-xs dark:text-white text-black leading-snug truncate-overflow">{movies.storyline}</p>
      </div>
      {/* <div class="m-1 "></div> */}
      {/* <div class=" h-10 justify-center items-center  button-container flex mb-4 border-4 border-black"> */}
        {/* <button class=" text-lg mr-4 lg:text-sm text-black">More Info</button> */}
        {/* <button class="text-lg lg:text-sm font-bold py-2 px-4 rounded bg-orange-200 text-orange-700">Add to List</button> */}
      {/* </div> */}
    </div>
  </div>
  </Link>
  </div>
  ))
    }
    <div class="m-5"></div>

            {/* <CardColumn data={data}/> */}
    <div class="font-RobotoMono md:ml-0 lg:ml-0 flex h-7 md:h-10 lg:h-10 w-full md:w-full lg:w-full rounded-sm bg-orange-300  justify-center items-center ">
      <a href="/Popular">
      More
      </a>
      
      </div>
    </div>
    
    </div>  
  );
}

// export default OneMovie;