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

const Tvshows =  () => {
  const queryClient = useQueryClient()
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
 
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

  // const Tvshow = () => request(API_URL,
  //   getTVshow1,
  //   queryVariables,
  //   // headers
  // );

  const datass = queryClient.getQueryData("GetTvshows");
  const datass1 = queryClient.getQueryData("GetMovies");
  const datass2 = queryClient.getQueryData("GetCollections");


  // console.log("queryCacahe",datass);
 let status = true;
 let status1 = true;
 let status2 = true;

  if(datass !== undefined) {
    status = false;
  }
  if(datass1 !== undefined) {
    status1 = false;
  }
  if(datass2 !== undefined) {
    status2 = false;
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

      if (error || MoviesError || CollectionError) return <h1>{error}</h1>;
      if (isLoading || MoviesLoading || CollectionLoading) 
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







  console.log("marvel",marvel);

  console.log(MoviesData);

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  let some1 = MoviesData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);
  console.log(some);
  console.log(some1);
  console.log(collection);
  console.log(genereCollection);


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
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Movie Collection</h3>  
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
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Genres</h3>  
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
    </div>
  );
};

export default Tvshows;