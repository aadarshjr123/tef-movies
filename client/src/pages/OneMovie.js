import React, { useEffect } from "react";
import { API_URL } from "../config";
// import { useQuery } from "@apollo/client";
import { GetMovies } from "../query/GetMovies";
import { MovieDetails } from "../components/MovieDetails";
import { Cardskeleton } from "../Skeleton/Cardskeleton";
import { getOtts } from "../query/GetOtts";
import { GetActors, GetOtts } from "../query/GetActors";
import { useQuery } from 'react-query';
import request, { gql } from 'graphql-request';


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

  const getOtts = gql`
  query {
    getOtts {
      
      name
      image
      perMonth
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

  
  const getOtt = () => request(API_URL,
    getOtts,
    queryVariables,
    // headers
  );

  const Mov = () => request(API_URL,
    getMovies,
    queryVariables,
    // headers
  );

  const getActor = () => request(API_URL,
    getActors,
    queryVariables,
    // headers
  );

  const { isLoading, error, data, refetch } = useQuery("GetOtts", getOtt,{staleTime: 1000 * 10});
  const { isLoading:MoviesLoading, error:MoviesError, data:MoviesData } = useQuery("GetMovies", Mov,{staleTime: 1000 * 10});
  const { isLoading:CollectionLoading, error:CollectionError, data:CollectionData } = useQuery("GetActors", getActor,{staleTime: 1000 * 10});

  // const GetMoviess = useQuery(GetMovies);
  // const getOttss = useQuery(getOtts);
  // const getActorss = useQuery(getActors);

  // const getOttss = GetOtts();
  // const GetMoviess = GetMovies();
  // const getActorss = GetActors();

  if (error || CollectionError || MoviesError) return <h1>Something went wrong!</h1>;
  if (isLoading || MoviesLoading || CollectionLoading) 
  return <Cardskeleton />
    console.log(data,MoviesData,CollectionData)
  // if(getOttss.loading ===)
  // console.log(GetMoviess)
  // console.log(getOttss.data)


  return (
    <main class="w-full">
      {/* {MovieDetailsss(data)}  */}
      <MovieDetails movie={MovieDetailsss(MoviesData,data,CollectionData)} />
    </main>
  );
}
// GetMoviess.data,getOttss.data,getActorss.data
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
