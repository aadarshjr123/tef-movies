import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { GetTvshows } from "../query/GetTvshows";
import { MovieDetails } from "../components/MovieDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { Carousel } from "../components/Carousel";
import { CardColumn } from "../components/CardColumn";
import { Link } from "react-router-dom";
// import { OneMovie } from "../pages/OneMovie";
import {Image, Video, Transformation} from 'cloudinary-react';

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

export function TVShowHomepage(name) {
  console.log(name.name)
  // const { loading, error, data } = useQuery(GetMovies);
  let TvshowData = localStorage.getItem('TvshowData');
  let TvshowLocalStoredData = JSON.parse(TvshowData);
  console.log(TvshowLocalStoredData)
  let localS = false;
  TvshowLocalStoredData !== null ? localS = true : localS = false

  const { loading, error, data } = useQuery(GetTvshows(name.name),localS);

    console.log("35",data);
    // if (error) return <h1>Something went wrong!</h1>;
    // if (loading) 
    // return <Cardskeleton />
  // if (error) return <h1>Something went wrong!</h1>;
  // if (loading) 
  // return <Cardskeleton />

  const url = (data) => {
    console.log(`/OneMovie?${data}`)
  //  return `/OneMovie?${data}`
  }
  let Latest = localS ===  true ? TvshowLocalStoredData.getTVshow1.sort(dynamicSort("id")).slice(-5) : data.getTVshow1.sort(dynamicSort("id")).slice(-5);
  let lll =  localS ===  true ? TvshowLocalStoredData.getTVshow1:data.getTVshow1;
  console.log(lll)
console.log(Latest);

  return (
    <div class="w-full h-full flex flex-col md:flex-row lg:flex-row ">
    <div class="flex justify-center items-center w-full h-2/3 ">
      <Carousel value={Latest} type="Tvshow"/>
    </div>
    <div class="m-5 md:m-0 lg:m-0 h-auto lg:w-2/5">
    <div class="m-5"></div>
    <h3 class="lg:ml-4 font-bold text-sm md:text-2xl lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono ">Popular movies</h3>
    <div class="m-2"></div>
    {
      // console.log(data.getMovies)
      localS === true ? TvshowLocalStoredData.getTVshow1.slice(0,2).map((movies) => (
        // console.log(movies);
        <div class="flex  md:h-48 lg:h-48 justify-center items-center flex-wrap flex--movie ">  
    <Link to={{
    pathname: "/OneTvshow",
    search: `?${movies.id}?${name.name}`,
    state: { fromDashboard: true }
  }}>
  <div class="w-auto h-32 md:h-40 lg:h-40 md:w-full lg:w-full max-w-4xl rounded overflow-hidden m-2 flex justify-between ">
    <div class="md:flex-shrink-0 flex justify-center items-center w-1/3 ">
      <Image class="object-contain md:w-28 lg:h-full lg:w-full rounded-lg "
      cloud_name="tefdb"
      loading="lazy"
      format="webp"
      publicId={movies.posters[0].posters}
           alt="A Quiet Place movie poster">
            <Transformation quality="85"/>
           </Image>
    </div>
    <div class="flex w-3/4 flex-col flex-grow px-4 py-4 bg-color-333 ">
      <h3 class="font-RobotoMono font-bold text-sm md:text-2xl lg:text-xs text-black movie--title dark:text-white">{movies.name}</h3>
      <div class="m-1"></div>
      {/* <span class="movie--year text-sm md:text-xs lg:text-xs dark:text-white">2019</span> */}
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
  )):
      data.getTVshow1.slice(0,2).map((movies) => (
        // console.log(movies);
        <div class="flex  md:h-48 lg:h-48 justify-center items-center flex-wrap flex--movie ">  
    <Link to={{
    pathname: "/OneTvshow",
    search: `?${movies.id}?${name.name}`,
    state: { fromDashboard: true }
  }}>
  <div class="w-auto h-32 md:h-40 lg:h-40 md:w-full lg:w-full max-w-4xl rounded overflow-hidden m-2 flex justify-between ">
    <div class="md:flex-shrink-0 flex justify-center items-center w-1/3 ">
      <Image class="object-contain md:w-28 lg:h-full lg:w-full rounded-lg "
      cloud_name="tefdb"
      loading="lazy"
      format="webp"
      publicId={movies.posters[0].posters}
           alt="A Quiet Place movie poster">
            <Transformation quality="85"/>
           </Image>
    </div>
    <div class="flex w-3/4 flex-col flex-grow px-4 py-4 bg-color-333 ">
      <h3 class="font-RobotoMono font-bold text-sm md:text-2xl lg:text-xs text-black movie--title dark:text-white">{movies.name}</h3>
      <div class="m-1"></div>
      {/* <span class="movie--year text-sm md:text-xs lg:text-xs dark:text-white">2019</span> */}
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
    <div class="font-RobotoMono text-sm md:ml-0 lg:ml-0 flex h-7 md:h-10 lg:h-10 w-full md:w-full lg:w-full rounded-sm bg-orange-300  justify-center items-center ">
      {/* <a href="/PopularTvshows" class="text-sm"> */}
      <Link to={{
    pathname: "/PopularTvshows",
    search: `?${name.name}`,
    state: { fromDashboard: true }
  }}>
      More
      </Link>
      {/* </a> */}
      
      </div>
    </div>
    
    </div>  
  );
}

// export default OneMovie;
