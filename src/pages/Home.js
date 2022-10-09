import React,{useEffect, useRef} from "react";
// import { useQuery } from "@apollo/client";
// import { GetTvshows } from "../query/GetTvshows";
import { Homepage } from "./Homepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { CardLayoutTvshow_3 } from "../components/CardLayoutTvshow_3";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
// import { GetMovies } from "../query/GetMovies";
// import { GetCollections } from "../query/GetCollections";
import { CardLayout } from "../components/CardLayout";
import { Collection } from "../components/Collection";
// import { FaBeer } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/fontawesome-free-solid'
import { GetTvshows,GetMovies,GetCollections } from "../query/GetActors";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';
import { useQueryClient  } from 'react-query'
import { CollectionActorMov } from "../components/CollectionActorMov";
import { orderBy } from "lodash";


const Tvshows =  () => {
  const queryClient = useQueryClient();

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);



 
  const getCollections = gql`
  query {
    getCollections {
      name
      image
      type
    }
        }
  `;

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
  // const getTVshow1 = gql`
  // query {
  //   getTVshow1( Type: "Tvshows") {
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
  const getActors = gql`
  query {
    getActors {
          
      name
      image
      description
    }
        }
  `;


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

  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';
  
  const Coll = () => request(API_URL,
    getCollections,
    queryVariables,
    // headers
  );

  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );

  const Actors = () => request(API_URL,
    getActors,
    queryVariables,
    // headers
  );

  // const Tvshow = () => request(API_URL,
  //   getTVshow1,
  //   queryVariables,
  //   // headers
  // );

  const datass = queryClient.getQueryData("GetTvshows");
  const datass1 = queryClient.getQueryData("GetMovies");
  const datass2 = queryClient.getQueryData("GetCollections");
  const datass3 = queryClient.getQueryData("GetActors");



  // console.log("queryCacahe",datass);
 let status = true;
 let status1 = true;
 let status2 = true;
 let status3 = true;


  if(datass !== undefined) {
    status = false;
  }
  if(datass1 !== undefined) {
    status1 = false;
  }
  if(datass2 !== undefined) {
    status2 = false;
  }

  if(datass3 !== undefined) {
    status3 = false;
  }

  let names = "Tvshows";
  
  const { isLoading, error, data, refetch } = useQuery(["GetTvshows",names],getTvshows,{
    enabled: status,
  });
  const { isLoading:MoviesLoading, error:MoviesError, data:MoviesData } = useQuery("GetMovies", Mov,{
    enabled: status1,
  });
  const { isLoading:CollectionLoading, error:CollectionError, data:CollectionData } = useQuery("GetCollections", Coll,{
    enabled: status2,
  });
  const { isLoading:ActorsLoading, error:ActorsError, data:ActorsData } = useQuery("GetActors", Actors,{
    enabled: status3,
  });

      if (error || MoviesError || CollectionError || ActorsError) return <h1>{error}</h1>;
      if (isLoading || MoviesLoading || CollectionLoading || ActorsLoading) 
      return <HomepageSkeleton />


      console.log(data,MoviesData,CollectionData)
  
 
  console.log("hai3");

  let marvel = [];

  console.log("CollectionData",CollectionData);

  let collection = []
  let genereCollection = []

  CollectionData.getCollections.map((i) => {
    if(i.type === 'genre') {
      collection.push(i)
    } else if(i.type === 'collection') {
      genereCollection.push(i)
    }
  })


let ImDBTvshows = [];
let ImDBMovies = [];
let FreeMovies = [];
let FreeTvshows = [];


ImDBTvshows=[...data.getTVshow1];
ImDBMovies=[...MoviesData.getMovies];

FreeMovies=[...MoviesData.getMovies];
FreeTvshows=[...data.getTVshow1];

console.log("ImDB",ImDBTvshows);



  console.log("ActorsData",ActorsData);
  console.log("marvel",marvel);

let freeOtt = ["Mx Player","Youtube","Disney Plus Hotstar Free"]
  console.log(MoviesData);

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  let some22 = ImDBTvshows.sort((a, b) => b.rating[0].imdb - a.rating[0].imdb).slice(0, 10);
  let some1 = MoviesData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);
  let some222 = ImDBMovies.sort((a, b) => b.rating[0].imdb - a.rating[0].imdb).slice(0, 10);

  let FreeMoviesSorted = [];
  FreeMovies.filter((i) => {
    freeOtt.map((j) => {
      // console.log(j);
      console.log(i.watchOn[0].watchOn.includes(j),i.watchOn[0].watchOn,j);
      if(i.watchOn[0].watchOn.includes(j)) {
        FreeMoviesSorted.push(i);
      }
    }) 
  })
  console.log(FreeMoviesSorted);
  
  
  
  // .sort((a, b) => b.watchOn[0].watchOn - a.movieInfo[0].dateFormat);
  let FreeTvshowsSorted = [];
  FreeTvshows.filter((i) => {
    freeOtt.map((j) => {
      // console.log(j);
      console.log(i.watchOn[0].watchOn.includes(j),i.watchOn[0].watchOn,j);
      if(i.watchOn[0].watchOn.includes(j)) {
        FreeTvshowsSorted.push(i);
      }
    }) 
  })
  // FreeTvshows.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  console.log(FreeTvshowsSorted);
  

  let netflix = [];
  let Amazon = [];
  let Hotstar = [];

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
    

  return (


    <div className="mt-60 w-full  ">

      <div className=" w-full lg:h-110 ">
      <Homepage name="Tvshows"/>
      </div>
 
    <div class="mt-5 m-10">
     <div class="m-28"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        some1.length <= 5 ? null : <button class="w-20" onClick={() => scroll(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         some1.map((movies) => (
           <CardLayout  user={movies}/>
         ))
      }
     </div>
     {
      some1.length <= 5 ? null :  <button class="w-20" onClick={() => scroll(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>


     </div>
     <div class="mt-5  m-10">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Latest Tvshows</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        some.length <=5 ? null : <button class="w-20" onClick={() => scroll1(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div  ref={ref1} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         some.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>
     {
      some.length <=5 ? null : <button class="w-20" onClick={() => scroll1(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>

     </div>
     <div class="mt-5  m-10">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Genres</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
      collection.length <=5 ? null : <button class="w-20" onClick={() => scroll2(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
     }
    <div ref={ref2} class="scroll-smooth m-2 lg:m-0  space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
        
        collection.map((collection) => 
             <Collection  collection={collection}/>
           
         )
      }
     </div>
     {
      collection.length <=5 ? null : <button class="w-20" onClick={() => scroll2(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
     }
     </div>
     </div>
     <div class="mt-5  m-10">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Movie Collection</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        genereCollection.length <=5 ? null : <button class="w-20" onClick={() => scroll3(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref3} class="scroll-smooth  m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
         genereCollection.map((collection) => 
            <Collection  collection={collection}/>
         
         )
      }
     </div>
     {
       genereCollection.length <=5 ? null : <button class="w-20" onClick={() => scroll3(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
     }
     </div>

     </div>
     <div class="mt-5  m-10">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Actors</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        ActorsData.getActors.length <=5 ? null : <button class="w-20" onClick={() => scroll4(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref4} class="scroll-smooth  m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
         ActorsData.getActors.map((collection) => 
            <CollectionActorMov  collection={collection}/>
         
         )
      }
     </div>
     {
       ActorsData.getActors.length <=5 ? null : <button class="w-20" onClick={() => scroll4(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
     }
     </div>

     </div>
     <div class="mt-5  m-10">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Top 10 Tvshows from IMDB</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        some22.length <=5 ? null : <button class="w-20" onClick={() => scroll5(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div  ref={ref5} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         some22.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>
     {
      some22.length <=5 ? null : <button class="w-20" onClick={() => scroll5(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>

     </div>
     <div class="mt-5 m-10">
     <div class="m-28"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Top 10 Movies from IMDB</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        some222.length <= 5 ? null : <button class="w-20" onClick={() => scroll6(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref6} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         some222.map((movies) => (
           <CardLayout  user={movies}/>
         ))
      }
     </div>
     {
      some222.length <= 5 ? null :  <button class="w-20" onClick={() => scroll6(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>


     </div>
     <div class="mt-5  m-10">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Free Movies</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        FreeMoviesSorted.length <=5 ? null : <button class="w-20" onClick={() => scroll7(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div  ref={ref7} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         FreeMoviesSorted.map((movies) => (
           <CardLayout  user={movies}/>
         ))
      }
     </div>
     {
      FreeMoviesSorted.length <=5 ? null : <button class="w-20" onClick={() => scroll7(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>

     </div>
     <div class="mt-5 m-10">
     <div class="m-28"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Free Tvshows</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        FreeTvshowsSorted.length <= 5 ? null : <button class="w-20" onClick={() => scroll8(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref8} class="scroll-smooth m-2 lg:m-0 space-x-5 flex w-screen h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         FreeTvshowsSorted.map((movies) => (
           <CardLayoutTvshow   user={movies}/>
         ))
      }
     </div>
     {
      FreeTvshowsSorted.length <= 5 ? null :  <button class="w-20" onClick={() => scroll8(1000)}><FontAwesomeIcon color="white" size="3x" icon={faCaretRight} /></button>
     }
    </div>


     </div>
    </div>
  );
};

export default Tvshows;