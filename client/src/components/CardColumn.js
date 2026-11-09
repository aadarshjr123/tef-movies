import React from "react";


const CardLayout = (data) => (
  console.log(data.data.getMovies)
// data.data.getMovies.map((movies) => {
  // console.log(movies);
  // <div class="flex h-48 justify-center items-center flex-wrap flex--movie border-2 border-black">  
  // <div class="w-full h-40 md:w-full lg:w-full max-w-4xl rounded overflow-hidden m-4 flex justify-between border-2 border-black">
  //   <div class="md:flex-shrink-0 border-2 border-black">
  //     <img class="md:w-28 object-contain h-full w-full"
  //          src={data.posters[0].posters}
  //          alt="A Quiet Place movie poster" />
  //   </div>
  //   <div class="flex flex-col flex-grow px-8 py-4 bg-color-333 border-2 border-black">
  //     <h3 class="font-bold text-4xl md:text-2xl lg:text-xs text-black movie--title">{data.name}</h3>
  //     <span class="movie--year text-xl lg:text-xs lg:mb-4">2019</span>
  //     <div class="flex-grow">
  //       <p class="text-xl md:text-base lg:text-xs text-black leading-snug truncate-overflow">A family is forced to live in silence while hiding from creatures that hunt by sound.</p>
  //     </div>
  //     <div class="m-1"></div>
  //     <div class="h-10 justify-center items-center  button-container flex mb-4 border-4 border-black">
  //       <button class="text-lg mr-4 lg:text-sm text-black">More Info</button>
  //       {/* <button class="text-lg lg:text-sm font-bold py-2 px-4 rounded bg-orange-200 text-orange-700">Add to List</button> */}
  //     </div>
  //   </div>
  // </div>
  // </div>
// })
);



export const CardColumn = (data) => (
  // console.log(data)
  <CardLayout data={data}/>

);



