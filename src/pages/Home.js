import React,{useEffect, useRef} from "react";
import { useQuery } from "@apollo/client";
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
 
  let MoviesLocalStoredData = "undefined";
  let TvshowLocalStoredData = "undefined";
  let CollectionLocalStoredData = "undefined";
  let localS = false;
  let localS1 = false;
  let localS2 = false;
  console.log(localStorage.getItem('MoviesData'));

  useEffect(() => {
    // Run! Like go get some data from an API.
    console.log("hai");
    console.log(localStorage.getItem('MoviesData'));
    console.log(typeof localStorage.getItem('MoviesData'));
  
    let def;
    if(typeof localStorage.getItem('MoviesData') === "object" && localStorage.getItem('MoviesData') === null) {
      // console.log(typeof localStorage.getItem('MoviesData'));
      def = "null";
    }
  
    console.log(def);
  
 
  
    if(localStorage.getItem('MoviesData') !== "undefined"  && localStorage.getItem('TvshowData') !== "undefined"  && localStorage.getItem('Collection') !== "undefined" && def !== "null" ) {
    console.log("hai4");
    let MovieData = localStorage.getItem('MoviesData');
    let TvshowData = localStorage.getItem('TvshowData');
    let CollectionsData = localStorage.getItem('Collection');
  
    MoviesLocalStoredData = JSON.parse(MovieData);
    TvshowLocalStoredData = JSON.parse(TvshowData);
    CollectionLocalStoredData = JSON.parse(CollectionsData);
    }
  
      
    console.log(MoviesLocalStoredData);
    console.log(TvshowLocalStoredData);
    console.log(CollectionLocalStoredData);
  
      
    console.log(typeof MoviesLocalStoredData);
    console.log(typeof TvshowLocalStoredData);
    console.log(typeof CollectionLocalStoredData);
  
    localS = false;
    localS1 = false;
    localS2 = false;
  
    // MoviesLocalStoredData !== null || "undefined" ? localS = true : localS = false
    // TvshowLocalStoredData !== null || "undefined" ? localS1 = true : localS1 = false
    // CollectionLocalStoredData !== null || "undefined" ? localS2 = true : localS2 = false
    console.log(def);
    // 1
    def !== "null" ? localS = true : localS = false;
    console.log(localS)
    MoviesLocalStoredData !== "undefined" ? localS = true : localS = false;
    console.log(localS)
    
    // 2
    def !== "null" ? localS1 = true : localS1 = false;
    console.log(localS1)
    TvshowLocalStoredData !== "undefined" ? localS1 = true :  localS1 = false;
    console.log(localS1)
    
    // 3
    def !== "null" ? localS2 = true :   localS2 = false;
    console.log(localS2)
    
    CollectionLocalStoredData !==  "undefined" ? localS2 = true :  localS2 = false;
    console.log(localS2)
  
  
  
    console.log("hai1");
    console.log(localS,localS1,localS2);
  }, [localS,localS1,localS2]);


  // const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
  const { loading, error, data } = useQuery(GetTvshows("Tvshows"),localS);
  // const = useQuery(GetTvshows("Tvshows"));
  const { loading:MoviesLoading, error:MoviesError, data:MoviesData }  = useQuery(GetMovies,localS1);
  const { loading:CollectionLoading, error:CollectionError, data:CollectionData }  = useQuery(GetCollections,localS2);
  localStorage.setItem('Collection', JSON.stringify(CollectionData));
  localStorage.setItem('MoviesData', JSON.stringify(MoviesData));
  localStorage.setItem('TvshowData', JSON.stringify(data));

    // console.log()
    if(localS === false){
      if (error || MoviesError || CollectionError) return <h1>{error}</h1>;
      if (loading || MoviesLoading || CollectionLoading) 
      return <HomepageSkeleton />
    }
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
  // console.log("38",CollectionData);
  console.log("hai3");

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

  console.log("CollectionData",CollectionData);
  console.log(localS2);
  let collection = []
  let genereCollection = []
  localS2 === false ?
  CollectionData.getCollections.map((i) => {
    if(i.type === 'genre') {
      collection.push(i)
    } else if(i.type === 'collection') {
      genereCollection.push(i)
    }
  }) : 
  CollectionLocalStoredData.getCollections.map((i) => {
    if(i.type === 'genre') {
      collection.push(i)
    } else if(i.type === 'collection') {
      genereCollection.push(i)
    }
  })







  console.log("marvel",marvel);

  let some = localS1 === true ? TvshowLocalStoredData.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat) : data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  let some1 = localS === true ? MoviesLocalStoredData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat) : MoviesData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);
  console.log(some);
  console.log(some1);
  console.log(collection);
  console.log(genereCollection);


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
    <div className="mt-60 w-full  ">
      {/* Home */}
      {/* <h1 className="text-3xl"> */}
      <div className=" w-full lg:h-110 ">
      <Homepage name="Tvshows"/>
      </div>
    {/* </h1> */}
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
     <div class="mt-5  m-10">
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
