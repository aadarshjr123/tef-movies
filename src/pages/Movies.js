import React, { useEffect,useState,useRef } from "react";
import { FaGreaterThan } from 'react-icons/fa';
// import { OneMovie } from "../pages/OneMovie";
import { MoviesHomepage } from "../pages/MoviesHomepage";
import { CardLayout } from "../components/CardLayout";
import { CardLayout_3 } from "../components/CardLayout_3";
import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { datesconverter } from "./dates";
// import { latestDubbed } from "./data/LatestDubbed";

function Movies() {
    // const { loading, error, data } = useQuery(GetMovies);
    let MoviesData = localStorage.getItem('MoviesData');
    let MoviesLocalStoredData = JSON.parse(MoviesData);
    console.log(MoviesLocalStoredData)
    let localS = false;
    MoviesLocalStoredData !== null ? localS = true : localS = false
  const { loading, error, data } = useQuery(GetMovies,localS);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  if(localS ===  false) {
    if (error) return <h1>Something went wrong!</h1>;
    if (loading) 
    return <HomepageSkeleton />
  }

  console.log(data);
  let some = localS === true ?  MoviesLocalStoredData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat) : data.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);
  let netflix = [];
  let Amazon = [];
  let Hotstar = [];
  // let some1 = 
  localS === true ?
  MoviesLocalStoredData.getMovies.filter((i) => {
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
  :
  data.getMovies.filter((i) => {
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
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const scroll1 = (scrollOffset) => {
    ref1.current.scrollLeft += scrollOffset;
  };
  const scroll2 = (scrollOffset) => {
    ref2.current.scrollLeft += scrollOffset;
  };
  const scroll3 = (scrollOffset) => {
    ref3.current.scrollLeft += scrollOffset;
  };
  return (
    <main class="w-full mt-28 lg:mt-48 "> 
    <MoviesHomepage />
       {/* <OneMovie/> */}
       {       
          // console.log(latestDubbed)
       }
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    
    <div class="flex flex-row" >
      {
         some.length <=5 ? null : <button class="w-20" onClick={() => scroll(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
        //  latestDubbed(data)
        some.map((movies) => (
           <CardLayout  user={movies}/>
         ))
      }
     </div>
     {
         some.length <=5 ? null : <button class="w-20" onClick={() => scroll(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }
     </div>
     </div>
     {/* Netflix */}
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Netflix movies</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
         netflix.length <=5 ? null : <button class="w-20" onClick={() => scroll1(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref1} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    
    {
        //  latestDubbed(data)
        netflix.map((movies) => (
           <CardLayout_3  user={movies}/>
         ))
      }
     </div>
     
     {
         netflix.length <=5 ? null : <button class="w-20" onClick={() => scroll1(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }
    
    </div>
     

     </div>
     {/* Netflix */}
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Amazon prime movies</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    
    {
         Amazon.length <=5 ? null : <button class="w-20" onClick={() => scroll2(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    
    <div ref={ref2} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
        //  latestDubbed(data)
        Amazon.map((movies) => (
           <CardLayout_3  user={movies}/>
         ))
      }
     </div>
     {
         Amazon.length <=5 ? null : <button class="w-20" onClick={() => scroll2(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }
    
    </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Hotstar movies</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
         Hotstar.length <=5 ? null : <button class="w-20" onClick={() => scroll3(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    
    <div ref={ref3} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    
    {
        //  latestDubbed(data)
        Hotstar.map((movies) => (
           <CardLayout_3  user={movies}/>
         ))
      }
        </div>
        {
         Hotstar.length <=5 ? null : <button class="w-20" onClick={() => scroll3(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }
    
    </div>
     

     </div>
    </main>
  );
}
export default Movies;