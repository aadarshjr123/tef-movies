import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import UseAnimations from "react-useanimations";
import searchToX from 'react-useanimations/lib/searchToX';
import { GetCollections } from '../query/GetCollections';
import { HomepageSkeleton } from '../Skeleton/HomepageSkeleton';
import { Collection } from './Collection';
import { BrowserRouter, BrowserRouter as Router, Switch } from 'react-router-dom'; 

const SearchBox = () => {
    const [isActive, setIsActive] = useState(false);
    const { loading:CollectionLoading, error:CollectionError, data:CollectionData }  = useQuery(GetCollections);


    // console.log()
    if (CollectionError) return <h1>{CollectionError}</h1>;
    if (CollectionLoading) 
    return <HomepageSkeleton />
//   var searchBox = document.getElementById("search-box");
    // console.log(searchBox);
  function openSearchBox() {
    //   searchBox.classList.remove("hidden");
    setIsActive(false);
    console.log(isActive)
  }

  function closeSearchBox() {
    setIsActive(true);
    console.log(isActive)

  }
  console.log("38",CollectionData);

  let collection = []
  let genereCollection = []
  CollectionData.getCollections.map((i) => {
    if(i.type === 'genre') {
      collection.push(i)
    } else if(i.type === 'collection') {
      genereCollection.push(i)
    }
  })
  console.log("38",collection);
  console.log("38",genereCollection);


  return (
 
    <div class="border-1 h-10 justify-center border-black">
    <button class="w-20 text-white rounded-full" onClick={() =>  {
        console.log(isActive);
        // if(isActive === true) {
            
        // }
        isActive ? 
        setIsActive(false) : setIsActive(true)
        }}>
          <div class="z-50 relative h-12 w-10">
            <div class="bottom-0 absolute dark ">
            <div class="bottom-0  invisible md:visible lg:visible ml-10 lg:mt-4 lg:ml-0 ">
            <UseAnimations animation={searchToX} size={32} strokeColor="#fff"/>
            </div>
            </div>
            {/* <div class="lg:invisible"> */}
            <div class="bottom-0  absolute dark:invisible invisible md:visible lg:visible ml-10 lg:mt-4 lg:ml-0 ">
            <UseAnimations animation={searchToX} size={32}/>
            </div>
            </div>
            
            {/* </div> */}
            <div class="relative h-12 w-10 ">

            <div class="bottom-3 absolute lg:invisible md:invisible visible lg:mt-4 lg:ml-0 ">
            <UseAnimations animation={searchToX} size={20} />
            </div>
            <div class="bottom-3 absolute dark lg:invisible ">
            <div class="bottom-3 lg:invisible md:invisible visible lg:mt-4 lg:ml-0 ">
            <UseAnimations animation={searchToX} size={20} strokeColor="#fff"/>
            </div>
            </div>
            </div>
        </button>
    <div id="search-box" class={isActive ? "fixed top-0 left-0 w-screen h-screen bg-gray-900 z-90" : "z-2  hidden fixed top-0 left-0 w-screen h-screen bg-gray-900 z-90"}>
        {/* <button class="cursor-pointer text-6xl text-white hover:text-amber-500 absolute right-5 top-5" onClick={() => 
            {
                setIsActive(true)
                console.log(isActive)
            }
        } title="Close">&times;</button> */}
        <div class="border-1 w-full h-full flex pl-11 pt-20 justify-start items-start">
        <form class=" w-4/5">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies and more..." required></input>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        </form>
        <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Movie Collection</h3>  
    <div class="m-4"></div>
    <BrowserRouter>
    <Switch>
    <div class="m-2 lg:m-0  space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
        
        collection.map((collection) => 
          <Collection  collection={collection}/>
           
         )
      }
     </div>
    </Switch>
     </BrowserRouter>
     </div>
     
     {/* <div class="mt-5 ">
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

     </div> */}
        </div>
    </div>
</div>
  );
};

export default SearchBox;


