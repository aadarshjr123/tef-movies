import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
// import { useQuery } from "@apollo/client";
import { GetTvshows } from "../query/GetTvshows";
import { motion  } from "framer-motion";
import LazyLoad from 'react-lazy-load';
import InfiniteScroll from 'react-infinite-scroller';
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';
import { useQueryClient  } from 'react-query'

// const MovieDetailsss = (data) => {
//   // console.log(data);
//   // console.log(data.getMovies)
//   // let some = [];
//   console.log(window.location.href.split("?")[1]);
//   console.log(data);
//   return data;
// };



function FilterTvshow() {
  const queryClient = useQueryClient()
  let ddd = window.location.href.split("?")[1];
  console.log(ddd);

  // const getTVshow1 = (ddd) => gql`
  // query {
  //   getTVshow1( Type: ${ddd}) {
  //     id
  //     name
  //     Type
  //     storyline
  //     casts {
  //       castName
  //       CharacterName
  //     }
  //     rating {
  //       imdb
  //       rottenTomatoes
  //     }
  //     posters {
  //       posters
  //     }
  //     tvshowInfo {
  //       rating{
  //         rating
  //       }
  //       creator{
  //         creator
  //       }
  //       writer
  //       genre {
  //         genre
  //       }
  //       link {
  //         title
  //         link
  //         date
  //     }
  //       originalTitle
  //       noOfseasons
  //       status
  //       releaseDate
  //       dateFormat
  //     }
  //     watchOn {
  //       watchOnLink
  //       watchOn
  //     }
  //     rectanglePosters {
  //       rectanglePosters
  //     }
  //     availLanguages {
  //       languages
  //     }
  //   }
  //       }
  // `;


  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';
  
  // const Tvshow = (ddd) => request(API_URL,
  //   getTVshow1(ddd),
  //   queryVariables,
  //   // headers
  // );

  // const { isLoading, error, data } = useQuery("GetTvshows",Tvshow(ddd));

  const datass = queryClient.getQueryData("GetTvshows");


  const getTvshows = ({ queryKey }) => {
    const [_, names] = queryKey;
    console.log("season id",names);
    const somes = request(
      'https://tefmovies.herokuapp.com/graphql',
      gql `query GetTvshow($name: String!){
        getTVshow1( Type: $name) {
          id
          name
          Type
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
          tvshowInfo {
            rating{
              rating
            }
            creator{
              creator
            }
            writer
            genre {
              genre
            }
            link {
              title
              link
              date
          }
            originalTitle
            noOfseasons
            status
            releaseDate
            dateFormat
          }
          watchOn {
            watchOnLink
            watchOn
          }
          rectanglePosters {
            rectanglePosters
          }
          availLanguages {
            languages
          }
        }
            }
      `,
      { name: names }
    ).catch(e => {
      console.log(e);
    })
    console.log("getSeason",somes);
    return somes;
  }

  // console.log("queryCacahe",datass);
 let status = true;

  if(datass !== undefined) {
    status = false;
  }
 
  let names = "Tvshows";

  const {  isLoading, error, data, refetch } = useQuery(["GetTvshows",names],getTvshows,{
    enabled: status,
  });


  const [filterData, setFilterData] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [indexMain, setIndexMain] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  

  
  const filterGenre =async (data,keys) => {
    let filterMoviesAction = [];
    let filterMoviesComedy = [];
    
    // console.log(data);
    // console.log(TvshowLocalStoredData);
    // console.log(localS);


    data.getTVshow1.filter((genre) => {
      //  console.log(genre.tvshowInfo[0].genre);
       genre.tvshowInfo[0].genre.filter((generes) => {
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


    if (error) return <h1>Something went wrong!</h1>;
    if (isLoading) 
    return <h1>Loading</h1>;
    const loader = <div className="loader">Loading ...</div>;

  return (
    <main class="w-full mt-40"> 
    {/* {console.log(loadData(data))} */}
    {/* {console.log(loadData(data))}
    {console.log(loadData(data))} */}
    <div class="flex flex-row  justify-center items-center">
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
    <div class="m-10 md:m-5 lg:m-5"></div>
    <div class="grid grid-cols-2  md:grid-cols-4  lg:grid-cols-4 -gap-4 gap-y-4  md:gap-4 lg:gap-4 ">
    {
     
       filterState === false ? 
      //  <InfiniteScroll
      //  pageStart={0}
      //  loadMore={loadData(data)}
      //  hasMore={hasMore}
      //  loader={loader}>
      
       data.getTVshow1.map((movies) => (
         
        //  <motion.div>
        // <LazyLoad>
        <CardLayoutTvshow  user={movies}/>
        // </LazyLoad>
        //  </motion.div >
         )) 
        //  </InfiniteScroll>
         :  
         filterData.map((movies) => (
          // <motion.div layoutId="underline">
        <LazyLoad>
          <CardLayoutTvshow  user={movies}/>
        </LazyLoad>
        // </motion.div >
            ))
      } 
    </div>
    </main>
  );
}
export default FilterTvshow;
// filterData.map((movies) => (
//   <CardLayout  user={movies}/>
//  ))