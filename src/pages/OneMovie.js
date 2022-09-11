import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { MovieDetails } from "../components/MovieDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { getOtts } from "../query/GetOtts";
import { getActors } from "../query/GetActors";

let array = [];

const MovieDetailsss = (data,data2,data3) => {
  let some = [];
  console.log(data);
  data.getMovies.filter((user, index) =>
    // console.log(user)
    user.id === `${window.location.href.split("?")[1]}`
      ? // console.log(user)
        some.push(user)
      : // }
        "No movie named that"
  );
  // console.log(data2);
  // console.log(some);

  some[0].watchOn.map((i) => {
    data2.getOtts.map((j) => {
        if(i.watchOn === j.name) {
          // console.log(i);
          // console.log(j.image);
             i.image = j.image;
             i.perMonth = j.perMonth
        } else if(i.watchOn.split("-")[0] === j.name){
          i.image = j.image;
             i.perMonth = j.perMonth
        }
    })
})

some[0].casts.map((castName) => {
  data3.getActors.map((actors) => {
    if(castName.castName === actors.name) {
      // console.log(i);
      // console.log(j.image);
      castName.image = actors.image
    }
  })
})

some[0].movieInfo[0].director.map((castName) => {
  data3.getActors.map((actors) => {
    if(castName.director === actors.name) {
      // console.log(i);
      // console.log(j.image);
      castName.image = actors.image
    }
  })
})

  // console.log("Actors",data3);
  console.log(some);
  // some.
  return some;
};

 function OneMovie() {
  
  const GetMoviess = useQuery(GetMovies);
  const getOttss = useQuery(getOtts);
  const getActorss = useQuery(getActors);


  if (getOttss.error || GetMoviess.error || getActorss.error) return <h1>Something went wrong!</h1>;
  if (getOttss.loading || GetMoviess.loading || getActorss.loading) 
  return <Cardskeleton />
    
  // if(getOttss.loading ===)
  // console.log(GetMoviess)
  console.log(getOttss.data)


  return (
    <main class="w-full">
      {/* {MovieDetailsss(data)}  */}
      <MovieDetails movie={MovieDetailsss(GetMoviess.data,getOttss.data,getActorss.data)} />
    </main>
  );
}
// export default OneMovie;

// export function OneMovie() {
//   const { loading, error, data } = useQuery(GetMovie("sss"));

//   if (error) return <h1>Something went wrong!</h1>;
//   if (loading) 
//   return <Cardskeleton />
  
//   return(
//     <main class="w-full">
//            {console.log(data)} 
//          {/* <MovieDetails movie={MovieDetailsss(data)} /> */}
//        </main>
//   )

// }


export default OneMovie
