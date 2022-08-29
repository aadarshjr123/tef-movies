import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetMovies } from "../query/GetMovies";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import {Image, Video, Transformation} from 'cloudinary-react';

const scrollToTop = () =>{
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
    /* you can also use 'auto' behaviour
       in place of 'smooth' */
  });
};
// window.addEventListener('scroll', toggleVisible);
export const CardLayout = ({ user: { name, storyline, posters, id ,watchOn} }) => (
  <div
  class=" flex justify-center items-center w-40 md:w-56 lg:w-52 h-72 md:h-90 lg:h-96 flex-nowrap"
  >
    <Link
      to={{
        pathname: "/OneMovie",
        search: `?${id}`,
        state: { fromDashboard: true },
      }}
      onClick={scrollToTop}
    >
      <div class="inline-block w-40 md:w-56 lg:w-56 h-60 md:h-90 lg:h-96 ">
      <div class="flex box-border h-5 md:h-10 lg:h-10 w-full justify-center items-center ">
        <div class="font-bold text-xs text-center dark:text-white">{name}</div>
      </div>
      <div
        class="mt-3 ml-2 lg:ml-4 animate-fade-in-down w-36 md:w-52 lg:w-48 h-48 md:h-72 lg:h-72 max-w-xs overflow-hidden  shadow-md bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          {/* <img
            class="h-full w-full"
            src={posters[0].posters}
            alt="Mountain"
          /> */}
          <Image
           class="h-full w-full"
          cloud_name="tefdb"
          loading="lazy"
          publicId={posters[0].posters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          format="webp"
          >
          <Transformation quality="85"/>
          </Image>
         
          {/* </a> */}
        </div>
        <div class="flex mt-3 box-border h-5 md:h-10 lg:h-10 w-full justify-center items-center ">
          {
            watchOn[0].watchOn === "Disney Plus Hotstar" ?
            <div class="font-bold text-blue-500 text-xs text-center">{watchOn[0].watchOn}</div>
            : watchOn[0].watchOn === "GooglePlay" ?
            <div class="font-bold  text-red-500 text-xs text-center">{watchOn[0].watchOn}</div>
            : watchOn[0].watchOn === "BookMyShow" ?
            <div class="font-bold  text-gray-400 text-xs text-center">{watchOn[0].watchOn}</div>
            :watchOn[0].watchOn === "Amazon Prime Videos" ?
            <div class="font-bold  text-blue-400 text-xs text-center">{watchOn[0].watchOn}</div>
            :watchOn[0].watchOn === "Itunes" ?
            <div class="font-bold  text-gray-500 text-xs text-center">{watchOn[0].watchOn}</div>
            :watchOn[0].watchOn === "Youtube Movies" ?
            <div class="font-bold  text-red-400 text-xs text-center">{watchOn[0].watchOn}</div>
            :watchOn[0].watchOn === "Netflix" ?
            <div class="font-bold  text-red-700 text-xs text-center">{watchOn[0].watchOn}</div>
            :watchOn[0].watchOn === "VImovies" ?
            <div class="font-bold text-xs text-center">{watchOn[0].watchOn}</div>
            :watchOn[0].watchOn === "Hungama" ?
            <div class="font-bold text-cyan-500 text-xs text-center">{watchOn[0].watchOn}</div>
            : <div class="font-bold text-gray-400 text-xs text-center">{watchOn[0].watchOn}</div>
            
          }
        </div>
      </div>
    </Link>
  </div>
);

// export default CardLayout;
