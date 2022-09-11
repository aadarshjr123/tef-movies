import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";




function FilterMovie() {
    // const { loading, error, data } = useQuery(GetMovies);
    let MoviesData = localStorage.getItem('MoviesData');
    let MoviesLocalStoredData = JSON.parse(MoviesData);
    console.log(MoviesLocalStoredData)
    let localS = false;
    MoviesLocalStoredData !== null ? localS = true : localS = false
  const { loading, error, data } = useQuery(GetMovies,localS);
  const [filterData, setFilterData] = useState([]);
  const [filterState, setFilterState] = useState(false);

  console.log(data);



  const filterGenre =async (data,keys) => {
    let filterMoviesAction = [];
    let filterMoviesComedy = [];
    


    // console.log(data);
    localS !== false ? 
    MoviesLocalStoredData.getMovies.filter((genre) => {
      //  console.log(genre.movieInfo[0].genre);
       genre.movieInfo[0].genre.filter((generes) => {
        // console.log(generes)
        if(generes.genre.toLowerCase() === "action") {
          // console.log(genre.genre);
          filterMoviesAction.push(genre);
        } else if(generes.genre.toLowerCase() === "comedy") {
          filterMoviesComedy.push(genre);
        }
       })
      
    }) :
    data.getMovies.filter((genre) => {
      //  console.log(genre.movieInfo[0].genre);
       genre.movieInfo[0].genre.filter((generes) => {
        // console.log(generes)
        if(generes.genre.toLowerCase() === "action") {
          // console.log(genre.genre);
          filterMoviesAction.push(genre);
        } else if(generes.genre.toLowerCase() === "comedy") {
          filterMoviesComedy.push(genre);
        }
       })
      
    })
    
    if(keys === "Comedy") {
      setFilterState(true)
      // console.log(filterMoviesComedy)
      return setFilterData(filterMoviesComedy)
    } else if(keys === "Action") {
      setFilterState(true)
      console.log(filterMoviesAction)
      return setFilterData(filterMoviesAction)
    } else {
      setFilterState(false)

    }
  }
if(localS === false) {
  if (error) return <h1>Something went wrong!</h1>;
  if (loading) 
  return <h1>Loading</h1>;
}

  return (
    <main class="w-full mt-40"> 
    <div class=" flex flex-row  justify-center items-center">
    <button class="text-xs border-1 w-16 h-6 dark:text-white border-orange-300 rounded-sm hover:bg-orange-300 hover:border-black" type="button" onClick={() => {filterGenre(data,"All")}}>
      All
    </button>
    <div class="m-2"></div>
    <button class="text-xs border-1 w-16 h-6 dark:text-white border-orange-300 rounded-sm hover:bg-orange-300 hover:border-black" type="button" onClick={() => {filterGenre(data,"Action")}}>
      action
    </button>
    <div class="m-2"></div>
    <button class="text-xs border-1 w-16 h-6 dark:text-white border-orange-300 rounded-sm hover:bg-orange-300 hover:border-black" type="button" onClick={() =>{filterGenre(data,"Comedy")}}>
      comedy
    </button>
    </div>
    <div class="m-10 md:m-5 lg:m-20"></div>
    <div class="grid grid-cols-2  md:grid-cols-4  lg:grid-cols-4 -gap-4 gap-y-4  md:gap-4 lg:gap-4 ">
    {
       filterState === false ? 
       
       localS !== false ? 
       MoviesLocalStoredData.getMovies.map((movies) => (
         
        //  <motion.div>
           <CardLayout  user={movies}/>
        //  </motion.div >
         )) :
       data.getMovies.map((movies) => (
         
        //  <motion.div>
           <CardLayout  user={movies}/>
        //  </motion.div >
         )) 
         :  filterData.map((movies) => (
          // <motion.div layoutId="underline">
          <CardLayout  user={movies}/>
        // </motion.div >
            ))
      } 
    </div>
    </main>
  );
}
export default FilterMovie;
// filterData.map((movies) => (
//   <CardLayout  user={movies}/>
//  ))