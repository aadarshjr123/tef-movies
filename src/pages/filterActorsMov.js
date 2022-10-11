import React, { useEffect,useState } from "react";
import { OneMovie } from "./OneMovie";
import { Homepage } from "./Homepage";
import { CardLayout } from "../components/CardLayout";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { motion  } from "framer-motion";
import { useQuery, useQueryClient } from 'react-query';
import request, { gql } from 'graphql-request';
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import {Image, Video, Transformation} from 'cloudinary-react';


function FilterActor() {
  const queryClient = useQueryClient();  
    let ddd
    let ddd1

  if(window.location.href.split("?")[1]) {
    ddd1 = window.location.href.split("?")[1];
    console.log(ddd1);
    console.log(window.location.href);
    console.log(decodeURI(ddd1));
    ddd = decodeURI(ddd1);

  } else {
    console.log("no params");
  }

  console.log("start");

  const getActors = gql`
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


  const getActorMov = ({ queryKey }) => {
    const [_, ddd] = queryKey;
    console.log("season id",ddd);
    const somes = request(
      'https://tefmovies.herokuapp.com/graphql',
      gql `query GetActorMov($name: String!){
        searchActorTvshows(casts:$name){
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
        rating{
          rating
        }
        creator{
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

        searchActorMovie(casts:$name){
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
      `,
      { name: ddd }
    ).catch(e => {
      console.log(e);
    })
    console.log("getActorMovies",somes);
    return somes;
  }

  const queryVariables = {};


  const API_URL = 'https://tefmovies.herokuapp.com/graphql';

  const getActorss = gql`
    query {
      getActors {
            
        name
        image
        description
      }
          }
    `;
    const Actors = () => request(API_URL,
      getActorss,
      queryVariables,
    );
    const datass3 = queryClient.getQueryData("GetActors");  
  let status3 = true;
    if(datass3 !== undefined) {
      status3 = false;
    }

  const { isLoading, error, data } = useQuery(["getActorsMov",ddd],getActorMov);
  const { isLoading:ActorsLoading, error:ActorsError, data:ActorsData } = useQuery("GetActors", Actors,{
      enabled: status3,
    });


  console.log("start1");
  console.log(data);

  console.log(ActorsData);
  console.log(ActorsData.getActors.filter((item) => item.name === ddd));
   let actorDetails = ActorsData.getActors.filter((item) => item.name === ddd);


if (error || ActorsError) return <h1>Something went wrong!</h1>;
if (isLoading || ActorsLoading) 
return <h1 class="">Loading</h1>;

  return (
    
    <main class="mt-40 w-full flex flex-col justify-center lg:justify-start"> 
    {/* <div class=""> */}
    {
      actorDetails.length > 0 ?  <div class="relative overflow-hidden w-80 h-550 lg:h-200 lg:w-full ">
      <Image 
                    // class="object-cover blur-3xl h-450 lg:h-110 w-full "
                    cloud_name="tefdb"
                    loading="lazy"
                    format="webp"
              class="object-cover blur-3xl h-450 lg:h-96 w-full "
              publicId="https://res.cloudinary.com/tefdb/image/upload/v1663748585/Movies/2019/Iron%20Sky:%20The%20Coming%20Race%20(2019)/Wallpaper/Iron_Sky_The_Coming_Race_2019_Wallpaper_rdqavc.webp"
              alt="Image"
              >
              <Transformation quality="85"/>
            </Image>
            <div class="absolute top-0 left-0 px-6 w-full py-2.5 rounded-md h-450 lg:h-full justify-center items-center  flex flex-col lg:flex-col">
              {
                actorDetails[0].image !== undefined ? 
                <Image
                class="lg:w-48 h-48 md:h-72 lg:h-72"
                cloud_name="tefdb"
                loading="lazy"
                format="webp"
                publicId={actorDetails[0].image}
                // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
                alt="Image"
              >
                  <Transformation quality="85" />
              </Image>
              : 
              <div class="font-RobotoMono lg:ml-0 ml-1 lg:mt-0 mt-2   text-white rounded-md flex justify-center items-center w-28 h-36 lg:w-40 lg:h-56 max-w-xs overflow-hidden bg-white dark:bg-black hover:shadow-xl  transition-shadow duration-300 ease-in-out  text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2">
                  {/* <a href="https://i.imgur.com/fe0T4nw.png"> */}
                  TEFMovies
                  {/* </a> */}
                </div>
              
              }
  
              <div class=" font-RobotoMono text-white lg:text-left text-center mt-3 flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-center lg:items-center w-full h-16 lg:h-auto md:w-4/5 lg:w-full font-extrabold text-xl md:text-lg lg:text-2xl">
                  {actorDetails[0].name}
                </div>
                <div class=" font-RobotoMono text-white lg:text-left text-center mt-3 flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-center lg:items-center w-full h-16 lg:h-auto md:w-4/5 lg:w-full font-extrabold text-sm md:text-sm lg:text-sm">
                  {actorDetails[0].description}
                </div>
            </div>
      {/* </div> */}
      </div> : null
    }
   
    <div >
            <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Movies</h3>  
    <div class="m-4"></div>
    <div class=" m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         data.searchActorMovie.map((movies) => (
          // console.log(movies.name)
           <CardLayout user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Tvshows</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden hide-scroll-bar ">
    {
         data.searchActorTvshows.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>

     </div>
            </div>
    </main>
  );
}
export default FilterActor;
// filterData.map((movies) => (
//   <CardLayout  user={movies}/>
//  ))