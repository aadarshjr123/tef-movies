import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { Homepage } from "./Homepage";
import { CardLayoutTvshow } from "../components/CardLayoutTvshow";
import { CardLayoutTvshow_3 } from "../components/CardLayoutTvshow_3";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { HomepageSkeleton } from "../Skeleton/HomepageSkeleton";
import { GetMovies } from "../query/GetMovies";
import { CardLayout } from "../components/CardLayout";
import { Collection } from "../components/Collection";

const Tvshows =  () => {

  const { loading, error, data } = useQuery(GetTvshows("Tvshows"));
  // const = useQuery(GetTvshows("Tvshows"));
  const { loading:MoviesLoading, error:MoviesError, data:MoviesData }  = useQuery(GetMovies);

    // console.log()
    if (error || MoviesError) return <h1>{error}</h1>;
    if (loading || MoviesLoading) 
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
  console.log(MoviesData);
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

  let collection = [{
      name: 'marvel',
      image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650376487/009afde4-1fd0-409e-8db6-7a04e0f1b62d_ch3lq8.webp'
  },
  {
    name: 'spider man',
    image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650376662/e8f281fd-085b-4f5f-af11-b8aed0f34ccc_enwhxb.webp'
},
{
  name: 'star wars',
  image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650376663/795252df-0c05-4ebc-97cf-99cdbbbe91c1_tprian.webp'
},
{
  name: 'pixar',
  image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650376662/8db2f408-1e82-4220-9fa1-66676cb5ccb9_zxe4dn.webp'
},
{
  name: 'Dc',
  image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650376662/9d02485c-6e5d-44ae-8de9-a12bce828d63_u6o6kq.webp'
}
]


let genereCollection = [{
  name: 'Comedy',
  image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650378035/8269beb6-8b78-4f17-8369-e1c644403613_vsbuup.webp'
},
{
name: 'Action',
image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650378035/a7b00252-3fee-4316-b2c7-8ef740172ef4_gmvzco.webp'
},
{
name: 'Family',
image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650378035/3f8c0905-e96f-44ec-a9ba-6b75242076f4_igu21m.webp'
},
{
name: 'Horror',
image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650378035/d18b8ada-97d7-45fe-b731-3189341b2d53_k9jx6h.webp'
},
{
name: 'Fantasy',
image: 'https://res.cloudinary.com/dgrljsghp/image/upload/v1650378036/70173f5b-913d-4741-87be-12acce0db2af_trmk07.webp'
}
]


  console.log("marvel",marvel);

  let some = data.getTVshow1.sort((a, b) => b.tvshowInfo[0].dateFormat - a.tvshowInfo[0].dateFormat);
  let some1 = MoviesData.getMovies.sort((a, b) => b.movieInfo[0].dateFormat - a.movieInfo[0].dateFormat);

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

  return (

    // console.log(data)
    <div className="mt-44 w-full  ">
      {/* Home */}
      {/* <h1 className="text-3xl"> */}
      <div className=" w-full lg:h-300 ">
      <Homepage name="Tvshows"/>
      </div>
    {/* </h1> */}
    <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed movies</h3>  
    <div class="m-4"></div>
    <div class=" m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
    {
         some1.map((movies) => (
           <CardLayout  user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Latest dubbed tvshoes</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden hide-scroll-bar ">
    {
         some.map((movies) => (
           <CardLayoutTvshow  user={movies}/>
         ))
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Movie Collection</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0  space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
         collection.map((collection) =>
           <Collection  collection={collection}/>
         )
      }
     </div>

     </div>
     <div class="mt-5 ">
     <div class="m-16"></div>
    <h3 class=" font-black m-7 md:ml:10 lg:ml-0 text-sm md:text-2xl lg:text-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">Genres</h3>  
    <div class="m-4"></div>
    <div class="m-2 lg:m-0 space-x-1 flex h-full overflow-x-scroll overflow-y-hidden  hide-scroll-bar ">
     {
         genereCollection.map((collection) =>
           <Collection  collection={collection}/>
         )
      }
     </div>

     </div>
    </div>
  );
};

export default Tvshows;
