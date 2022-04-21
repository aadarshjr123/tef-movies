import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { TVShowHomepage } from "./TVShowHomepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { CardLayoutTvshow_3 } from "../components/CardLayoutTvshow_3";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";

const Tvshows =  () => {
  const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
    // console.log()
    if (error) return <h1>{error}</h1>;
    if (loading) 
    return <HomepageSkeleton />
    // if (data) 
    // return <HomepageSkeleton />
    // const tvshowfilter = async () => {
    //   let some = await data;
    //   var arrayTvshows = [];
    //   await some.getTVshows.filter((movies) => {
    //     if(movies.tvshowInfo[0].Type === 'TVshows') {
    //       arrayTvshows.push(movies);
    //     }
    //   })
    //   return arrayTvshows;
    // }

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat).slice(0,5);
  let netflix = [];
  let Amazon = [];
  let Hotstar = [];
  let some1 = data.getTVshow1.filter((i) => {
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
    // let some = await tvshowfilter();
    // if(data)
    // return console.log(tvshowfilter());

  return (

    // console.log(data)
    <div className=" w-full mt-28 lg:mt-48">
      <h1 className="text-3xl">
      <TVShowHomepage name="Tvshows"/>
    </h1>
    <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed tvshoes</h3>  
    <div class="m-4"></div>
    <div class="m-5 lg:m-0 space-x-1 flex h-full overflow-x-scroll hide-scroll-bar ">
    {
         some.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Netflix tvshows</h3>  
    <div class="m-4"></div>
    <div class="m-5 lg:m-0 space-x-1 flex h-full overflow-x-scroll hide-scroll-bar ">
    {
         netflix.slice(0,5).map((movies) => (
           <CardLayoutTvshow_3  user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Amazon prime tvshows</h3>  
    <div class="m-4"></div>
    <div class="m-5 lg:m-0 space-x-1 flex h-full overflow-x-scroll hide-scroll-bar">
    {
         Amazon.slice(0,5).map((movies) => (
           <CardLayoutTvshow_3  user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Hotstar tvshows</h3>  
    <div class="m-4"></div>
    <div class="m-5 lg:m-0 space-x-1 flex h-full overflow-x-scroll hide-scroll-bar">
    {
         Hotstar.slice(0,5).map((movies) => (
           <CardLayoutTvshow_3  user={movies}/>
         ))
      }
     </div>

     </div>
     
    </div>
  );
};

export default Tvshows;
