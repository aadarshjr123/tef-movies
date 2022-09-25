import React,{useRef, useState} from "react";
// import { useQuery } from "@apollo/client";
import { GetTvshows } from "../query/GetTvshows";
import { TVShowHomepage } from "./TVShowHomepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { CardLayoutTvshow_3 } from "../components/CardLayoutTvshow_3";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';
import { useQueryClient  } from 'react-query'

const Tvshows =  () => {
  const queryClient = useQueryClient()
  // const getTVshow1 = gql`
  // query GetTvshow($name: String!){
  //   getTVshow1( Type: $name) {
  //     id
  //     name
  //     Type
  //     storyline
  //     casts {
  //       castName
  //       CharacterName
  //     }
  //     rating {
  //       imdb
  //       rottenTomatoes
  //     }
  //     posters {
  //       posters
  //     }
  //     tvshowInfo {
  //       rating{
  //         rating
  //       }
  //       creator{
  //         creator
  //       }
  //       writer
  //       genre {
  //         genre
  //       }
  //       link {
  //         title
  //         link
  //         date
  //     }
  //       originalTitle
  //       noOfseasons
  //       status
  //       releaseDate
  //       dateFormat
  //     }
  //     watchOn {
  //       watchOnLink
  //       watchOn
  //     }
  //     rectanglePosters {
  //       rectanglePosters
  //     }
  //     availLanguages {
  //       languages
  //     }
  //   }
  //       }
  // `;
  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';
  

  // const Tvshow = () => request(API_URL,
  //   getTVshow1,
  //   queryVariables,
  //   // headers
  // );

  
  const datass = queryClient.getQueryData("GetTvshows");


  const getTvshows = ({ queryKey }) => {
    const [_, names] = queryKey;
    console.log("season id",names);
    const somes = request(
      'https://tefmovies.herokuapp.com/graphql',
      gql `query GetTvshow($name: String!){
        getTVshow1( Type: $name) {
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
            }
      `,
      { name: names }
    ).catch(e => {
      console.log(e);
    })
    console.log("getSeason",somes);
    return somes;
  }

  // console.log("queryCacahe",datass);
 let status = true;

  if(datass !== undefined) {
    status = false;
  }
 
  let names = "Tvshows";

  const {  isLoading, error, data, refetch } = useQuery(["GetTvshows",names],getTvshows,{
    enabled: status,
  });

    console.log(data);
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

      if (error) return <h1>{error}</h1>;
      if (isLoading) 
      return <HomepageSkeleton />
    // if (data) 
    // return <HomepageSkeleton />
    // const tvshowfilter = async () => {
    //   let some = await data;
    //   var arrayTvshows = [];
    //   await some.getTVshows.filter((movies) => {
    //     if(movies.tvshowInfo[0].Type === 'TVshows') {
    //       arrayTvshows.push(movies);
    //     }
    //   })
    //   return arrayTvshows;
    // }

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);

  let netflix = [];
  let Amazon = [];
  let Hotstar = [];
  // let some1 = 

  data.getTVshow1.filter((i) => {
    i.watchOn.map((j) => {
      if(j.watchOn === "Netflix") {
        // console.log("netflix");
        netflix.push(i); 
      } else if(j.watchOn === "Amazon Prime Videos") {
        // console.log("netflix");
        Amazon.push(i); 
      } else if(j.watchOn === "Disney Plus Hotstar") {
        // console.log("netflix");
        Hotstar.push(i); 
      }
    })
  })

  // if(some.length <=5 ) {
  //   setmovieone(true);
  // } 

  // if(netflix.length <=5 ) {
  //   setmovietwo(true);
  // }
  // if(Amazon.length <=5 ) {
    
  //   console.log(Amazon.length);
  //   // setmoviethree(true);
  // }

  // if(Hotstar.length <=5 ) {
  //   setmoviefour(true);
  // }
    // let some = await tvshowfilter();
    // if(data)
    // return console.log(tvshowfilter());
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
  return (

    // console.log(data)
    <div className=" w-full mt-28 lg:mt-48">
      <h1 className="text-3xl">
      <TVShowHomepage name="Tvshows"/>
    </h1>
    <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Latest dubbed tvshoes</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        some.length <=5 ? null :  <button  class="w-20" onClick={() => scroll(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
}
    <div ref={ref} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    
    {
         some.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>
     {
        some.length <=5 ? null :  <button class="w-20" onClick={() => scroll(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Netflix tvshows</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
        netflix.length <=5  ? null :  <button  class="w-20" onClick={() => scroll1(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
}
    <div ref={ref1} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    
    {
         netflix.map((movies) => (
           <CardLayoutTvshow_3  user={movies}/>
         ))
      }
      </div>
      {
         netflix.length <=5 ? null :   <button class="w-20" onClick={() => scroll1(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
   
      }
    </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Amazon prime tvshows</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
        Amazon.length <=5 ? null :  <button  class="w-20" onClick={() => scroll2(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
}
    <div ref={ref2} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    
    {
         Amazon.map((movies) => (
           <CardLayoutTvshow_3  user={movies}/>
         ))
      }
         </div>
         {
         Amazon.length <=5 ? null :  <button class="w-20" onClick={() => scroll2(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
    
         }
    </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-10 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Hotstar tvshows</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
         Hotstar.length <=5 ? null :  <button  class="w-20" onClick={() => scroll3(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
}
    <div ref={ref3} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    
    {
         Hotstar.map((movies) => (
           <CardLayoutTvshow_3  user={movies}/>
         ))
      }
             </div>
             {
               Hotstar.length <=5 ? null :  <button class="w-20" onClick={() => scroll3(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
    
             }
    </div>

     </div>
     
    </div>
  );
};

export default Tvshows;
