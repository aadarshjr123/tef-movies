import React from "react";

import { GetMovies } from "../query/GetMovies";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import logo1 from "../009afde4-1fd0-409e-8db6-7a04e0f1b62d.webp";
import {Image, Video, Transformation} from 'cloudinary-react';




const scrollToTop = (collection) =>{
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
    /* you can also use 'auto' behaviour
       in place of 'smooth' */
  });
};
// window.addEventListener('scroll', toggleVisible);
export const CollectionActorMov = (collection) => (

<div
class=" flex justify-center items-center w-44 md:w-56 lg:w-60 h-72 md:h-90 lg:h-96 flex-nowrap"
>
  {/* {console.log(Type)} */}
   <Link to={{
  pathname: "/PopularActorMov",
  search: `?${collection.collection.name}`,
  state: { fromDashboard: true }
}}
onClick={scrollToTop}
>
  <div class="inline-block w-40 md:w-56 lg:w-56 h-60 md:h-90 lg:h-96 ">
    <div class="flex box-border h-5 md:h-10 lg:h-10 w-full justify-center items-center ">
      {/* <div class="font-RobotoMono font-bold text-xs text-center dark:text-white">{name}</div> */}
    </div>
    <div
      class="mt-3 ml-2 lg:ml-4 animate-fade-in-down w-36 md:w-52 lg:w-48 h-48 md:h-72 lg:h-72 max-w-xs overflow-hidden  shadow-md bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
        {/* <img class=" h-full w-full" src={posters[0].posters} alt="Mountain" /> */}
        <Image 
          class=" h-full w-full"
          cloud_name="tefdb"
          loading="lazy"
          format="webp"
          publicId={collection.collection.image}
          // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
          alt="Image"
        >
          <Transformation quality="85"/>
        </Image>
      {/* </a> */}
    </div>
    <div class="flex mt-3 box-border h-5 md:h-10 lg:h-10 w-full justify-center items-center ">
        <div class="font-RobotoMono font-bold text-gray-400 text-xs text-center">{collection.collection.name}</div>
      </div>
  </div>
 
  </Link>
</div>
);

// export default CardLayout;