import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import baffle from 'baffle';
import Anime from './pages/Anime';
import Movies from "./pages/Movies";
import Tvshows from './pages/Tvshows';
import Home from './pages/Home';
import FilterMovie from './pages/filterMovie';
import FilterTvshow from './pages/filterTvshow';
import OneMovie from './pages/OneMovie';
import OneTvshow from './pages/OneTvshow';
// import instagram from './instagram.png';
// import youtube from './youtube.png';
// import facebook from './facebook.png';
// import twitter from './twitter.png';
import Logo from './Frame1.svg';
import Toggle from './components/ThemeToggle';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import UseAnimations from "react-useanimations";
import searchToX from 'react-useanimations/lib/searchToX';
import instagram from 'react-useanimations/lib/instagram';
import twitter from 'react-useanimations/lib/twitter';
import facebook from 'react-useanimations/lib/facebook';
import youtube from 'react-useanimations/lib/youtube';

import FilterGenre from './pages/filterGenre';
import SearchBox from './components/Search';

const queryClient = new QueryClient()

// src\tomatometer-fresh.149b5e8adc3.svg

export default function App() {

  let status = window.innerWidth;
  console.log(status);

  return (
    <QueryClientProvider client={queryClient}>
    <div class="">

<div class="z-10 relative mt-5 md:m-10 lg:mt-5 h-full  max-w-screen-2xl max-w-screen overflow-hidden ">
    <div className=' fixed top-0 left-0 right-0 md:m-0 lg:m-0 h-36 md:h-44 lg:h-44 w-full flex flex-col space-y-10 lg:space-y-0 lg:flex-row justify-center items-center bg-white dark:bg-hotstar z-20'>
    {/* <img class="w-1/3 h-5 md:h-14 lg:h-14 "
           src={Logo}
           alt="A Quiet Place movie poster" />
            */}
            <p class=" w-full md:w-1/3 lg:w-1/3 h-5 md:h-14 lg:h-14 flex justify-center items-center text-2xl md:text-2xl lg:text-4xl font-extrabold text-transparent bg-clip-text  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">TEFMovies</p>
           <div className=' w-full flex justify-center lg:justify-start items-center md:w-3/4 lg:w-3/4 h-5 md:h-14 lg:h-14  '>
            <div class="lg:flex lg:justify-start items-start lg:w-4/5 ">
            <Navbar />
            </div>
            <div class="z-20">
            <SearchBox/>
            </div>

            

            {/* <div class="lg:m-4"></div> */}
            <div class="lg:mt-4 lg:ml-0 mt-1 ">
            <Toggle />
            </div>
           </div>
    </div>
    <div className='h-auto '>
     <BrowserRouter>
       <Switch>
         <Route exact path="/">
           <Redirect to="/Home"/>
         </Route>
         <Route path='/Tvshows' exact component={Tvshows} />
         <Route path='/Home' exact component={Home} />
         <Route path='/Movies' component={Movies} />
         <Route path='/Anime' component={Anime} />
         <Route path='/Popular' component={FilterMovie} />
         <Route path='/PopularGenre' component={FilterGenre} />
         <Route path='/PopularTvshows' component={FilterTvshow} />
         <Route path='/OneMovie' component={OneMovie} />
         <Route path='/OneTvshow' component={OneTvshow} />
       </Switch>
     </BrowserRouter>
    </div>
    <div className=' mt-32 w-full h-52 relative  flex flex-row justify-center item-center'>
      <div className=' absolute visible dark:invisible sm:w-1  flex mt-5 md:mt-20 lg:mt-4 justify-center row-auto gap-2 '>
        <div >
        <UseAnimations animation={instagram} size={status <= 640 ? 30 : 40} strokeColor="#000"/>
        </div>
        
        <div>
        <UseAnimations animation={twitter} size={status <= 640 ? 30 : 40} strokeColor="#000"/>
        </div>
       
        <div>
        <UseAnimations animation={youtube} size={status <= 640 ? 30 : 40} strokeColor="#000"/>    
        </div>

        <div>
        <UseAnimations animation={facebook} size={status <= 640 ? 30 : 40} strokeColor="#000"/>
        </div>

      </div>
      <div className='absolute  invisible dark:visible  flex mt-5 md:mt-20 lg:mt-4 justify-center row-auto gap-2 '>
        <div >
        <UseAnimations animation={instagram} size={status <= 640 ? 30 : 40} strokeColor="#fff"/>
        </div>
        
        <div>
        <UseAnimations animation={twitter} size={status <= 640 ? 30 : 40} strokeColor="#fff"/>
        </div>
       
        <div>
        <UseAnimations animation={youtube} size={status <= 640 ? 30 : 40} strokeColor="#fff"/>    
        </div>

        <div>
        <UseAnimations animation={facebook} size={status <= 640 ? 30 : 40} strokeColor="#fff"/>
        </div>

      </div>
      <div className=' absolute mt-20  mb-10 md:mb-20 lg:mb-20 md:mt-20 lg:mt-20 m-5 lg:m-10'>
      <p className='flex justify-center font-bold  text-xs lg:text-sm  text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>© 1990-2022 by TEFMovies.com, Inc.</p>
      </div>
      <div className=' flex flex-col justify-center items-center h-10 mt-28 lg:mt-32'>
      <div className='flex mt-0 md:mt-20 lg:mt-4 justify-center row-auto gap-4 '>
        <div >
        <p className='flex justify-center  text-xs lg:text-sm  font-mono text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2'>Terms Of Use</p>
        </div>
        
        <div>
        <p className='flex justify-center  text-xs lg:text-sm  font-mono text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2'>Privacy Policy</p>

        </div>
       
        <div>
        <p className='flex justify-center  text-xs lg:text-sm  font-mono text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2'>FAQ</p>
    
        </div>
        <div>
        <p className='flex justify-center  text-xs lg:text-sm  font-mono text-white bg-gray-200 rounded-md px-1 lg:px-3 py-1 lg:py-0.5 font-semibold text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mr-1 lg:mr-2 lg:mb-2'>Feedback</p>

        </div>
      </div>
      </div>
    </div>
    </div>
    </div>
    
    </QueryClientProvider>
  )
}
