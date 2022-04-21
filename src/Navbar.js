import React, { useState } from "react";
  
const Navbar = () => {
  
  return (
    <div className="sticky flex justify-center items-center ml-5 md:m-0 lg:m-0 md:mt-4 lg:mt-4">
       <ul class="flex">
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href="/Home">Home</a>
  </li>
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href="/Tvshows">Tvshows</a>
  </li>
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href="/Movies">Movies</a>
  </li>
  {/* <li class="mr-6">
    <a class="text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href="/Anime">Anime</a>
  </li> */}
</ul>
        
    </div>
  );
};
  
export default Navbar;