import React,{useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { Homepage } from "./Homepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { CardLayoutTvshow_3 } from "../components/CardLayoutTvshow_3";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
import { GetMovies } from "../query/GetMovies";
import { GetCollections } from "../query/GetCollections";
import { CardLayout } from "../components/CardLayout";
import { Collection } from "../components/Collection";
import { SearchResults } from "../query/SearchResults";
import SearchData from "./searchData";

const Search =  () => {

  const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
  const [searchStart,setSearchStart ] = useState(false);
  const [searchName,setSearchName ] = useState("");

  // const = useQuery(GetTvshows("Tvshows"));
  const { loading:MoviesLoading, error:MoviesError, data:MoviesData }  = useQuery(GetMovies);
  const { loading:CollectionLoading, error:CollectionError, data:CollectionData }  = useQuery(GetCollections);


    // console.log()
    if (error || MoviesError || CollectionError) return <h1>{error}</h1>;
    if (loading || MoviesLoading || CollectionLoading) 
    return <HomepageSkeleton />
    // if (data) 
    // return <HomepageSkeleton />
    // const tvshowfilter = async () => {
    //   let some = await data;
    //   var arrayTvshows = [];
    //   await some.getTVshows.filter((movies) => {
    //     if(movies.tvshowInfo[0].Type === 'TVshows') {
    //       arrayTvshows.push(movies);
    //     }
    //   })
    //   return arrayTvshows;
    // }
  // console.log("38",CollectionData);


  let marvel = [];
  // MoviesData.getMovies.map((i) => {
  //   // console.log(i.movieInfo[0].genre);
  //   i.movieInfo[0].genre.map((j) => {
  //     if( j.genre === 'marvel')
  //     {
  //       marvel.push(i);
  //     }
  //   })
  // })

  let collection = []
  let genereCollection = []
  CollectionData.getCollections.map((i) => {
    if(i.type === 'genre') {
      collection.push(i)
    } else if(i.type === 'collection') {
      genereCollection.push(i)
    }
  })





  console.log("marvel",marvel);

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  let some1 = MoviesData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);

  let netflix = [];
  let Amazon = [];
  let Hotstar = [];
  // let some1 = data.getTVshow1.filter((i) => {
  //   i.watchOn.map((j) => {
  //     if(j.watchOn === "Netflix") {
  //       // console.log("netflix");
  //       netflix.push(i); 
  //     } else if(j.watchOn === "Amazon Prime Videos") {
  //       // console.log("netflix");
  //       Amazon.push(i); 
  //     } else if(j.watchOn === "Disney Plus Hotstar") {
  //       // console.log("netflix");
  //       Hotstar.push(i); 
  //     }
  //   })
  // })
    // let some = await tvshowfilter();
    // if(data)
    // return console.log(tvshowfilter());
  let onChangeSearchName =async (e) => {
    let words = e.target.value
    console.log(words);
    await setSearchName(words);
  }  

  let onSubmit =async (e)  => {
    e.preventDefault();
    await setSearchStart(true);
  }

  let onCancel =async (e)  => {
    e.preventDefault();
    await setSearchStart(false);
    await setSearchName("");
  }

  return (

    // console.log(data)
    <div className="mt-44 w-full">
        <form class="flex flex-row w-full">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div class="relative w-11/12">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input disabled={searchStart === true} onChange={onChangeSearchName} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies and more..." required></input>
        <button disabled={searchStart === true} type="submit" onClick={onSubmit} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        {
          searchStart ? <div class="relative items-center w-1/12">
          <button type="cancel" onClick={onCancel} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
          </div> : null
        }
        
        </form>
      {
        searchStart ? (
          <div class="">
            <SearchData names={searchName}/>
            </div>
        ):  (
          <div>
          <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Movie Collection</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0  space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
        
        collection.map((collection) => 
             <Collection  collection={collection}/>
           
         )
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Genres</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
         genereCollection.map((collection) => 
            <Collection  collection={collection}/>
         
         )
      }
     </div>
     </div> 
     </div>
        ) 
      }
     
    </div>
  );
};

export default Search;
