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


function FilterGenre() {
  
  const [filterData, setFilterData] = useState([]);
  const [filterState, setFilterState] = useState(false);
  console.log("start");
  const queryClient = useQueryClient()
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
  const datass1 = queryClient.getQueryData("GetMovies");
  console.log("somes",datass1);
  // const headers = { Authorization: `Bearer ${user._accessToken}` }


  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );

    // console.log("queryCacahe",datass);

 let status1 = true;

  if(datass1 !== undefined) {
    status1 = false;
  }



  // const { isLoading, error, data } = useQuery("GetMovies",Mov);
  
  const { isLoading:MoviesLoading, error:MoviesError, data:MoviesData } = useQuery("GetMovies",Mov,{
    enabled: status1,
    staleTime: 1000 * 10
  });

  if (MoviesError) return <h1>Something went wrong!</h1>;
if (MoviesLoading) 
return <h1 class="border-1">Loading</h1>;

// if (MoviesError) return <h1>Something went wrong!</h1>;
console.log(MoviesLoading)
console.log(MoviesError)

  
  console.log("start1");

  let ddd
  if(window.location.href.split("?")[1]) {
    ddd = window.location.href.split("?")[1];
    console.log(window.location.href);
    console.log(ddd);
  } else {
    console.log("no params");
  }

  let marvel = [];
  console.log(MoviesData);

  MoviesData.getMovies.map((i) => {
    // console.log(i.movieInfo[0].genre);
    i.movieInfo[0].genre.map((j) => {
      if( j.genre.split(" ").join("") === ddd)
      {
        marvel.push(i);
      }
    })
  })
  
  console.log(marvel);





  return (
    
    <main class="w-full flex justify-center lg:justify-start  mt-32 lg:mt-48"> 
    {/* <div class="m-10 md:m-5 lg:m-5"></div> */}
    <div class="grid grid-cols-2 md:grid-cols-6  lg:grid-cols-6 gap-y-6 gap-x-3  md:gap-4 lg:gap-4 ">
    {
      marvel.length <=0 ? <div class="ml-44 w-400 justify-center text-center">
        <h1 class="m-40 justify-center text-2xl dark:text-white">Sorry,We are updating as soon as we can.</h1>
        </div>
        :
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