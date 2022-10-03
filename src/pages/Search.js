
import React,{useState} from "react";
// import { useQuery } from "@apollo/client";
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
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';

const Search =  () => {

  // const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
  const [searchStart,setSearchStart ] = useState(false);
  const [searchName,setSearchName ] = useState("");

  const getCollections = gql`
  query {
    getCollections {
      name
      image
      type
    }
        }
  `;

  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';
  
  const Coll = () => request(API_URL,
    getCollections,
    queryVariables,
    // headers
  );

    const {  isLoading:CollectionLoading, error:CollectionError, data:CollectionData  }  = useQuery("GetCollections", Coll);


    if (CollectionError) return <h1>{CollectionError}</h1>;
    if (CollectionLoading) 
    return <HomepageSkeleton />

// console.log(CollectionData);
  let marvel = [];

  let collection = []
  let genereCollection = []

  CollectionData.getCollections.map((i) => {
    if(i.type === 'genre') {
      collection.push(i)
    } else if(i.type === 'collection') {
      genereCollection.push(i)
    }
  })






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
        <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input disabled={searchStart === true} onChange={onChangeSearchName} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies and more..." required></input>
        <button disabled={searchStart === true} type="submit" onClick={onSubmit} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ">Search</button>
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
