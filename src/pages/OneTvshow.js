import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GetTvshows } from "../query/GetTvshows";
import { TvshowDetails } from "../components/TvshowDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { getActors } from "../query/GetActors";
import { getOtts } from "../query/GetOtts";


let array = [];

const MovieDetailsss = (data,data2,data3) => {
  // console.log(data);
  // console.log(data.getMovies)
  let some = [];
  console.log(window.location.href.split("?")[1]);
  console.log(data);

  data.getTVshow1.filter((user, index) =>
    // console.log(user)
    user.id === `${window.location.href.split("?")[1]}`
      ? // console.log(user)
        some.push(user)
      : // }
        "No movie named that"
  );

  console.log(data2)
  some[0].watchOn.map((i) => {
    data2.getOtts.map((j) => {
        if(i.watchOn === j.name) {
          // console.log(i);
          // console.log(j.image);
             i.perMonth = j.perMonth
             i.image = j.image;
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


some[0].tvshowInfo[0].creator.map((castName) => {
  data3.getActors.map((actors) => {
    if(castName.creator === actors.name) {
      // console.log(i);
      // console.log(j.image);
      castName.image = actors.image
    }
  })
})
  // console.log("Actors",data3);
  // console.log(some);
  console.log(some);
  return some;
};

 function OneTvshow() {
  let sss = window.location.href.split("?")[2]
  const GetTvshowss = useQuery(GetTvshows(sss));
  const getOttss = useQuery(getOtts);
  const getActorss = useQuery(getActors);

  if (GetTvshowss.error || getOttss.error || getActorss.error) return <h1>Something went wrong!</h1>;
  if (GetTvshowss.loading || getOttss.loading || getActorss.loading) 
  return <Cardskeleton />
    
  // if(GetTvshowss.data || getOttss.data || getActorss.data) 
  // return <Cardskeleton />

  return (
    <main class="w-full">
      {/* {MovieDetailsss(data)}  */}
      <TvshowDetails movie={MovieDetailsss(GetTvshowss.data,getOttss.data,getActorss.data)} />
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


export default OneTvshow