import React, { useEffect,useState } from "react";
import { API_URL } from "../config";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';
import { useQueryClient  } from 'react-query'


function FilterMovie() {
  const queryClient = useQueryClient()

  const datass = queryClient.getQueryData("GetMovies");
  console.log(datass);
  const getMovies = gql`
  query {
    getMovies {
      id
      name
      storyline
      casts {
        castName
        CharacterName
      }
      rating {
        imdb
        rottenTomatoes
      }
      posters {
        posters
      }
      movieInfo {
        rating{
          rating
        }
        director{
          director
        }
        runtime
        link {
            title
            link
            date
        }
        releaseDate
        dateFormat
        genre {
            genre
        }
      }
      watchOn{
        watchOnLink
        watchOn
      }
      rectanglePosters{
        rectanglePosters
      }
      availLanguages {
        languages
      }
      
    }
        }
  `;


  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  
  // console.log("queryCacahe",datass);
  let status = true;

  if(datass !== undefined) {
    status = false;
  }

  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );

  const { isLoading, error, data } = useQuery("GetMovies",Mov,{
    enabled: status,
    staleTime: 1000 * 10
  
  });
  const [filterData, setFilterData] = useState([]);
  const [filterState, setFilterState] = useState(false);



  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) 
  return <h1>Loading</h1>;

  console.log(data);

  var data2 = [...data.getMovies].reverse();
  console.log(data);
  console.log(data2);



  const filterGenre =async (data2,keys) => {
    let filterMoviesAction = [];
    let filterMoviesComedy = [];
    



    data2.filter((genre) => {
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




  return (
    <main class="w-full mt-40"> 
    <div class=" flex flex-row  justify-center items-center">
    <button class="text-xs border-1 w-16 h-6 dark:text-white border-orange-300 rounded-sm hover:bg-orange-300 hover:border-black" type="button" onClick={() => {filterGenre(data2,"All")}}>
      All
    </button>
    <div class="m-2"></div>
    <button class="text-xs border-1 w-16 h-6 dark:text-white border-orange-300 rounded-sm hover:bg-orange-300 hover:border-black" type="button" onClick={() => {filterGenre(data2,"Action")}}>
      action
    </button>
    <div class="m-2"></div>
    <button class="text-xs border-1 w-16 h-6 dark:text-white border-orange-300 rounded-sm hover:bg-orange-300 hover:border-black" type="button" onClick={() =>{filterGenre(data2,"Comedy")}}>
      comedy
    </button>
    </div>
    <div class="m-10 md:m-5 lg:m-20"></div>
    <div class="grid grid-cols-2  md:grid-cols-4  lg:grid-cols-4 -gap-4 gap-y-4  md:gap-4 lg:gap-4 ">
    {
       filterState === false ? 

       data2.map((movies) => (
         
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