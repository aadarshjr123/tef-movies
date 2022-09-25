import React, { Component } from "react";
import Swipe from "react-easy-swipe";
import { Link } from "react-router-dom";
import {Image, Video, Transformation} from 'cloudinary-react';

export class CarouselHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
      type: "",
      name: ""
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.paused === false) {
        let newSlide =
          this.state.currentSlide === this.props.value.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
      }
    }, 10000);


    if(this.props.type === 'Movie') {
      this.setState({
        type: "/OneMovie"
      })
    } else if(this.props.type === 'Tvshow') {
      this.setState({
        type: "/OneTvshow",
        name: "Tvshows"
      })
    }
  }
  
  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === this.props.value.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };

  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? this.props.value.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  render() {

    return (
      <div className=" bg-gradient-to-r from-black via-black to-transparent m-3 lg:m-0 flex justify-center items-center ">
        <div className=" flex w-full md:h-96 lg:h-200 overflow-hidden relative">

          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {this.props.value.map((slide, index) => {

              return (
                <div>


                <Link to={{
                  pathname:  `${this.state.type}`,
                  search: this.state.name.length > 0 ? `?${slide.id}?Tvshows`:`?${slide.id}`,
                  state: { fromDashboard: true },
                  key: index

                }}>
                  <div class=" flex flex-row  h-full">

                  <div className={
                    index === this.state.currentSlide
                      ? "block w-full h-auto object-cover "
                      : "hidden"
                  }>

     <Image 
            cloud_name="tefdb"
            key={index}
            loading="lazy"
            class="opacity-60"
            format="webp"
            publicId={slide.rectanglePosters[0].rectanglePosters}
            onMouseEnter={() => {
              this.setState({ paused: true });
            }}
            onMouseLeave={() => {
              this.setState({ paused: false });
            }}

            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
                  </div> 
     

                </div>
                  </Link>

                  </div>
              );
            })}
          </Swipe>

          <div class="  h-40 absolute w-full flex justify-center bottom-0">
                {
                  this.props.value.map((slide, index) => {
                    console.log(slide)
                    return(
                      <div class="absolute  w-11/12 h-full">
                        <p
                        className={
                          index === this.state.currentSlide
                            ? " block font-RobotoMono text-white lg:w-full h-5 lg:h-10 object-cover text-sm lg:text-xl"
                            : "hidden"
                        }>
                         ⭐ {slide.rating[0].imdb}
                        </p>
                        <h5 class="lg:text-xs" key={index}
                        className={
                          index === this.state.currentSlide
                            ? "block font-RobotoMono text-white lg:w-full h-5 lg:h-10 object-cover text-sm lg:text-2xl font-bold "
                            : "hidden"
                        }>{slide.name.toUpperCase()}</h5>
                        <p className={
                          index === this.state.currentSlide
                            ? " font-RobotoMono block text-white lg:w-full h-5 lg:h-10 object-cover text-sm lg:text-sm font-bold"
                            : "hidden"}>{slide.movieInfo[0].releaseDate} - {slide.movieInfo[0].genre[0].genre} <p className={
                              index === this.state.currentSlide
                                ? "block font-RobotoMono  font-thin lg:w-full h-5 lg:h-10 object-cover text-sm lg:text-sm"
                                : "hidden"}>{slide.storyline.split(/\s+/).slice(0,20).join(" ")}...</p> </p>
                      </div>
                    )
                  }
                  )
                }
                </div>
          <div className="absolute w-full flex justify-center bottom-0">
            {this.props.value.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "bg-black w-3 h-1 mx-2 mb-2 cursor-pointer"
                      : "bg-white w-3 h-1 rounded-sm mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>

        </div>
      </div>
    );
  }
}

//  Carousel;