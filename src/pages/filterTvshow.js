import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { motion  } from "framer-motion";
import LazyLoad from 'react-lazy-load';
import InfiniteScroll from 'react-infinite-scroller';


const MovieDetailsss = (data) => {
  // console.log(data);
  // console.log(data.getMovies)
  // let some = [];
  console.log(window.location.href.split("?")[1]);
  console.log(data);
  return data;
};



function FilterTvshow() {
  let ddd = window.location.href.split("?")[1];
  const { loading, error, data } = useQuery(GetTvshows(ddd));
  const [filterData, setFilterData] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [indexMain, setIndexMain] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
//   const loadData = (data) => {
//     let datas = data.getTVshow1;
//     console.log(datas);
//     let some = [];
//     // let indexMain = 0;
//     setIndexMain(0);
//     datas.map((i,index) => {
//       // console.log('some.length',some.length);
//       // console.log(indexMain)
//       // console.log(indexMain +"==="+index)
//       if(indexMain === index && some.length < 5) {
//         // console.log("entered");

//         some.push(i);
//         // console.log(index)
//         // console.log(index + 1)
//         setIndexMain(indexMain + 1);
//       //   // console.log(index);

//       //   // console.log(indexMain);
//       } 
//       // console.log(some);

//       // if(indexMain === index + 1) {
//       //   setHasMore(false)
//       // }
//     })

//     // console.log(some);
//     // return some;
// }
console.log(data);

  
  const filterGenre =async (data,keys) => {
    let filterMoviesAction = [];
    let filterMoviesComedy = [];
    
    // console.log(data);
    
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
if (loading) 
return <h1>Loading</h1>;
const loader = <div className="loader">Loading ...</div>;

  return (
    <main class="w-full mt-10 "> 
    {/* {console.log(loadData(data))} */}
    {/* {console.log(loadData(data))}
    {console.log(loadData(data))} */}
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