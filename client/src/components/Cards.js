import React from "react";
import {Image, Video, Transformation} from 'cloudinary-react';

const randomPosters = (posters) => {

  // console.log(posters);
  var item = posters[Math.floor(Math.random()* posters.length)]
  // console.log(item)
  return item.posters
}

export const Cards = ({ user: { name, storyline, posters } }) => (
  <div class="w-40 h-80 border-2 border-black">
   <div class="flex box-border w-40 h-14 justify-center items-center border-2 border-black">
        <div class="font-bold text-xs text-center">{name}</div>
      </div>
      <div class="m-5"/>
      <div
        class="w-40 h-56 max-w-xs overflow-hidden bg-white hover:shadow-xl  transition-shadow duration-300 ease-in-out"
      >
        <a href="https://i.imgur.com/fe0T4nw.png">
          {/* <img class=" rounded-lg object-fill  h-full w-full" src={randomPosters(posters)} alt="Mountain" /> */}
          <Image 
            class=" rounded-lg object-fill  h-full w-full"
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={randomPosters(posters)}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
        </a>
      </div>
  </div>
);



