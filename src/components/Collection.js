import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetMovies } from "../query/GetMovies";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import logo1 from "../009afde4-1fd0-409e-8db6-7a04e0f1b62d.webp";
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
export const Collection = (collection) => (
  <div
  class=" flex justify-center items-center w-40 md:w-56 lg:w-52 h-60 md:h-52 lg:h-52 flex-nowrap"
  >
    {console.log("coll",collection.collection.name.split(" ").join(""))}
    <Link
      to={{
        pathname: "/PopularGenre",
        search: `?${collection.collection.name.split(" ").join("")}`,
        state: { fromDashboard: true },
      }}
      onClick={scrollToTop}
    >
      <div class="inline-block w-40 md:w-56 lg:w-56 h-60 md:h-52 lg:h-52 ">
      {/* <div class="flex box-border h-5 md:h-10 lg:h-10 w-full justify-center items-center ">
        <div class="font-bold text-xs text-center dark:text-white">{collection.collection.name}</div>
      </div> */}
      <div
        class="mt-3 ml-2  lg:ml-4  animate-fade-in-down w-36 md:w-52 lg:w-48 h-44 md:h-48 lg:h-48 max-w-xs overflow-hidden  shadow-md bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          {/* <img
            class="h-full w-full"
            src={collection.collection.image}
            alt="Mountain"
          /> */}

<Image 
            class="h-full w-full"
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
    </div>
    </Link>
  </div>
);

// export default CardLayout;