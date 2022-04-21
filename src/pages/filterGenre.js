import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
import { useQuery } from "@apollo/react-hooks";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";




function FilterGenre() {
  let ddd
  if(window.location.href.split("?")[1]) {
    ddd = window.location.href.split("?")[1];
    console.log(window.location.href);
    console.log(ddd);
  } else {
    console.log("no params");
  }

  const { loading, error, data } = useQuery(GetMovies);
  const [filterData, setFilterData] = useState([]);
  const [filterState, setFilterState] = useState(false);
  let marvel = [];
  console.log(data);
  data.getMovies.map((i) => {
    // console.log(i.movieInfo[0].genre);
    i.movieInfo[0].genre.map((j) => {
      if( j.genre === ddd)
      {
        marvel.push(i);
      }
    })
  })
  console.log(marvel);

if (error) return <h1>Something went wrong!</h1>;
if (loading) 
return <h1>Loading</h1>;

  return (
    <main class="w-full    mt-10"> 
    <div class="m-10 md:m-5 lg:m-5"></div>
    <div class="grid grid-cols-2  md:grid-cols-4  lg:grid-cols-4 -gap-4 gap-y-4  md:gap-4 lg:gap-4 ">
    {
      marvel.map((movies) => (
        //  <motion.div>
           <CardLayout  user={movies}/>
        //  </motion.div >
         ))
      } 
    </div>
    </main>
  );
}
export default FilterGenre;
// filterData.map((movies) => (
//   <CardLayout  user={movies}/>
//  ))