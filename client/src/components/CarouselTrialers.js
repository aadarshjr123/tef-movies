import React, { Component } from "react";
import Swipe from "react-easy-swipe";
import { Link } from "react-router-dom";
import {Image, Video, Transformation} from "./CloudImage";
import ReactPlayer from "react-player";

export class CarouselTrialers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
      // type: "",
      name: ""
    };
  }

  // componentDidMount() {
   
  //   if(this.props.type === 'Movie') {
  //     this.setState({
  //       type: "/OneMovie"
  //     })
  //   } else if(this.props.type === 'Tvshow') {
  //     this.setState({
  //       type: "/OneTvshow",
  //       name: "Tvshows"
  //     })
  //   }
  // }
  
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
      <div className=" bg-gradient-to-r lg:h-300 from-black via-black to-transparent m-3 lg:m-0 flex justify-center items-center ">
        <div className=" flex w-full md:h-96 lg:h-200 overflow-hidden relative ">

          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {this.props.value.map((slide, index) => {

              return (
                <div>


            
                  <div class=" flex flex-row  h-full">

                  <div className={
                    index === this.state.currentSlide
                      ? "block w-600 h-200 object-cover"
                      : "hidden"
                  }>

                    <ReactPlayer width='100%'
        // playing={true} 
        pip={true }
        stopOnUnmount={false}
        controls={true}
        muted={true}
        light={true}
          height='100%' url={slide.link} />
                  </div> 
     

                </div>
  

                  </div>
              );
            })}
          </Swipe>

          {/* <div class="  h-40 absolute w-full flex justify-center bottom-0">
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
                         ⭐ {slide.date}
                        </p>
                        <h5 class="lg:text-xs" key={index}
                        className={
                          index === this.state.currentSlide
                            ? "block font-RobotoMono text-white lg:w-full h-5 lg:h-10 object-cover text-sm lg:text-2xl font-bold "
                            : "hidden"
                        }>{slide.name.toUpperCase()}</h5>
                      </div>
                    )
                  }
                  )
                }
                </div> */}
          <div className="absolute w-full flex justify-center items-center bottom-0 ">
            {this.props.value.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "bg-gray-500 w-3 rounded-sm h-1 mx-2 mb-2 cursor-pointer"
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