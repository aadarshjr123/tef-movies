import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetTvshows } from "../query/GetTvshows";
import { TvshowDetails } from "../components/TvshowDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { getActors } from "../query/GetActors";
import { getOtts } from "../query/GetOtts";
import { getSeason } from "../query/GetSeasons";



let array = [];

const MovieDetailsss = (data,data2,data3,data4) => {
  console.log(data4,"data4");
  // console.log(data.getMovies)
  let some = [];
  // let seasons = [];
  // seasons.push(data4.getSeason)
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

some.map((i) => {
  data4.getSeason.map((j) => {
    if(i.id === j.seasonId) {
      // console.log([j]);
      // console.log(typeof i.seasons);
      // console.log(i.seasons);
      i.seasons =  data4.getSeason;
    }
  })
})

// console.log(some,"after pushing");

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
  // console.log(seasons[0]);
  // console.log(data4.getSeason);
  
  
  // some[0].seasons[0].push(seasons);
  console.log(some);
  return some;
};

 function OneTvshow() {
  let sss = window.location.href.split("?")[2]
  let sss1 = window.location.href.split("?")[1]

  console.log("72",sss1);
  const GetTvshowss = useQuery(GetTvshows(sss));
  const getSeasons = useQuery(getSeason(sss1));
  const getOttss = useQuery(getOtts);
  const getActorss = useQuery(getActors);

  if (GetTvshowss.error || getOttss.error || getActorss.error || getSeasons.error) return <h1>Something went wrong!</h1>;
  if (GetTvshowss.loading || getOttss.loading || getActorss.loading || getSeasons.loading) 
  return <Cardskeleton />
    
  // if(GetTvshowss.data || getOttss.data || getActorss.data) 
  // return <Cardskeleton />

  return (
    <main class="w-full">
      {/* {MovieDetailsss(data)}  */}
      <TvshowDetails movie={MovieDetailsss(GetTvshowss.data,getOttss.data,getActorss.data,getSeasons.data)} />
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