import React, { useEffect } from "react";
// import { useQuery } from "@apollo/client";
import { GetTvshows } from "../query/GetTvshows";
import { TvshowDetails } from "../components/TvshowDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { GetActors, getActors, GetOtts, GetSeason } from "../query/GetActors";
import { getOtts } from "../query/GetOtts";
import { getSeason } from "../query/GetSeasons";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';


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

  const getOtts = gql`
  query {
    getOtts {
      
      name
      image
      perMonth
    }
        }
  `;

  const getTvshows = gql`
  query {
    getTVshow1( Type:  "Tvshows") {
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
  `;

  // function usePost(postId) {
  //   return useQuery(
  //     ["GetSeason", sss1],
  //     async () => {
  //       const { data } = await request(
  //         'https://tefmovies.herokuapp.com/graphql',
  //         gql`
  //           query GetSeason($seasonId: String!) {
  //   getSeason(seasonId:$seasonId) {
  //     name
  //     seasonId
  //     season
  //     seasonStart
  //     seasonEnd
  //     episodes{
  //       episodeName
  //       episodeDescription
  //     }
  //   }
  //       }
  //         `,
  //         { seasonId: sss1 }
  //       );
  //       return data;
  //     }
  //   );
  // }

  const getSeasons =
  `
  query GetSeason($seasonId: String!) {
    getSeason(seasonId:$seasonId) {
      name
      seasonId
      season
      seasonStart
      seasonEnd
      episodes{
        episodeName
        episodeDescription
      }
    }
        }
          `;
  const getActors = gql`
  query {
    getActors {
      
      name
      image
    }
        }
  `;
  const queryVariables = {};

  // const headers = { Authorization: `Bearer ${user._accessToken}` }

  const API_URL = 'https://tefmovies.herokuapp.com/graphql';
  
  const getOtt = () => request(API_URL,
    getOtts,
    queryVariables,
    // headers
  );

  const getTvshow = () => request(API_URL,
    getTvshows,
    queryVariables,
    // headers
  );

  const getSeason = ({ queryKey }) => {
    const [_, names] = queryKey;
    console.log("season id",names);
    const somes = request(
      'https://tefmovies.herokuapp.com/graphql',
      gql`
        query GetSeason($seasonId: String!) {
getSeason(seasonId:$seasonId) {
  name
  seasonId
  season
  seasonStart
  seasonEnd
  episodes{
    episodeName
    episodeDescription
  }
}
    }
      `,
      { seasonId: names }
    ).catch(e => {
      console.log(e);
    })
    console.log("getSeason",somes);
    return somes;
  }

  const getActor = () => request(API_URL,
    getActors,
    queryVariables,
    // headers
  );


  console.log("72",sss1);
  console.log("72",typeof sss1);

  // const GetTvshowss = useQuery(GetTvshows(sss));
  // const getSeasons = useQuery(getSeason(sss1));
  // const getOttss = useQuery(getOtts);
  // const getActorss = useQuery(getActors);

  // const getOttss = GetOtts();
  // const GetTvshowss = GetTvshows(sss);
  // const getSeasons = GetSeason(sss1);
  // // const GetMoviess = GetMovies();
  // const getActorss = GetActors();

  const { isLoading, error, data, refetch } = useQuery("GetOtts", getOtt);
  const { isLoading:MoviesLoading, error:MoviesError, data:MoviesData } = useQuery("GetTvshows", getTvshow);
  const { isLoading:SeasonLoading, error:SeasonError, data:SeasonData } = useQuery(["GetSeason",sss1], getSeason);
  const { isLoading:ActorLoading, error:ActorError, data:ActorData } = useQuery("GetActors", getActor);
  // const { isLoading:SeasonLoading, error:SeasonError, data:SeasonData } = useQuery(
  // ["GetSeason",sss1]
  // );


  if (error||  MoviesError || SeasonError || ActorError) return <h1>Something went wrong!</h1>;
  if (isLoading ||MoviesLoading|| SeasonLoading || ActorLoading) 
  return <Cardskeleton />
    console.log(data,MoviesData,SeasonData,ActorData)
  // if(GetTvshowss.data || getOttss.data || getActorss.data) 
  // return <Cardskeleton />

  return (
    <main class="w-full">
      {/* {MovieDetailsss(data)}  */}
      <TvshowDetails movie={MovieDetailsss(MoviesData,data,ActorData,SeasonData)} />
    </main>
  );
}

// GetTvshowss.data,getOttss.data,getActorss.data,getSeasons.data
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