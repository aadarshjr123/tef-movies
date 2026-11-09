import React, { useEffect } from "react";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { MovieDetails } from "../components/MovieDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { CarouselHome } from "../components/CarouselHome";
import { CardColumn } from "../components/CardColumn";
import { Link } from "react-router-dom";
// import { OneMovie } from "../pages/OneMovie";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';
import { CarouselTrialers } from "../components/CarouselTrialers";

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

export function TrialersPage(data) {

  let Latest =  data.data.slice().sort(dynamicSort("id")).slice(-5);
  console.log(Latest);
  // console.log(Latest);

// console.log(window.location);

  return (
    
    <div class=" w-full h-full flex flex-col md:flex-row lg:flex-row justify-center items-center ">
    <div class="flex justify-center items-center w-full h-full">
      <CarouselTrialers value={Latest} />
      {/* HAi */}
    </div>    
    </div>  
  );
}

// export default OneMovie;
