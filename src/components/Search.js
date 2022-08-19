import React, { useState } from 'react';
import UseAnimations from "react-useanimations";
import searchToX from 'react-useanimations/lib/searchToX';

const SearchBox = () => {
    const [isActive, setIsActive] = useState(false);
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
        <div class="w-full h-full flex justify-center items-center">
            <form action="">
                <input type="text" placeholder="What are you looking for?" name="search"
                    class="w-96 px-3 py-2 rounded-tl-full rounded-bl-full border-0 focus:outline-0"></input>
                <button type="submit" class="px-3 py-2 -ml-1.5 bg-green-500 hover:bg-green-600 text-white rounded-tr-full rounded-br-full">Search</button>
            </form>
        </div>
    </div>
</div>
  );
};

export default SearchBox;


