import React, { useState } from "react";
  
const Navbar = () => {
  
  return (
    <div className="sticky flex justify-center items-center ml-5 md:m-0 lg:m-0 md:mt-4 lg:mt-4">
       <ul class="flex">
       {/* <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold font-RobotoMono" href="/Welcome">Welcome</a>
  </li> */}
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold font-RobotoMono" href="/Home">Home</a>
  </li>
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold font-RobotoMono whitespace-nowrap" href="/Tvshows">TV Shows</a>
  </li>
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold font-RobotoMono" href="/Movies">Movies</a>
  </li>
  <li class="mr-6">
    <a class="text-sm md:text-lg lg:text-lg text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold font-RobotoMono" href="/Welcome">About</a>
  </li>
</ul>
        
    </div>
  );
};
  
export default Navbar;