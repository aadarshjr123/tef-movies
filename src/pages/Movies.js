import React, { useEffect,useState } from "react";
import { FaGreaterThan } from 'react-icons/fa';
// import { OneMovie } from "../pages/OneMovie";
import { MoviesHomepage } from "../pages/MoviesHomepage";
import { CardLayout } from "../components/CardLayout";
import { CardLayout_3 } from "../components/CardLayout_3";
import { useQuery } from "@apollo/react-hooks";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
// import { datesconverter } from "./dates";
// import { latestDubbed } from "./data/LatestDubbed";

function Movies() {
  const { loading, error, data } = useQuery(GetMovies);
  
  if (error) return <h1>Something went wrong!</h1>;
  if (loading) 
  return <HomepageSkeleton />

  console.log(data);
  let some = data.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat).slice(0,5);
  let netflix = [];
  let Amazon = [];
  let Hotstar = [];
  let some1 = data.getMovies.filter((i) => {
    i.watchOn.map((j) => {
      if(j.watchOn === "Netflix") {
        // console.log("netflix");
        netflix.push(i); 
      } else if(j.watchOn === "Amazon Prime Videos") {
        // console.log("netflix");
        Amazon.push(i); 
      } else if(j.watchOn === "Disney Plus Hotstar") {
        // console.log("netflix");
        Hotstar.push(i); 
      }
    })
  })
  
  // .slice(0,5);
  // console.log();
  // let some1 = data.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat)
  // console.log(some);
  // console.log(some1);
  return (
    <main class="w-full mt-28 lg:mt-48 border-2 border-black"> 
    <MoviesHomepage />
       {/* <OneMovie/> */}
       {       
          // console.log(latestDubbed)
       }
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    <div class=" m-5 lg:m-0 space-x-1 flex h-full overflow-x-scroll hide-scroll-bar ">
    {
        //  latestDubbed(data)
        some.map((movies) => (
           <CardLayout  user={movies}/>
         ))
      }
     </div>
     

     </div>
     {/* Netflix */}
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Netflix movies</h3>  
    <div class="m-4"></div>
    <div class=" m-5 lg:m-0 space-x-1 flex h-full overflow-x-scroll hide-scroll-bar ">
    {
        //  latestDubbed(data)
        netflix.slice(0,5).map((movies) => (
           <CardLayout_3  user={movies}/>
         ))
      }
     </div>
     

     </div>
     {/* Netflix */}
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Amazon prime movies</h3>  
    <div class="m-4"></div>
    <div class=" m-5 lg:m-0  space-x-1 flex h-full overflow-x-scroll hide-scroll-bar ">
    {
        //  latestDubbed(data)
        Amazon.slice(0,5).map((movies) => (
           <CardLayout_3  user={movies}/>
         ))
      }
     </div>
     

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Hotstar movies</h3>  
    <div class="m-4"></div>
    <div class=" m-5 lg:m-0  space-x-1 flex h-full overflow-x-scroll hide-scroll-bar ">
    {
        //  latestDubbed(data)
        Hotstar.slice(0,5).map((movies) => (
           <CardLayout_3  user={movies}/>
         ))
      }
     </div>
     

     </div>
    </main>
  );
}
export default Movies;