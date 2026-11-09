import React, { Component } from "react";
import Swipe from "react-easy-swipe";
import { Link } from "react-router-dom";
import {Image, Video, Transformation} from "./CloudImage";


export class CarouselPosters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
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
    // console.log(this.props.value);
    // console.log( `${this.state.type}`, this.state.name.length > 0 ? `?6241e21?Tvshows`:`?6241e21`,)
    // console.log()
    return (
      <div className="mt-10 m-5 md:m-10 lg:m-10 flex justify-center items-center ">
        <div className="flex w-full md:w-20/12 lg:w-20/12 md:h-96 lg:h-80  overflow-hidden relative rounded-md ">
          {/* <AiOutlineLeft
            onClick={this.prevSlide}
            className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          /> */}
          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {this.props.value.map((slide, index) => {
              // console.log("Carosel",slide);
              return (
                <div>
                {/* {console.log(this.state.name.length > 0 ? `?${slide.id}?Tvshows`:`?${slide.id}`)} */}
                
                  <div class="">
                   
                {/* <img
                  src={slide.posters}
                  alt="This is a carousel slide"
                  key={index}
                  className={
                    index === this.state.currentSlide
                      ? "object-fill w-48 md:w-80 lg:w-56 h-72 md:h-80 lg:h-80 "
                      : "hidden"
                  }
                  onMouseEnter={() => {
                    this.setState({ paused: true });
                  }}
                  onMouseLeave={() => {
                    this.setState({ paused: false });
                  }}
                /> */}

<Image
            // class="object-fill w-48 md:w-80 lg:w-56 h-72 md:h-80 lg:h-80 "
        cloud_name="tefdb"
        loading="lazy"
        publicId={slide.posters}
        format="webp"
            // src={movie.movie[0].posters[0].posters}
            alt="Mountain"
            className={
              index === this.state.currentSlide
                ? "object-fill w-48 md:w-80 lg:w-56 h-72 md:h-80 lg:h-80 "
                : "hidden"
            }
            onMouseEnter={() => {
              this.setState({ paused: true });
            }}
            onMouseLeave={() => {
              this.setState({ paused: false });
            }}
            >
            <Transformation quality="85"/>
          </Image>
               
                </div>
                  
                  </div>
              );
            })}
          </Swipe>
          {/* <div className="border-2 border-white absolute w-full flex justify-center bottom-0">
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
          </div> */}

          {/* <AiOutlineRight
            onClick={this.nextSlide}
            className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          /> */}
        </div>
      </div>
    );
  }
}

//  Carousel;