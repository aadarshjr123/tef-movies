import React from "react";
import { useQuery } from "@apollo/client";
import { GetTvshows } from "../query/GetTvshows";
import { TVShowHomepage } from "./TVShowHomepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { Cardskeleton } from "../Skeleton/Cardskeleton";

const Anime =  () => {
  const { loading, error, data } = useQuery(GetTvshows("Anime"));
    // console.log()
    if (error) return <h1>{error}</h1>;
    if (loading) 
    return <Cardskeleton />
    
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

    // let some = await tvshowfilter();
    // if(data)
    // return console.log(tvshowfilter());

  return (

    // console.log(data)
    <div className="">
      <h1 className="text-3xl">
      <TVShowHomepage name="Anime"/>
    </h1>
    <div class="">
     <div class="m-16"></div>
    <h3 class=" font-bold ml-10  text-4xl md:text-2xl lg:text-sm text-black">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    <div class="h-full  flex overflow-x-scroll pb-10 hide-scroll-bar">
    {
         data.getTVshow1.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="">
     <div class="m-16"></div>
    <h3 class=" font-bold ml-10  text-4xl md:text-2xl lg:text-sm text-black">Now Streaming</h3>  
    <div class="m-4"></div>
    <div class="h-full  flex overflow-x-scroll pb-10 hide-scroll-bar">  
      {
         data.getTVshow1.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }     
        
     </div>

     </div>
    </div>
  );
};

export default Anime;
