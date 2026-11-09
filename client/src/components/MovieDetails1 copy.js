import React from "react";
import ReactPlayer from 'react-player';
import logo from '../tomatometer-fresh.149b5e8adc3.svg';
import logo1 from '../favicon_desktop_32x32._CB1582158068_.png';
import logo2 from '../404-error.png';
import logo3  from "../Frames1.png";

export const MovieDetails = (movie) => (
  <div class="flex w-full h-full  md:justify-center md:items-center  lg:justify-center lg:items-center ">
    <div
      class="
        m-6
        w-full
        lg:m-20  
               
        "
    >

        <div class="flex flex-col md:flex-row lg:flex-row w-80 md:w-full lg:w-full justify-center items-center h-auto md:h-28 lg:h-28 ">
      <div class="flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start w-full md:w-4/5 lg:w-4/5 font-normal text-3xl md:text-4xl lg:text-5xl ">{movie.movie[0].name} 
      <div class="tracking-wider md:w-full lg:w-2/5 h-full mt-2 ml-1 font-thin text-xs ">{movie.movie[0].movieInfo[0].releaseDate} | {movie.movie[0].movieInfo[0].runtime} | {movie.movie[0].movieInfo[0].rating[0].rating}</div>
      </div>
      <div class="m-3 md:m-0 lg:m-0" />
      <div class="flex flex-row md:flex-col lg:flex-col w-full md:w-1/5 lg:w-1/5 text-gray-400 text-center justify-center items-center font-medium text-xl ">
      <img class="rounded-lg object-fill  h-full w-8 " src={logo}  alt="Mountain" />
      <div class="m-1 md:m-0 lg:m-0" />
      <div class="text-black text-center ">
      {movie.movie[0].rating[0].rottenTomatoes}
      </div>
      
      </div>
      <div class="m-1 md:m-0 lg:m-0" />

      <div class=" flex flex-row md:flex-col lg:flex-col w-full md:w-1/5 lg:w-1/5 text-gray-400 text-center justify-center items-center font-medium text-xl ">
      <img class=" rounded-lg object-fill  h-full w-30" src={logo1}  alt="Mountain" />
      <div class="m-1 md:m-0 lg:m-0" />
      <div class="text-black text-center ">
      {movie.movie[0].rating[0].imdb}
      </div>
      </div>
        </div>
        {/* poster side */}
      <div class="m-10" />
      <div class="flex flex-col justify-center items-center md:flex-row lg:flex-row  w-80 md:w-full lg:w-full ">
      <a>
        <img class="rounded-lg object-fill w-48 md:w-80  lg:w-80 
        h-72 md:h-80 lg:h-96 " src={movie.movie[0].posters[0].posters} alt="Mountain" />
      </a>
      <div class="m-10 md:m-5 lg:m-5" />
      <div class="flex justify-center items-center md:justify-center md:items-center lg:justify-center lg:items-center w-80 md:h-72 lg:h-96 md:w-full lg:w-full md:grow lg:grow  ">
        {/* <div class="rounded-lg box-border h-96 w-220 p-4"> */}
        <ReactPlayer width='80%'
          height='100%' url={movie.movie[0].movieInfo[0].link} />
        {/* </div> */}
      </div>
      </div>
        {/* Cast & Crew */}
      
        <div class="m-10 md:m-10 lg:m-16" />

      <div class="w-4/5  font-medium text-xs md:text-sm lg:text-sm">Cast & Crew</div>
      <div class="m-5" />
    
      <div class="flex flex-row grow w-80 h-60 md:w-full lg:w-full md:h-60 lg:h-80 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar ">
      {
        movie.movie[0].casts.map((cast) => {
          // console.log(cast)
            return (
              cast.hasOwnProperty('image') ? 
                <div class="w-32 h-52 lg:w-40 lg:h-80 m-1 lg:m-2 ">
   <div class="flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
        <div class="font-normal text-xs text-center">{cast.castName}</div>
      </div>
      <div
        class="h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white hover:shadow-xl  transition-shadow duration-300 ease-in-out"
      >
        {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <img class=" rounded-lg object-fill  h-full w-full" src={cast.image} alt="Mountain" />
        {/* </a> */}
      </div>
  </div> :
  <div class="w-32 h-52 lg:w-40 lg:h-80 m-1 lg:m-2 ">
  <div class="flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
       <div class="font-normal text-xs text-center">{cast.castName}</div>
     </div>
     <div
       class="h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white hover:shadow-xl  transition-shadow duration-300 ease-in-out"
     >
       {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
         <img class=" rounded-lg object-fill  h-full w-full" src={logo3} alt="Mountain" />
       {/* </a> */}
     </div>
 </div>
            )
            
        })
    }
      </div>
      <div class="m-10 md:m-10 lg:m-16" />

      <div class=" w-80 md:w-4/5 lg:w-4/5 font-medium text-xs md:text-sm lg:text-sm">Storyline</div>
      <div class="m-5" />
      <div class=" flex flex-row grow w-80 md:w-full lg:w-full h-auto">
        <div class="font-normal text-xs text-left">{movie.movie[0].storyline}</div>
      </div>
      <div class="m-10 md:m-10 lg:m-16" />


      <div class=" w-80 md:w-4/5 lg:w-4/5 font-medium text-sm">Available languages</div>
      <div class="m-5" />
      <div class=" w-80 md:w-full lg:w-full h-auto md:h-16 lg:h-16 md:flex lg:flex grid grid-cols-3 grid-flow-rows md:flex-row lg:flex-row justify-start items-center gap-4 content-start">
        {
           movie.movie[0].availLanguages.map((languages) => {
            //  console.log(languages);
               return (
                   <div class="h-fit w-fit  rounded-md"><p class="mx-3 text-center text-sm">{languages.languages}</p></div>
               )
           })
        }
      </div>
  
      <div class="m-10 md:m-10 lg:m-16" />

      <div class="w-4/5 font-medium text-sm">Details</div>
      <div class="m-5" />
      <div class="h-auto flex flex-col justify-start ">
        <p class="flex flex-row mx-3 text-sky-400/100  text-sm"><p class="font-medium text-black mr-2"> Director</p>{movie.movie[0].movieInfo[0].director[0].director}</p>
      <div class="m-1" />

        <p class="flex flex-row mx-3 text-sky-400/100   text-sm"><p class="font-medium text-black mr-2">Rating</p>  {movie.movie[0].movieInfo[0].rating[0].rating}</p>
        <div class="m-1" />

        <p class="flex flex-row mx-3  text-sky-400/100 text-sm"><p class="font-medium text-black mr-2">ReleaseDate</p>  {movie.movie[0].movieInfo[0].releaseDate}</p>
        <div class="m-1" />

        <p class="flex flex-row mx-3 text-sky-400/100 text-sm"><p class="font-medium text-black mr-2">Runtime</p>  {movie.movie[0].movieInfo[0].runtime}</p>

      </div>
      <div class="m-10 md:m-10 lg:m-16" />
      <div class="w-full font-medium text-sm  ">
        <p class="">Where to watch ?</p>
    <div class=" flex flex-row space-x-4 grow items-center w-80 h-60 md:w-full lg:w-full md:h-60 lg:h-80 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar ">
    {
      movie.movie[0].watchOn.map((i) => {
        // console.log(i)
        {return(
          i.hasOwnProperty('image') ? 
            <div class="mt-10 w-32 h-36 md:w-40 md:h-48 lg:w-40 lg:h-48 font-medium border-gray-500 text-sm border-1 rounded-lg ">
<div class="flex justify-center items-center h-16 md:h-28 lg:h-28">
<img class="rounded-lg object-fill h-10 md:h-20 lg:h-20 w-10 md:w-20 lg:w-20" src={i.image} alt="Mountain" />
</div>
<div class="flex justify-center items-center ">
<hr class="w-36"></hr>
</div>
<div class="m-3 md:m-2 lg:m-2 flex justify-center items-center text-xs md:text-sm lg:text-sm">
<p>Rs 149 per month</p>
</div>
<div class="m-2 flex justify-center items-center  ">
{/* <p></p> */}
<a class="text-xs md:text-sm lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href={i.watchOnLink}>Watch now</a>
</div>
</div>
: 
  <div class="mt-10 w-32 h-36 md:w-40 md:h-48 lg:w-40 lg:h-48  font-medium border-gray-500 text-sm border-1 rounded-lg ">
<div class="flex justify-center items-center h-16 md:h-28 lg:h-28">
<img class="rounded-lg object-fill  h-10 md:h-20 lg:h-20" src={logo2} alt="Mountain" />
</div>
<div class="flex justify-center items-center ">
<hr class="w-36"></hr>
</div>
<div class="m-3 md:m-2 lg:m-2 flex justify-center items-center text-xs md:text-sm lg:text-sm ">
<p>Rs 149 per month</p>
</div>
<div class="m-2 flex justify-center items-center  ">
{/* <p></p> */}
<a class="text-xs md:text-sm lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold" href={i.watchOnLink}>Watch now</a>
</div>
</div>

        )
        }
      })
}
</div>
 </div>
      <div class="m-2 md:m-5 lg:m-5" />
    </div>
  </div>
);




