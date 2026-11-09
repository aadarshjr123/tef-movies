import React, { useEffect, useRef } from "react";
import { API_URL } from "../config";
import ReactPlayer from "react-player";
import logo from "../tomatometer-fresh.149b5e8adc3.svg";
import logo1 from "../favicon_desktop_32x32._CB1582158068_.png";
import logo2 from "../404-error.png";
import logo3 from "../Frames1.png";
import { Image, Video, Transformation } from "./CloudImage";
import { CarouselPosters } from "./CarouselPosters";
import { CardLayoutTvshow_2 } from "../components/CardLayoutTvshow_2";
// import { useQuery } from "@apollo/client";
import { GetTvshows } from "../query/GetTvshows";
import { FaGreaterThan } from "react-icons/fa";
import Accordion from "./Accordion";
import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import ImageScroller from "react-image-scroller";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
    /* you can also use 'auto' behaviour
       in place of 'smooth' */
  });
};

export const TvshowDetails = (movie) => {
  console.log("movie",movie)
    
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);


  const queryClient = useQueryClient();
  const [showModal, setShowModal] = React.useState(false);
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [videoLink, setVideoLink] = React.useState([]);
  const [seasonInfo, setseasonInfo] = React.useState([]);
  const [showPostersModal, setShowPostersModal] = React.useState(false);
  const [showSeason, setShowSeason] = React.useState("Season 1");
  const { innerWidth: width, innerHeight: height } = window;
  const [postersLink, setPostersLink] = React.useState("");

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
  const scroll6 = (scrollOffset) => {
    ref6.current.scrollLeft += scrollOffset;
  };

  const scroll7 = (scrollOffset) => {
    ref7.current.scrollLeft += scrollOffset;
  };
  const scroll8 = (scrollOffset) => {
    ref8.current.scrollLeft += scrollOffset;
  };

  const queryVariables = {};
  const datass = queryClient.getQueryData("GetTvshows");

  const getTvshows = ({ queryKey }) => {
    const [_, names] = queryKey;
    // console.log("season id", names);
    const somes = request(
      API_URL,
      gql`
        query GetTvshow($name: String!) {
          getTVshow1(Type: $name) {
            id
            name
            Type
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
            tvshowInfo {
              rating {
                rating
              }
              creator {
                creator
              }
              writer
              genre {
                genre
              }
              link {
                title
                link
                date
              }
              originalTitle
              noOfseasons
              status
              releaseDate
              dateFormat
            }
            watchOn {
              watchOnLink
              watchOn
            }
            rectanglePosters {
              rectanglePosters
            }
            availLanguages {
              languages
            }
          }
        }
      `,
      { name: names }
    ).catch((e) => {
      console.log(e);
    });
    // console.log("getSeason", somes);
    return somes;
  };
  // console.log("queryCacahe",datass);
  let status = true;

  if (datass !== undefined) {
    status = false;
  }
  let names = "Tvshows";
  const { isLoading, error, data, refetch } = useQuery(
    ["GetTvshows", names],
    getTvshows,
    {
      enabled: status,
      staleTime: 1000 * 10
    }
  );

  // {/* {console.log("seasons",showSeason)}
// console.log("data",data);
  // let some = data.getTVshow1.sort(
  //   (a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat
  // );

  let CurrentMovieGenere = movie.movie[0][0].tvshowInfo[0].genre.map(i => {
    return i.genre;
  })

  // console.log("CurrentMovieGenere",CurrentMovieGenere);


  
  // console.log(some);
  // console.log(movie);
  // console.log(width, height);
  let Seasoninfos = movie.movie[0][0].seasons.filter(
    (i) => i.season === showSeason
  );
  // console
  let some1 = sortGenre(movie.movie[1], CurrentMovieGenere);
  // useEffect(() => {
  //   some1 = sortGenre(data, CurrentMovieGenere);
  // }, []);
    // console.log("end")

  return (
    <div class=" mt-36 lg:mt-48  flex w-full h-auto  md:justify-center md:items-center  lg:justify-center lg:items-center ">
      <div
        class="
      
      m-4
      ml-6
      
      w-full
               
        "
      >
        {/* {console.log(movie);} */}
        <div class=" relative overflow-hidden w-80 h-550 lg:h-auto lg:w-full   ">
          <Image
            class="object-cover blur-3xl h-450 lg:h-110 w-full "
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={movie.movie[0][0].rectanglePosters[0].rectanglePosters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85" />
          </Image>
          <div class=" absolute top-0 left-0 px-6 w-full py-2.5 rounded-md h-450 lg:h-full justify-center items-center  flex flex-col lg:flex-row">
            <div class=" lg:hidden w-full lg:h-full lg:w-2/6  flex justify-center items-center">
              <CarouselPosters value={movie.movie[0][0].posters} />
            </div>
            <div class=" lg:h-full lg:w-4/6 w-full lg:mt-5  flex flex-col justify-center ">
              <div class="font-RobotoMono text-white lg:text-left text-center mt-3 flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start w-full h-16 lg:h-auto md:w-4/5 lg:w-full font-extrabold text-xl md:text-lg lg:text-2xl">
                {movie.movie[0][0].name}
              </div>
              <div class="font-RobotoMono  font-normal flex lg:justify-start lg:items-center justify-center items-center mt-2 text-white tracking-wider md:w-full lg:w-2/5 h-auto text-xs ">
                {movie.movie[0][0].tvshowInfo[0].releaseDate} |{" "}
                {/* {movie.movie[0].tvshowInfo[0].runtime} |{" "} */}
                {movie.movie[0][0].tvshowInfo[0].rating.map((i) => {
                  // console.log( i.rating)
                  return (
                    <span class="font-RobotoMono m-2  lg:m-2 text-xs lg:text-sm inline-block text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                      {i.rating}
                    </span>
                  );
                })}
              </div>
              <div class="flex lg:justify-start lg:items-start justify-center items-center  space-x-1 mt-5 lg:space-x-4 flex-row ">
                {movie.movie[0][0].availLanguages.map((languages, index, row) => {
                  if (index + 1 !== row.length) {
                    // console.log(index)
                    return (
                      // <div class="flex justify-center items-center">
                      <span class="font-RobotoMono font-normal inline-block text-white  lg:py-0.5 text-xs ">
                        {languages.languages},
                      </span>
                      // </div>
                    );
                  } else {
                    return (
                      <div class="flex justify-center items-center">
                        <span class="font-RobotoMono font-normal inline-block text-white rounded-md py-0.5 text-xs">
                          &nbsp;{languages.languages}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
              {movie.movie[0][0].storyline.split(" ").length >= 100 ? (
                <div class=" text-center h-auto lg:h-auto flex flex-col justify-center items-center text-white mt-5 font-normal text-sm lg:text-left ">
                  <div className="font-RobotoMono ">
                    {movie.movie[0][0].storyline.substring(0, 400)}
                    <a
                      className="font-RobotoMono text-white ml-3 font-bold"
                      // type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Show more
                    </a>
                  </div>
                </div>
              ) : (
                <div class="font-RobotoMono text-center h-auto lg:h-auto flex justify-center items-center text-white mt-5 font-normal text-sm lg:text-left ">
                  {movie.movie[0][0].storyline}
                </div>
              )}
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                    <div className="relative w-80 lg:w-auto my-6 mx-auto max-w-3xl ">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="font-RobotoMono text-3xl font-semibold">
                            {movie.movie[0][0].name}
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
                        <div className="relative p-6 flex-auto">
                          <p className="font-RobotoMono my-4 text-slate-500 text-md leading-relaxed">
                            {movie.movie[0][0].storyline}
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
              <div class="mt-5 w-auto lg:w-auto space-x-1 flex flex-row lg:justify-start lg:items-start justify-center items-center">
                {movie.movie[0][0].tvshowInfo[0].genre.slice(0, 3).map((i) => {
                  return (
                    <div class="flex justify-center items-center">
                      <span class="font-RobotoMono text-xs lg:text-sm inline-block text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
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
                  <p class="font-RobotoMono text-white text-sm font-thin flex justify-center items-center h-2/4">
                    {movie.movie[0][0].rating[0].imdb}
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
                    {movie.movie[0][0].rating[0].rottenTomatoes}
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
              <CarouselPosters value={movie.movie[0][0].posters} />
            </div>
          </div>
        </div>

        {/* Videos to watch */}
        <div class=" m-10 md:m-10 lg:m-16" />
        <div class="font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
          Videos to watch
        </div>
        <div class="m-10 " />
        <div class="flex flex-row">
          {movie.movie[0][0].tvshowInfo[0].link.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll(-300)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
            </button>
          )}
          <div
            ref={ref}
            class="scroll-smooth flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-60 overflow-y-hidden overflow-x-scroll hide-scroll-bar "
          >
            {movie.movie[0][0].tvshowInfo[0].link.map((links, index) => {
              // console.log(cast)
              return (
                <div class="space-y-2 w-32 h-56 lg:w-60 lg:h-60 m-1 lg:m-4 ">
                  <div class=" lg:ml-0 ml-1 lg:mt-1 mt-2 text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-56 lg:h-3/5 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <a
                      class="cursor-pointer"
                      onClick={() => {
                        setShowVideoModal(true);
                        console.log("linw 237", links.link);
                        setVideoLink(links);
                      }}
                    >
                      <img
                        class="lg:h-fit md:h-full h-full w-full md:w-full lg:w-fit"
                        src={`http://img.youtube.com/vi/${
                          links.link.split("=")[1]
                        }/maxresdefault.jpg`}
                        alt="cast"
                      />
                    </a>
                  </div>
                  <div class=" flex box-border w-32 h-8 lg:w-full lg:h-14 justify-center items-center  ">
                    <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
                      {links.title}
                    </div>
                  </div>

                  {showVideoModal ? (
                    <>
                      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className=" relative lg:w-400 my-6 mx-auto max-w-3xl ">
                          {/*content*/}
                          {/* {console.log("videoLink",videoLink)} */}
                          <div className="dark:bg-black border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5">
                              <h3 className="font-RobotoMono dark:text-white ml-2 lg:text-md font-semibold">
                                {videoLink.title}
                              </h3>
                            </div>
                            {/*body*/}

                            <div class="  flex justify-center items-center md:justify-center md:items-center lg:justify-center lg:items-center w-80 md:h-72 lg:h-96 md:w-full lg:w-full md:grow lg:grow  ">
                              <div class="rounded-lg box-border h-96 w-full p-4">
                                <ReactPlayer
                                  width="100%"
                                  // playing={true}
                                  // pip={true }
                                  // stopOnUnmount={false}
                                  height="100%"
                                  url={videoLink.link}
                                />
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
                                className="font-RobotoMono text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-transparent rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2"
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
              );
            })}
          </div>
          {movie.movie[0][0].tvshowInfo[0].link.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll(300)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
            </button>
          )}
        </div>
        {/* <div class="m-10 md:m-10 lg:m-16" /> */}

        <div class=" m-10 md:m-10 lg:m-16" />

        {/* <div class="m-10 md:m-10 lg:m-16" /> */}
        <div class=" font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
          Seasons
        </div>
        {movie.movie[0][0].hasOwnProperty("seasons") ? (
          <div class="">
            {/* <div className="border-2 border-indigo-600 border-dashed rounded w-auto h-auto lg:w-80 lg:max-h-20 mt-5 hide-scroll-bar"> */}
            <div className="flex flex-col m-3 text-white rounded-md justify-center items-start w-80 h-60 lg:w-fit lg:max-h-52 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <p className="mt-2 flex flex-row font-RobotoMono font-extrabold  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <p className="text-white ">Original title :</p> &nbsp;{" "}
                {movie.movie[0][0].tvshowInfo[0].originalTitle}
              </p>
              <p className="mt-2 flex flex-row font-RobotoMono font-extrabold  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <p className="text-white ">No of seasons :</p> &nbsp;{" "}
                {movie.movie[0][0].tvshowInfo[0].noOfseasons}
              </p>
              <p className="mt-2 flex flex-row font-RobotoMono font-extrabold  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <p className="text-white ">Status :</p> &nbsp;{" "}
                {movie.movie[0][0].tvshowInfo[0].status === "Ended" || "Not Renewed for Next Season" ? (
                  <p className="mt-1 flex flex-row justify-center  text-xs lg:text-xs  text-white rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-red-700 font-RobotoMono">
                    {movie.movie[0][0].tvshowInfo[0].status}
                  </p>
                ) : (
                  <p className="mt-1 flex flex-row justify-center  text-xs lg:text-xs  text-white rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-green-700 font-RobotoMono">
                    {movie.movie[0][0].tvshowInfo[0].status}
                  </p>
                )}{" "}
              </p>
              <p className="mt-2 flex flex-row font-RobotoMono font-normal  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <p className="text-white ">Season starts :</p> &nbsp;{" "}
                {Seasoninfos[0].seasonStart}
              </p>
              <p className="mt-2 flex flex-row font-RobotoMono font-normal  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <p className="text-white ">Season ends :</p> &nbsp;{" "}
                {Seasoninfos[0].seasonEnd}
              </p>
              {/* <div className="m-2"></div> */}
              {/* <p className="text-justify font-RobotoMono font-thin text-xs">{j.episodeDescription}</p> */}
            </div>
            {/* </div> */}
            <div class=" flex-col flex mt-5 w-80 md:h-72 lg:h-auto md:w-full lg:w-full md:grow lg:grow  ">
              <div class="dropdown relative">
                <button
                  class="
        font-RobotoMono
        text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {showSeason}
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    class="w-2 ml-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                    ></path>
                  </svg>
                </button>
                <ul
                  class="
        font-RobotoMono
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
                  aria-labelledby="dropdownMenuButton1"
                >
                  {movie.movie[0][0].seasons.map((i) => {
                    return (
                      <div>
                        <li>
                          <a
                            class="
            
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                            // href="#"
                            onClick={() => setShowSeason(i.season)}
                          >
                            {i.season}
                          </a>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div class="flex flex-row">
                <button class="w-20" onClick={() => ref6.current.previous()}>
                  <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
                </button>
                <div class="m-10 flex flex-row w-80 md:w-full lg:w-11/12 h-64 border-white dark:text-white overflow-y-hidden overflow-x-scroll  hide-scroll-bar ">
                  <ImageScroller ref={ref6} hideScrollbar>
                    {movie.movie[0][0].seasons.map((i) => {
                      return i.season === showSeason ? (
                        i.episodes.map((j) => {
                          return (
                            <div className="border-2 border-indigo-600 border-dashed rounded  space-y-2 w-auto h-auto lg:w-80 lg:max-h-60 m-1 lg:m-4 hide-scroll-bar">
                              <div className="flex flex-col m-3 text-white rounded-md justify-center items-center w-72 h-60 lg:w-72 lg:max-h-56 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p className="font-RobotoMono font-extrabold  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                                  {j.episodeName}
                                </p>
                                <div className="m-2"></div>
                                <p className="text-justify font-RobotoMono font-thin text-xs">
                                  {j.episodeDescription}
                                </p>
                              </div>
                            </div>
                            // <Accordion title={j.episodeName} content={j.episodeDescription} />
                          );
                        })
                      ) : (
                        <div>
                          <p></p>
                        </div>
                      );
                    })}
                  </ImageScroller>
                </div>
                <button class="w-20" onClick={() => ref6.current.next()}>
                  <FontAwesomeIcon
                    color="white"
                    size="3x"
                    icon={faCaretRight}
                  />
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div class="m-5" />
        <div class="font-RobotoMono flex w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white lg:grow">
          Casts
        </div>
        <div class="m-10 " />
        <div class="m-10 " />
        <div class="flex flex-row ">
          {movie.movie[0][0].casts.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll1(-500)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
            </button>
          )}
          <div
            ref={ref1}
            class="scroll-smooth lg:grow flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-82 overflow-y-hidden overflow-x-scroll hide-scroll-bar "
          >
            {movie.movie[0][0].casts.map((cast) => {
              // console.log(cast);
              return cast.hasOwnProperty("image") ? (
                <Link
                  to={{
                    pathname: "/PopularActorMov",
                    search: `?${cast.castName}`,
                    state: { fromDashboard: true },
                  }}
                  onClick={scrollToTop}
                >
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
                        <Transformation quality="85" />
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
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: "/PopularActorMov",
                    search: `?${cast.castName}`,
                    state: { fromDashboard: true },
                  }}
                  onClick={scrollToTop}
                >
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
                </Link>
              );
            })}
          </div>
          {movie.movie[0][0].casts.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll1(500)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
            </button>
          )}
        </div>
        <div class="m-6"></div>
        <div class="m-10 md:m-10 lg:m-16" />
        <div class=" font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
          Crew
        </div>
        <div class="m-5" />
        <div class="flex flex-row">
          {movie.movie[0][0].tvshowInfo[0].creator.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll2(-1000)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
            </button>
          )}
          <div
            ref={ref2}
            class="scroll-smooth flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-72 overflow-y-hidden overflow-x-scroll hide-scroll-bar "
          >
            {movie.movie[0][0].tvshowInfo[0].creator.map((creator) => {
              // console.log(creator);
              return creator.hasOwnProperty("image") ? (
                <div class=" w-32 h-56 lg:w-40 lg:h-72 m-1 lg:m-2 ">
                  <div class=" flex box-border w-32 h-8 lg:w-40 lg:h-14 justify-center items-center  ">
                    <div class="font-RobotoMono font-normal text-xs text-center dark:text-white">
                      {creator.creator}
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
                      <Transformation quality="85" />
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
                      {creator.creator}
                    </div>
                  </div>
                  {/* <div class="m-3"></div> */}
                  <div class="lg:ml-0 ml-1 lg:mt-0 mt-2  text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out  text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                    {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
                    <p class="font-RobotoMono text-center text-sm">
                      {creator.creator}
                    </p>
                    {/* </a> */}
                  </div>
                </div>
              );
            })}
          </div>
          {movie.movie[0][0].tvshowInfo[0].creator.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll2(1000)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
            </button>
          )}
        </div>

        <div class="m-10 md:m-10 lg:m-16" />
        <div class="font-RobotoMono w-4/5  font-medium text-sm md:text-sm lg:text-sm dark:text-white">
          Posters
        </div>

        <div class="m-10 " />
        <div class="flex flex-row">
          {movie.movie[0][0].posters.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll3(-1000)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
            </button>
          )}
          <div
            ref={ref3}
            class="scroll-smooth flex flex-row items-center grow w-80  h-60 md:w-full lg:w-full md:h-60 lg:h-60 overflow-y-hidden overflow-x-scroll hide-scroll-bar "
          >
            {movie.movie[0][0].posters.map((posters, index) => {
              // console.log(cast)
              return (
                <div class=" w-32 h-56 lg:w-40 lg:h-60 m-1 lg:m-4 ">
                  {/* <div class=" lg:ml-0 ml-1 lg:mt-1 mt-2 text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-56 lg:h-3/5 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
                  <div class=" flex justify-center items-center h-40 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out">
                    <a
                      class="cursor-pointer"
                      onClick={() => {
                        setShowPostersModal(true);
                        // console.log("linw 237", posters);
                        setPostersLink(posters);
                      }}
                    >
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
                        <Transformation quality="85" />
                      </Image>
                    </a>
                  </div>

                  {showPostersModal ? (
                    <>
                      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className=" relative lg:w-150 lg:h-300 my-6 mx-auto max-w-3xl ">
                          {/*content*/}
                          {/* {console.log("videoLink", postersLink.posters)} */}
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
                                <Transformation quality="85" />
                              </Image>
                              {/* </div> */}
                            </div>

                            <div className="flex items-center justify-end p-6">
                              <button
                                className="font-RobotoMono text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-transparent rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2"
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
              );
            })}
          </div>
          {movie.movie[0][0].posters.length <= 5 ? null : (
            <button class="w-20" onClick={() => scroll3(1000)}>
              <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
            </button>
          )}
        </div>

        <div class="m-10 md:m-10 lg:m-16" />
        <div class=" m-10 md:m-10 lg:m-16" />
        <div class=" w-full font-medium text-sm  dark:text-white">
          <p class="font-RobotoMono">Watch now</p>
          <div class="flex flex-row">
            {movie.movie[0][0].watchOn.length <= 5 ? null : (
              <button class="w-20" onClick={() => scroll4(-1000)}>
                <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
              </button>
            )}

            <div
              ref={ref4}
              class=" flex flex-row space-x-4 grow items-center w-80 h-60 md:w-full lg:w-full md:h-60 lg:h-80 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar "
            >
              {movie.movie[0][0].watchOn.map((i) => {
                // console.log(i, "490");
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
                          <Transformation quality="85" />
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
            {movie.movie[0][0].watchOn.length <= 5 ? null : (
              <button class="w-20" onClick={() => scroll4(1000)}>
                <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
              </button>
            )}
          </div>
        </div>
        <div class=" w-full font-medium text-sm  dark:text-white ">
          <p class="font-RobotoMono">Suggested tvshows</p>
          <div class="m-10"></div>
          <div class="flex flex-row">
            {some1.length <= 5 ? null : (
              <button class="w-20" onClick={() => scroll7(-1000)}>
                <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
              </button>
            )}
            <div
              ref={ref7}
              class="scroll-smooth  flex flex-row space-x-4 grow items-center w-80 h-80 md:w-full lg:w-full md:h-60 lg:h-110 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar "
            >
              {
                //  latestDubbed(data)
                some1.map((movies) => (
                  <CardLayoutTvshow_2 user={movies} />
                ))
              }
            </div>
            {some1.length <= 5 ? null : (
              <button class="w-20" onClick={() => scroll7(1000)}>
                <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
              </button>
            )}
          </div>
        </div>
        {/* <div class=" w-full font-medium text-sm  dark:text-white ">
          <p class="font-RobotoMono">Similar tvshows</p>
          <div class="m-10"></div>
          <div class="flex flex-row">
            {some1.length <= 5 ? null : (
              <button class="w-20" onClick={() => scroll8(-1000)}>
                <FontAwesomeIcon color="white" size="3x" icon={faCaretLeft} />
              </button>
            )}
            <div
              ref={ref8}
              class="scroll-smooth  flex flex-row space-x-4 grow items-center w-80 h-80 md:w-full lg:w-full md:h-60 lg:h-110 overflow-y-hidden overflow-x-scroll pb-10 hide-scroll-bar "
            >
              {
                //  latestDubbed(data)
                some1.map((movies) => (
                  <CardLayoutTvshow_2 user={movies} />
                ))
              }
            </div>
            {some1.length <= 5 ? null : (
              <button class="w-20" onClick={() => scroll8(1000)}>
                <FontAwesomeIcon color="white" size="3x" icon={faCaretRight} />
              </button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};


function sortGenre(data, CurrentMovieGenere) {
  let aaa = [];
  let idss = [];
  console.log("data",data);
  console.log("CurrentMovieGenere",CurrentMovieGenere.slice(0, 2));
  // console.log("CurrentMovieGenere",);

  data.map(i => {
    i.tvshowInfo[0].genre.map(j => {
      if (CurrentMovieGenere.slice(0, 2).includes(j.genre)) {
        // console.log(idss);

          aaa.push(i);
        // return i;
      }
    });
  })
  // console.log("AllMovieGenre", aaa);
  const uniqueIds = [];



  const unique = aaa.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    } else {
      return false;
    }

  });

  // const arr = [{id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 1, name: 'one'}]

  // const ids = aaa.map(o => o.id)
  // const filtered = aaa.filter(({id}, index) => !ids.includes(id, index + 1))

  // let sossa =  aaa.sort(() => Math.random() * aaa.length)
  // console.log("sossa", sossa);
  // let sossa = shuffleArray(aaa);
  // console.log(sossa)

  // console.log("unique", unique);
  // let some1 = unique
  // console.log(some1);
  return unique;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
  
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
                  
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
      
  return array;
}

