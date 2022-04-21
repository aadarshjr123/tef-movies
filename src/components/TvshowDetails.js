import React from "react";
import ReactPlayer from 'react-player';
import logo from '../tomatometer-fresh.149b5e8adc3.svg';
import logo1 from '../favicon_desktop_32x32._CB1582158068_.png';
import logo2 from '../404-error.png';
import logo3  from "../Frames1.png";
import {Image, Video, Transformation} from 'cloudinary-react';
import { CarouselPosters } from "./CarouselPosters";
import { CardLayoutTvshow_2 } from "../components/CardLayoutTvshow_2";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { FaGreaterThan } from 'react-icons/fa';

export const TvshowDetails = (movie) => {
  const [showModal, setShowModal] = React.useState(false);
  const { innerWidth: width, innerHeight: height } = window;
  const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat).slice(0,5);
  console.log(some);
  console.log(width,height)
  return (
<div class="flex w-full h-auto  md:justify-center md:items-center  lg:justify-center lg:items-center ">
    <div
      class="
        m-6
        w-full
        lg:m-20  
               
        "
    >
      {/* {console.log(movie);} */}
      <div class="relative overflow-hidden h-450 lg:h-auto w-full  ">
      <Image 
            class="object-cover blur-3xl h-450 lg:h-110 w-full "
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={movie.movie[0].rectanglePosters[0].rectanglePosters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Mountain"
          >
            <Transformation quality="85"/>
          </Image>
      <div class=" absolute top-0 left-0 px-6 w-full py-2.5 rounded-md h-450 lg:h-full justify-center items-center  flex flex-col lg:flex-row">
        <div class=" lg:hidden w-full lg:h-full lg:w-2/6  flex justify-center items-center">
          {/* <Image
            class="object-fill w-48 md:w-80 lg:w-56 
        h-72 md:h-80 lg:h-80 "
        cloud_name="tefdb"
        loading="lazy"
        publicId={movie.movie[0].posters[0].posters}
        format="webp"
            // src={movie.movie[0].posters[0].posters}
            alt="Mountain"
            >
            <Transformation quality="85"/>
          </Image> */}
          <CarouselPosters value={movie.movie[0].posters}/>
        </div>
        <div class=" lg:h-full lg:w-4/6 w-full lg:mt-5  flex flex-col justify-center ">
          <div class=" text-white lg:text-left text-center mt-3 flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start w-full h-28 lg:h-auto md:w-4/5 lg:w-full font-extrabold text-xl md:text-lg lg:text-2xl">
            {movie.movie[0].name}
          </div>
          <div class="  flex lg:justify-start lg:items-center justify-center items-center mt-2 text-white tracking-wider md:w-full lg:w-2/5 h-auto font-thin text-xs ">
            {movie.movie[0].tvshowInfo[0].releaseDate} |{" "}
            {/* {movie.movie[0].tvshowInfo[0].runtime} |{" "} */}
            { movie.movie[0].tvshowInfo[0].rating.map(i => {
              // console.log( i.rating)
              return (
                <span class=" m-2  lg:m-2 text-xs lg:text-sm  font-mono inline-block text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                  {i.rating}
                </span>
              )
            })}
          </div>
          <div class="flex lg:justify-start lg:items-start justify-center items-center  space-x-1 mt-5 lg:space-x-4 flex-row ">
            {movie.movie[0].availLanguages.map((languages,index,row) => {
      
              if(index + 1 !== row.length) {
                // console.log(index)
                return (
                  // <div class="flex justify-center items-center">
                    <span class=" font-thin inline-block text-white  lg:py-0.5 text-xs ">
                    {languages.languages},
                    </span>
                  // </div>
                );
              } else {
                return (
                  <div class="flex justify-center items-center">
                    <span class="font-thin inline-block text-white rounded-md py-0.5 text-xs">
                    &nbsp;{languages.languages}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          {
            movie.movie[0].storyline.split(" ").length >= 100 ?
            <div class=" text-center h-auto lg:h-auto flex flex-col justify-center items-center text-white mt-5 font-normal text-sm lg:text-left ">
            <div className=""> 
            {movie.movie[0].storyline.substring(0, 400)}
            <a
        className="text-white ml-3 font-bold"
        // type="button"
        onClick={() => setShowModal(true)}
      >
        Show more
      </a>
            </div>
          </div> :
            
          <div class=" text-center h-auto lg:h-auto flex justify-center items-center text-white mt-5 font-normal text-sm lg:text-left ">
          {movie.movie[0].storyline}
        </div>
          }
          {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-80 lg:w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                  {movie.movie[0].name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-md leading-relaxed">
                  {movie.movie[0].storyline}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-transparent rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
          <div class="mt-5 w-auto lg:w-auto space-x-1 flex flex-row lg:justify-start lg:items-start justify-center items-center">
            {movie.movie[0].tvshowInfo[0].genre.slice(0,3).map((i) => {
              return (
                <div class="flex justify-center items-center">
                  <span class="text-xs lg:text-sm  font-mono inline-block text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                    #{i.genre}
                  </span>
                </div>
              );
            })}
          </div>
          <div class="mt-7 space-x-4 flex flex-row justify-center items-center lg:justify-start lg:items-start h-auto w-full ">
            <div class=" backdrop-blur-md bg-white/10  h-24 w-24 rounded-md">
              <div class="flex justify-center items-center h-2/4 md:h-28 lg:h-2/4 ">
                <img
                  class=" rounded-lg object-fill"
                  src={logo1}
                  alt="Mountain"
                />
              </div>
              {/* <p class="text-white text-sm font-thin  flex justify-center items-center h-1/4">Rating</p> */}
              <p class=" text-white text-sm font-thin flex justify-center items-center h-2/4">
                {movie.movie[0].rating[0].imdb}
              </p>
            </div>

            <div class="backdrop-blur-md bg-white/10 h-24 w-24 rounded-md ">
              <div class="flex  justify-center items-center h-2/4 md:h-28 lg:h-2/4">
                <img
                  class="h-3/5  rounded-lg object-fill"
                  src={logo}
                  alt="Mountain"
                />
              </div>
              {/* <p class="text-white text-sm font-thin flex justify-center items-center h-1/4">Rating</p> */}
              <p class="text-white text-sm font-thin  flex justify-center items-center h-2/4">
                {" "}
                {movie.movie[0].rating[0].rottenTomatoes}
              </p>
            </div>
          </div>
        </div>
        <div class="hidden h-full w-2/6  lg:flex justify-center items-center ">
          {/* <img
            class="object-fill w-48 md:w-80 lg:w-56 
        h-72 md:h-80 lg:h-80 "
            src={movie.movie[0].posters[0].posters}
            alt="Mountain"
          /> */}
          <CarouselPosters value={movie.movie[0].posters}/>

        </div>
      </div>
      </div>

      {/* Cast & Crew */}

      <div class="m-10 md:m-10 lg:m-16" />
      <div class="w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white ">
        Trailer
      </div>
      <div class="m-5" />

      <div class=" flex justify-center items-center md:justify-center md:items-center lg:justify-center lg:items-center w-80 h-48 md:h-72 lg:h-110 md:w-full lg:w-full md:grow lg:grow  ">
        {/* <div class="rounded-lg box-border h-96 w-220 p-4"> */}
        <ReactPlayer width='100%'
        // playing={true} 
        // pip={true }
        // stopOnUnmount={false}
          height='100%' url={movie.movie[0].tvshowInfo[0].link} />
        {/* </div> */}
      </div>
      <div class="m-10 md:m-10 lg:m-16" />

      <div class="m-10 md:m-10 lg:m-16" />

<div class="w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
  Casts
</div>
<div class="m-5" />
<div class="flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-110 overflow-y-hidden overflow-x-scroll hide-scroll-bar ">
  {movie.movie[0].casts.map((cast) => {
    console.log(cast)
    return cast.hasOwnProperty("image") ? (
      <div class=" w-32 h-56 lg:w-40 lg:h-96 m-1 lg:m-2 ">
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-normal text-xs text-center dark:text-white">
            {cast.castName}
          </div>
        </div>
        <div class=" flex justify-center items-center h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out">
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <img
            class=" rounded-lg object-fill lg:h-full md:h-full h-36 w-28 md:w-full lg:w-full"
            src={cast.image}
            alt="cast"
          />
          {/* </a> */}
        </div>
        <div class="lg:m-2"></div>
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-normal text-xs text-center dark:text-white">
          {cast.CharacterName}

          </div>
        </div>
        {/* <div class=" font-mono text-xs  dark:text-white text-gray-600 text-center">
            {cast.CharacterName}
          </div> */}
      </div>
    ) : (
      <div class=" w-32 h-56 lg:w-40 lg:h-96 m-1 lg:m-2 ">
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-normal text-xs text-center dark:text-white">
            {cast.castName}
          </div>
        </div>
        {/* <div class="m-3"></div> */}
        <div class="lg:ml-0 ml-1 lg:mt-0 mt-2  text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out  text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <p class="text-center text-sm">
          {cast.castName}
          </p>
          {/* </a> */}
        </div>
        <div class="m-2"></div>
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-normal text-xs text-center dark:text-white">
          {cast.CharacterName}
          </div>
        </div>
      </div>
    );
  })}
</div>
<div class="m-6"></div>
<div class="w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
  Crew
</div>
<div class="m-5" />
<div class=" flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-82 overflow-y-hidden overflow-x-scroll hide-scroll-bar ">
  {movie.movie[0].tvshowInfo[0].creator.map((creator) => {
    console.log(creator)
    return creator.hasOwnProperty("image") ? (
      <div class=" w-32 h-56 lg:w-40 lg:h-72 m-1 lg:m-2 ">
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-normal text-xs text-center dark:text-white">
            {creator.creator}
          </div>
        </div>
        <div class=" flex justify-center items-center h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out">
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <img
            class=" rounded-lg object-fill lg:h-full md:h-full h-36 w-28 md:w-full lg:w-full"
            src={creator.image}
            alt="cast"
          />
          {/* </a> */}
        </div>
        <div class="lg:m-2"></div>
        {/* <div class=" font-mono text-xs  dark:text-white text-gray-600 text-center">
            {cast.CharacterName}
          </div> */}
      </div>
    ) : (
      <div class=" w-32 h-56 lg:w-40 lg:h-72 m-1 lg:m-2 ">
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-normal text-xs text-center dark:text-white">
            {creator.creator}
          </div>
        </div>
        {/* <div class="m-3"></div> */}
        <div class="lg:ml-0 ml-1 lg:mt-0 mt-2  text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out  text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <p class="text-center text-sm"> 
          {creator.creator}
          </p>
          {/* </a> */}
        </div>
      </div>
    );
  })}
</div>
      <div class="m-10 md:m-10 lg:m-16" />

      {/* <div class=" w-80 md:w-4/5 lg:w-4/5 font-medium text-xs md:text-sm lg:text-sm">
        Storyline
      </div>
      <div class="m-5" />
      <div class=" flex flex-row grow w-80 md:w-full lg:w-full h-auto">
        <div class="font-normal text-xs text-left">
          {movie.movie[0].storyline}
        </div>
      </div> */}
      <div class="m-10 md:m-10 lg:m-16" />

      {/* <div class=" w-80 md:w-4/5 lg:w-4/5 font-medium text-sm">
        Available languages
      </div>
      <div class="m-5" />
      <div class=" w-80 md:w-full lg:w-full h-auto md:h-16 lg:h-16 md:flex lg:flex grid grid-cols-3 grid-flow-rows md:flex-row lg:flex-row justify-start items-center gap-4 content-start">
        {movie.movie[0].availLanguages.map((languages) => {
          //  console.log(languages);
          return (
            <div class="h-fit w-fit  rounded-md">
              <p class="mx-3 text-center text-sm">{languages.languages}</p>
            </div>
          );
        })}
      </div> */}

      <div class="m-10 md:m-10 lg:m-16" />

      {/* <div class="w-4/5 font-medium text-sm">Details</div> */}
      <div class="m-5" />
      {/* <div class="h-auto flex flex-col justify-start ">
        <p class="flex flex-row mx-3 text-sky-400/100  text-sm">
          <p class="font-medium text-black mr-2"> Director</p>
          {movie.movie[0].movieInfo[0].director[0].director}
        </p>
        <div class="m-1" />

        <p class="flex flex-row mx-3 text-sky-400/100   text-sm">
          <p class="font-medium text-black mr-2">Rating</p>{" "}
          {movie.movie[0].movieInfo[0].rating[0].rating}
        </p>
        <div class="m-1" />

        <p class="flex flex-row mx-3  text-sky-400/100 text-sm">
          <p class="font-medium text-black mr-2">ReleaseDate</p>{" "}
          {movie.movie[0].movieInfo[0].releaseDate}
        </p>
        <div class="m-1" />

        <p class="flex flex-row mx-3 text-sky-400/100 text-sm">
          <p class="font-medium text-black mr-2">Runtime</p>{" "}
          {movie.movie[0].movieInfo[0].runtime}
        </p>
      </div> */}
      <div class="m-10 md:m-10 lg:m-16" />
      <div class="w-full font-medium text-sm dark:text-white ">
        <p class="">Watch now</p>
        <div class=" flex flex-row space-x-4 grow items-center w-80 h-60 md:w-full lg:w-full md:h-60 lg:h-80 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar ">
          {movie.movie[0].watchOn.map((i) => {
            console.log(i)
            {
              return i.hasOwnProperty("image") ? (
                <div class="mt-10 w-32 h-36 md:w-40 md:h-48 lg:w-40 lg:h-48 font-medium  dark:border-gray-700 border-gray-500 text-sm border-1 rounded-lg ">
                  <div class="flex justify-center items-center h-16 md:h-28 lg:h-28">
                    <img
                      class="rounded-lg object-fill h-10 md:h-20 lg:h-20 w-10 md:w-20 lg:w-20"
                      src={i.image}
                      alt="Mountain"
                    />
                  </div>
                  <div class="flex justify-center items-center ">
                    <hr class="w-36 dark:border-gray-700"></hr>
                  </div>
                  <div class="m-3 md:m-2 lg:m-2 flex justify-center items-center text-xs md:text-sm lg:text-sm">
                    <p>{i.perMonth}</p>
                  </div>
                  <div class="m-2 flex justify-center items-center  ">
                    {/* <p></p> */}
                    <a
                      class="text-xs md:text-sm lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold"
                      href={i.watchOnLink}
                    >
                      Watch now
                    </a>
                  </div>
                </div>
              ) : (
                <div class="mt-10 w-32 h-36 md:w-40 md:h-48 lg:w-40 lg:h-48  font-medium dark:border-gray-700 border-gray-500 text-sm border-1 rounded-lg ">
                  <div class="flex justify-center items-center h-16 md:h-28 lg:h-28">
                    <img
                      class="rounded-lg object-fill  h-10 md:h-20 lg:h-20"
                      src={logo2}
                      alt="Mountain"
                    />
                  </div>
                  <div class="flex justify-center items-center ">
                    <hr class="w-36 dark:border-gray-700"></hr>
                  </div>
                  <div class="m-3 md:m-2 lg:m-2 flex justify-center items-center text-xs md:text-sm lg:text-sm ">
                  <p>{i.perMonth}</p>
                  </div>
                  <div class="m-2 flex justify-center items-center  ">
                    {/* <p></p> */}
                    <a
                      class="text-xs md:text-sm lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold"
                      href={i.watchOnLink}
                    >
                      Watch now
                    </a>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div class=" w-full font-medium text-sm  dark:text-white ">
        <p class="">Popular tvshows</p>
        <div class=" flex flex-row space-x-4 grow items-center w-80 h-56 md:w-full lg:w-full md:h-60 lg:h-80 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar ">
        {
        //  latestDubbed(data)
        some.map((movies) => (
           <CardLayoutTvshow_2  user={movies}/>
         ))
      }
        </div>
      </div>
      <div class="m-2 md:m-5 lg:m-5" />
    </div>
  </div>
  )
};


