import React,{useRef} from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { Homepage } from "./Homepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { CardLayoutTvshow_3 } from "../components/CardLayoutTvshow_3";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
import { GetMovies } from "../query/GetMovies";
import { GetCollections } from "../query/GetCollections";
import { CardLayout } from "../components/CardLayout";
import { Collection } from "../components/Collection";
// import { FaBeer } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/fontawesome-free-solid'
const Tvshows =  () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
  // const = useQuery(GetTvshows("Tvshows"));
  const { loading:MoviesLoading, error:MoviesError, data:MoviesData }  = useQuery(GetMovies);
  const { loading:CollectionLoading, error:CollectionError, data:CollectionData }  = useQuery(GetCollections);


    // console.log()
    if (error || MoviesError || CollectionError) return <h1>{error}</h1>;
    if (loading || MoviesLoading || CollectionLoading) 
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
  console.log("38",CollectionData);
  let marvel = [];
  // MoviesData.getMovies.map((i) => {
  //   // console.log(i.movieInfo[0].genre);
  //   i.movieInfo[0].genre.map((j) => {
  //     if( j.genre === 'marvel')
  //     {
  //       marvel.push(i);
  //     }
  //   })
  // })

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

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  let some1 = MoviesData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);
  console.log(some);
  let netflix = [];
  let Amazon = [];
  let Hotstar = [];
  // let some1 = data.getTVshow1.filter((i) => {
  //   i.watchOn.map((j) => {
  //     if(j.watchOn === "Netflix") {
  //       // console.log("netflix");
  //       netflix.push(i); 
  //     } else if(j.watchOn === "Amazon Prime Videos") {
  //       // console.log("netflix");
  //       Amazon.push(i); 
  //     } else if(j.watchOn === "Disney Plus Hotstar") {
  //       // console.log("netflix");
  //       Hotstar.push(i); 
  //     }
  //   })
  // })
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
    <div className=" mt-44 w-full  ">
      {/* Home */}
      {/* <h1 className="text-3xl"> */}
      <div className=" w-full lg:h-110 ">
      <Homepage name="Tvshows"/>
      </div>
    {/* </h1> */}
    <div class="mt-5 ">
     <div class="m-16"></div>
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
     <div class="mt-5 ">
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
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Movie Collection</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
    {
      collection.length <=5 ? null : <button class="w-20" onClick={() => scroll1(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
     }
    <div ref={ref2} class="m-2 lg:m-0  space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
        
        collection.map((collection) => 
             <Collection  collection={collection}/>
           
         )
      }
     </div>
     {
      collection.length <=5 ? null : <button class="w-20" onClick={() => scroll1(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
     }
     </div>
     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-base text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-RobotoMono">Genres</h3>  
    <div class="m-4"></div>
    <div class="flex flex-row" >
      {
        genereCollection.length <=5 ? null : <button class="w-20" onClick={() => scroll1(-1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretLeft} /></button>
      }
    <div ref={ref3} class="m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
         genereCollection.map((collection) => 
            <Collection  collection={collection}/>
         
         )
      }
     </div>
     {
       genereCollection.length <=5 ? null : <button class="w-20" onClick={() => scroll1(1000)}><FontAwesomeIcon color="white"  size="3x" icon={faCaretRight} /></button>
     }
     </div>

     </div>
    </div>
  );
};

export default Tvshows;