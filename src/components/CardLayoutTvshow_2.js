import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetMovies } from "../query/GetMovies";
import { Link } from "react-router-dom";
const scrollToTop = () =>{
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
    /* you can also use 'auto' behaviour
       in place of 'smooth' */
  });
};
export const CardLayoutTvshow_2 = ({ user: { name, watchOn,storyline, posters,Type ,id},  }) => (

  <div
  class=" flex justify-center items-center w-40 md:w-56 lg:w-52 h-60 md:h-90 lg:h-96 flex-nowrap lg:ml-10 md:ml-4 ml-5 "
  >
    {console.log(Type)}
     <Link to={{
    pathname: "/OneTvshow",
    search: `?${id}?${Type}`,
    state: { fromDashboard: true }
  }}
  onClick={scrollToTop}
  >
    <div class="inline-block w-40 md:w-56 lg:w-56 h-60 md:h-90 lg:h-96 ">
      <div class="flex box-border h-5 md:h-10 lg:h-10 w-full justify-center items-center ">
        <div class="font-bold text-xs text-center dark:text-white">{name}</div>
      </div>
      <div
        class="mt-3 ml-4 animate-fade-in-down w-36 md:w-52 lg:w-48 h-44 md:h-72 lg:h-72 max-w-xs overflow-hidden  shadow-md bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <img class=" h-full w-full" src={posters[0].posters} alt="Mountain" />
        {/* </a> */}
      </div>
    </div>
   
    </Link>
  </div>
);

// export default CardLayout;