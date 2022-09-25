import React, { useRef } from "react";
import ReactPlayer from "react-player";
import logo from "../tomatometer-fresh.149b5e8adc3.svg";
import logo1 from "../favicon_desktop_32x32._CB1582158068_.png";
import logo2 from "../404-error.png";
import logo3 from "../Frames1.png";
import { CarouselPosters } from "./CarouselPosters";
import { CardLayout_2 } from "../components/CardLayout_2";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { FaGreaterThan } from 'react-icons/fa';
import {Image, Video, Transformation} from 'cloudinary-react';
import grabLink from "youtube-thumbnail-grabber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';

export const MovieDetails = (movie) => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);


  const getMovies = gql`
  query {
    getMovies {
      id
      name
      storyline
      casts {
        castName
        CharacterName
      }
      rating {
        imdb
        rottenTomatoes
      }
      posters {
        posters
      }
      movieInfo {
        rating{
          rating
        }
        director{
          director
        }
        runtime
        link {
            title
            link
            date
        }
        releaseDate
        dateFormat
        genre {
            genre
        }
      }
      watchOn{
        watchOnLink
        watchOn
      }
      rectanglePosters{
        rectanglePosters
      }
      availLanguages {
        languages
      }
      
    }
        }
  `;


  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';


  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );


  const [showModal, setShowModal] = React.useState(false);
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [showPostersModal, setShowPostersModal] = React.useState(false);
  const [videoLink, setVideoLink] = React.useState([]);
  const [postersLink, setPostersLink] = React.useState("");



  const { isLoading, error, data } = useQuery("GetMovies",Mov);
  let some = data.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat).slice(0,5);
  console.log(some);
  // let netflix = [];
  const { innerWidth: width, innerHeight: height } = window;
  console.log(width,height)
  console.log(movie.movie[0].movieInfo[0].link,"22 line");


  // console.log()
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const scroll1 = (scrollOffset) => {
    ref1.current.scrollLeft += scrollOffset;
  };
  const scroll2 = (scrollOffset) => {
    ref2.current.scrollLeft += scrollOffset;
  };
  const scroll3 = (scrollOffset) => {
    ref3.current.scrollLeft += scrollOffset;
  };
  const scroll4 = (scrollOffset) => {
    ref4.current.scrollLeft += scrollOffset;
  };
  const scroll5 = (scrollOffset) => {
    ref5.current.scrollLeft += scrollOffset;
  };
  return (
<div class=" mt-36 lg:mt-48 flex w-full h-auto  md:justify-center md:items-center  lg:justify-center lg:items-center ">
    <div
      class="
        m-4
        ml-6
        w-full
        "
    >
      <div class=" relative overflow-hidden w-80 h-550 lg:h-auto lg:w-full  ">
      <Image 
                  // class="object-cover blur-3xl h-450 lg:h-110 w-full "
                  cloud_name="tefdb"
                  loading="lazy"
                  format="webp"
            class="object-cover blur-3xl h-450 lg:h-110 w-full "
            publicId={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
            >
            <Transformation quality="85"/>
          </Image>
      <div class=" absolute top-0 left-0 px-6 w-full py-2.5 rounded-md h-450 lg:h-full justify-center items-center  flex flex-col lg:flex-row">
        <div class="lg:hidden w-full mt-10 lg:h-full lg:w-2/6  flex justify-center items-center">
          {/* <img
            class="object-fill w-48 md:w-80 lg:w-56 
        h-72 md:h-80 lg:h-80 "
            src={movie.movie[0].posters[0].posters}
            alt="Mountain"
          /> */}
          <CarouselPosters value={movie.movie[0].posters}/>
        </div>
        <div class=" lg:h-full lg:w-4/6 w-full lg:mt-5  flex flex-col justify-center ">
          <div class="font-RobotoMono text-white lg:text-left text-center mt-3 flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start w-full h-16 lg:h-auto md:w-4/5 lg:w-full font-extrabold text-xl md:text-lg lg:text-2xl">
            {movie.movie[0].name}
          </div>
          <div class="font-RobotoMono flex lg:justify-start lg:items-center  justify-center items-center mt-2 text-white tracking-wider md:w-full lg:w-2/5 h-auto font-thin text-xs ">
            {movie.movie[0].movieInfo[0].releaseDate} |{" "}
            {movie.movie[0].movieInfo[0].runtime} |{" "}
            {/* {movie.movie[0].movieInfo[0].rating[0].rating} */}
            { movie.movie[0].movieInfo[0].rating.map(i => {
              // console.log( i.rating)
              return (
                <span class="font-RobotoMono m-2  lg:m-2 text-xs lg:text-sm inline-block text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                  {i.rating}
                </span>
              )
            })}
          </div>
          <div class="font-RobotoMono flex lg:justify-start lg:items-start justify-center items-center  space-x-1 mt-5 lg:space-x-4 flex-row ">
            {movie.movie[0].availLanguages.map((languages,index,row) => {
      
              if(index + 1 !== row.length) {
                // console.log(index)
                return (
                  // <div class="flex justify-center items-center">
                    <span class="font-RobotoMono font-thin inline-block text-white  lg:py-0.5 text-xs ">
                    {languages.languages},
                    </span>
                  // </div>
                );
              } else {
                return (
                  <div class="flex justify-center items-center">
                    <span class="font-RobotoMono font-thin inline-block text-white rounded-md py-0.5 text-xs">
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
            <div className="font-RobotoMono"> 
            {movie.movie[0].storyline.substring(0, 400)}
            <a
        className="text-white ml-3 font-bold font-RobotoMono"
        // type="button"
        onClick={() => setShowModal(true)}
      >
        Show more
      </a>
            </div>
          </div> :
            
          <div class="font-RobotoMono text-center h-fit lg:h-auto flex justify-center items-center text-white mt-5 font-normal text-sm lg:text-left ">
          {movie.movie[0].storyline}
        </div>
          }
          {showModal ? (
        <>
          <div
            className= "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-80 lg:w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="dark:bg-black border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="font-RobotoMono dark:text-white ml-2 lg:text-3xl font-semibold">
                  {movie.movie[0].name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="font-RobotoMono bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="dark:bg-black relative p-6 flex-auto">
                  <p className="font-RobotoMono dark:text-white  my-4 text-slate-500 text-xs lg:text-sm leading-relaxed">
                  {movie.movie[0].storyline}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="font-RobotoMono text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-transparent rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2"
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
          <div class=" mt-5  w-auto lg:w-auto space-x-1 flex flex-row lg:justify-start lg:items-start justify-center items-center">
            {movie.movie[0].movieInfo[0].genre.slice(0,3).map((i) => {
              return (
                <div class="flex justify-center items-center">
                  <span class="font-RobotoMono text-xs lg:text-sm inline-block text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                    #{i.genre}
                  </span>
                </div>
              );
            })}
          </div>
          <div class=" mt-7 space-x-4 flex flex-row justify-center items-center lg:justify-start lg:items-start h-auto w-full ">
            <div class=" backdrop-blur-md bg-white/10  h-24 w-24 rounded-md">
              <div class="flex justify-center items-center h-2/4 md:h-28 lg:h-2/4 ">
                <img
                  class=" rounded-lg object-fill"
                  src={logo1}
                  alt="Mountain"
                />
                      {/* <Image 
            class=" rounded-lg object-fill"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={logo1}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image> */}
              </div>
              {/* <p class="text-white text-sm font-thin  flex justify-center items-center h-1/4">Rating</p> */}
              <p class="font-RobotoMono text-white text-sm font-thin flex justify-center items-center h-2/4">
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
              <p class="font-RobotoMono text-white text-sm font-thin  flex justify-center items-center h-2/4">
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

      <div class=" m-10 md:m-10 lg:m-16" />
      <div class="font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
        Videos to watch
      </div>
      <div class="m-10 " />
      <div class="flex flex-row" >
        {
          movie.movie[0].movieInfo[0].link.length <=5 ? null : <button  class="w-20" onClick={() => scroll5(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
        }

      <div ref={ref5} class=" flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-60 overflow-y-hidden overflow-x-scroll hide-scroll-bar ">
        {movie.movie[0].movieInfo[0].link.map((links,index) => {
          // console.log(cast)
          return (
            <div class="space-y-2 w-32 h-56 lg:w-60 lg:h-60 m-1 lg:m-4 ">
              <div class=" lg:ml-0 ml-1 lg:mt-1 mt-2 text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-56 lg:h-3/5 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <a 
                class="cursor-pointer"
                onClick={() => {
                  setShowVideoModal(true);
                  console.log("linw 237",links.link);
                  setVideoLink(links)
                }}>
                <img
                  class="lg:h-fit md:h-full h-full w-full md:w-full lg:w-fit"
                  src={`http://img.youtube.com/vi/${links.link.split("=")[1]}/maxresdefault.jpg`}
                  alt="cast"
                />
                </a>
              </div>
              <div class=" flex box-border w-32 h-8 lg:w-full lg:h-14 justify-center items-center  ">
                <div class="font-RobotoMono font-normal text-xs text-center dark:text-gray-200">
                  {links.title}
                </div>
              </div>

              {showVideoModal ? (
        <>
          <div
            className= " justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className=" relative lg:w-400 my-6 mx-auto max-w-3xl ">
              {/*content*/}
              {/* {console.log("videoLink",videoLink)} */}
              <div className="dark:bg-black border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className=" dark:text-white ml-2 lg:text-md font-semibold">
                  {videoLink.title}
                  </h3>
                 
                </div>
                {/*body*/}

                <div class="  flex justify-center items-center md:justify-center md:items-center lg:justify-center lg:items-center w-80 md:h-72 lg:h-96 md:w-full lg:w-full md:grow lg:grow  ">
        <div class="rounded-lg box-border h-96 w-full p-4">
        <ReactPlayer width='100%'
        // playing={true} 
        // pip={true }
        // stopOnUnmount={false}
          height='100%' url={videoLink.link} />
        </div>
      </div>
                {/* <div className="dark:bg-black relative p-6 flex-auto">
                  <p className="dark:text-white  my-4 text-slate-500 text-xs lg:text-sm leading-relaxed">
                  {movie.movie[0].storyline}
                  </p>
                </div> */}
                {/*footer*/}
                <div className="flex items-center justify-end p-6">
                  <button
                    className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-transparent rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2"
                    type="button"
                    onClick={() => setShowVideoModal(false)}
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
            </div>
          )
        })}
      </div>
      {
        movie.movie[0].movieInfo[0].link.length <=5 ? null : <button  class="w-20" onClick={() => scroll5(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }
      </div>

      <div class="m-10 md:m-10 lg:m-16" />

      <div class="font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
        Casts
      </div>
      <div class="m-10 " />
      <div class="flex flex-row" >
        {
          movie.movie[0].casts.length <=5 ? null : <button  class="w-20" onClick={() => scroll(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
        }
      <div ref={ref} class="scroll-smooth flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-82 overflow-y-hidden overflow-x-scroll hide-scroll-bar ">
        {movie.movie[0].casts.map((cast) => {
          console.log(cast)
          return cast.hasOwnProperty("image") ? (
            <div class=" w-32 h-56 lg:w-40 lg:h-96 m-1 lg:m-2 ">
              <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
                <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
                  {cast.castName}
                </div>
              </div>
              <div class=" lg:ml-0 ml-1 lg:mt-0 mt-2   text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out">
                {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
                {/* <img
                  class=" rounded-lg  lg:h-full md:h-full h-full w-full md:w-full lg:w-full"
                  src={cast.image}
                  alt="cast"
                /> */}
                <Image 
            class=" rounded-lg  lg:h-full md:h-full h-full w-full md:w-full lg:w-full"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={cast.image}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
                {/* </a> */}
              </div>
              <div class="m-2"></div>
              <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
                <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
                {cast.CharacterName}

                </div>
              </div>
            </div>
          ) : (
            <div class=" w-32 h-56 lg:w-40 lg:h-96 m-1 lg:m-2 ">
              <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
                <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
                  {cast.castName}
                </div>
              </div>
              {/* <div class="m-3"></div> */}
              <div class="font-RobotoMono lg:ml-0 ml-1 lg:mt-0 mt-2   text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out  text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
                TEFMovies
                {/* </a> */}
              </div>
              <div class="m-2"></div>
              <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
                <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
                {cast.CharacterName}

                </div>
              </div>
            </div>
          );
        })}
      </div>
      {
        movie.movie[0].casts.length <=5 ? null : <button  class="w-20" onClick={() => scroll(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }
      </div>
      <div class="m-10 md:m-10 lg:m-16" />
      <div class="font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
  Crew
</div>
<div class="m-5" />
<div class="flex flex-row" >
  {
    movie.movie[0].movieInfo[0].director.length <=5 ? null : <button  class="w-20" onClick={() => scroll1(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
  }      
<div ref={ref1} class=" flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-72 overflow-y-hidden overflow-x-scroll hide-scroll-bar ">
  {movie.movie[0].movieInfo[0].director.map((creator) => {
    console.log(creator)
    return creator.hasOwnProperty("image") ? (
      <div class=" w-32 h-56 lg:w-40 lg:h-72 m-1 lg:m-2 ">
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
            {creator.director}
          </div>
        </div>
        <div class=" flex justify-center items-center h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out">
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          {/* <img
            class=" rounded-lg object-fill lg:h-full md:h-full h-36 w-28 md:w-full lg:w-full"
            src={creator.image}
            alt="cast"
          /> */}
          <Image 
            class=" rounded-lg object-fill lg:h-full md:h-full h-36 w-28 md:w-full lg:w-full"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={creator.image}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
          {/* </a> */}
        </div>
        <div class="lg:m-2"></div>
        {/* <div class=" font-mono text-xs  dark:text-white text-gray-600 text-center">
            {cast.CharacterName}
          </div> */}
      </div>
    ) : (
      <div class=" w-32 h-56 lg:w-40 lg:h-96 m-1 lg:m-2 ">
        <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
          <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
            {creator.director}
          </div>
        </div>
        {/* <div class="m-3"></div> */}
        <div class="lg:ml-0 ml-1 lg:mt-0 mt-2  text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out  text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
          {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
          <p class="font-RobotoMono text-center text-sm"> 
          {creator.director}
          </p>
          {/* </a> */}
        </div>
      </div>
    );
  })}
</div>
{
  movie.movie[0].movieInfo[0].director.length <=5 ? null : <button  class="w-20" onClick={() => scroll1(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
}
</div>
      <div class="m-10 md:m-10 lg:m-16" />
      <div class="font-RobotoMono w-4/5  text-sm md:text-sm lg:text-sm dark:text-white">
        Posters
      </div>

      <div class="m-10 " />
      <div class="flex flex-row" >
        {
          movie.movie[0].posters.length <=5 ? null : <button  class="w-20" onClick={() => scroll2(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
        }

      <div ref={ref3} class=" flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-60 overflow-y-hidden overflow-x-scroll hide-scroll-bar ">
        {movie.movie[0].posters.map((posters,index) => {
          // console.log(cast)
          return (
            <div class=" w-32 h-56 lg:w-40 lg:h-60 m-1 lg:m-4 ">
              {/* <div class=" lg:ml-0 ml-1 lg:mt-1 mt-2 text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-56 lg:h-3/5 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
        <div class=" flex justify-center items-center h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out">
                
                <a 
                class="cursor-pointer"
                onClick={() => {
                  setShowPostersModal(true);
                  console.log("linw 237",posters);
                  setPostersLink(posters)
                }}>
                {/* <img
                  class="lg:h-fit md:h-full h-full w-full md:w-full lg:w-fit"
                  src={posters.posters}
                  alt="cast"
                /> */}
                     <Image 
            class="lg:h-fit md:h-full h-full w-full md:w-full lg:w-fit"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={posters.posters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
                </a>
              </div>

              {showPostersModal ? (
        <>
          <div
            className= " justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className=" relative lg:w-150 lg:h-300 my-6 mx-auto max-w-3xl ">
              {/*content*/}
              {/* {console.log("videoLink",postersLink.posters)} */}
              <div className=" dark:bg-black h-full rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                <div class=" flex justify-center items-center md:justify-center md:items-center lg:justify-center lg:items-center w-80 md:h-72 lg:h-52 md:w-full lg:w-full md:grow lg:grow  ">
        {/* <div class=" rounded-lg box-border h-full w-full"> */}
        {/* <img
                  class=" justify-center items-center lg:h-full md:h-full h-full w-full md:w-full lg:w-fit"
                  src={postersLink.posters}
                  alt="cast"
                /> */}
                <Image 
             class=" justify-center items-center lg:h-full md:h-full h-full w-full md:w-full lg:w-fit"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={postersLink.posters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
        {/* </div> */}
      </div>

                <div className="flex items-center justify-end p-6">
                  <button
                    className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-transparent rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2"
                    type="button"
                    onClick={() => setShowPostersModal(false)}
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
            </div>
          )
        })}
      </div>
      {
        movie.movie[0].posters.length <=5 ? null : <button  class="w-20" onClick={() => scroll2(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
      }

      </div>

      <div class=" m-10 md:m-10 lg:m-16" />
      <div class=" w-full font-medium text-sm  dark:text-white">
        <p class="font-RobotoMono">Watch now</p>
        <div class="flex flex-row" >
          {
            movie.movie[0].watchOn.length <=5 ? null : <button  class="w-20" onClick={() => scroll2(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
          }

        <div ref={ref3}class=" flex flex-row space-x-4 grow items-center w-80 h-60 md:w-full lg:w-full md:h-60 lg:h-80 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar ">
          {movie.movie[0].watchOn.map((i) => {
            console.log(i,"490")
            {
              return i.hasOwnProperty("image") ? (
                <div class="mt-10 w-32 h-40 md:w-40 md:h-52 lg:w-40 lg:h-52 font-medium dark:border-gray-700 border-gray-500 text-sm border-1 rounded-lg ">
                  <div class="flex justify-center items-center h-16 md:h-28 lg:h-28">
                    {/* <img
                      class="rounded-lg object-fill h-10 md:h-20 lg:h-20 w-10 md:w-20 lg:w-20"
                      src={i.image}
                      alt="Mountain"
                    /> */}
                    <Image 
             class="rounded-lg object-fill h-10 md:h-20 lg:h-20 w-10 md:w-20 lg:w-20"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={i.image}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
                  </div>
                  <div class="flex justify-center items-center ">
                    <hr class="w-32 dark:border-gray-700"></hr>
                  </div>
                  <div class="dark:text-white m-3 md:m-2 lg:m-2 flex justify-center items-center  text-xs md:text-sm lg:text-xs">
                    <p>{i.watchOn.split("-")[1]}</p>
                  </div>
                  <div class="font-RobotoMono dark:text-white m-3 md:m-2 lg:m-2 flex justify-center items-center text-xs md:text-sm lg:text-xs">
                    <p>{i.perMonth}</p>
                  </div>
                  <div class="m-2 flex justify-center items-center  ">
                    {/* <p></p> */}
                    <a
                      class="font-RobotoMono text-xs md:text-sm lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold"
                      href={i.watchOnLink}
                    >
                      Watch now
                    </a>
                  </div>
                </div>
              ) : (
                <div class="mt-10 w-32 h-36 md:w-40 md:h-48 lg:w-40 lg:h-48  font-medium border-gray-500 text-sm border-1 rounded-lg ">
                  <div class="flex justify-center items-center h-16 md:h-28 lg:h-28">
                    <img
                      class="rounded-lg object-fill  h-10 md:h-20 lg:h-20"
                      src={logo2}
                      alt="Mountain"
                    />
                    
                  </div>
                  <div class="flex justify-center items-center ">
                    <hr class="w-36"></hr>
                  </div>
                  <div class="font-RobotoMono m-3 md:m-2 lg:m-2 flex justify-center items-center text-xs md:text-sm lg:text-xs ">
                  <p>{i.perMonth}</p>
                  </div>
                  <div class="m-2 flex justify-center items-center  ">
                    {/* <p></p> */}
                    <a
                      class="font-RobotoMono text-xs md:text-sm lg:text-sm text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:font-bold"
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
        {
          movie.movie[0].watchOn.length <=5 ? null : <button  class="w-20" onClick={() => scroll3(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
        }
        </div>

      </div>
      <div class=" w-full font-medium text-sm  dark:text-white ">
        <p class="font-RobotoMono">Popular movies</p>
        <div class="m-10"></div>
        <div class="flex flex-row" >
          {
            some.length <=5 ? null : <button  class="w-20" onClick={() => scroll4(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
          }

        <div ref={ref4} class="  flex flex-row space-x-4 grow items-center w-80 h-80 md:w-full lg:w-full md:h-60 lg:h-110 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar ">
        {
        //  latestDubbed(data)
        some.map((movies) => (
           <CardLayout_2  user={movies}/>
         ))
      }
        </div>
        {
          some.length <=5 ? null : <button  class="w-20" onClick={() => scroll4(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
        }
        </div>
      </div>
    </div>
    
    
  </div>
  )
  
        };
