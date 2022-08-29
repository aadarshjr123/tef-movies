import React, { Component } from "react";
import Swipe from "react-easy-swipe";
import { Link } from "react-router-dom";
import {Image, Video, Transformation} from 'cloudinary-react';


export class Carousel extends Component {
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
    // console.log(this.props.value);
    // console.log( `${this.state.type}`, this.state.name.length > 0 ? `?6241e21?Tvshows`:`?6241e21`,)
    // console.log()
    return (
      <div className="m-3 md:m-10 lg:m-10 flex justify-center items-center ">
        <div className="flex w-full md:w-20/12 lg:w-20/12 md:h-96 lg:h-96  overflow-hidden relative rounded-md ">
          {/* <AiOutlineLeft
            onClick={this.prevSlide}
            className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          /> */}
          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {this.props.value.map((slide, index) => {
              // console.log("Carosel",slide);
              return (
                <div>
                <div class="h-10 md:h-full lg:h-10 carousel-caption top-3 lg:top-3 flex justify-center items-center md:block absolute text-center ">
                <h5 class="lg:text-xs" key={index}
                  className={
                    index === this.state.currentSlide
                      ? "block -mt-5 lg:w-full h-5 lg:h-10 object-cover text-sm lg:text-xl font-bold "
                      : "hidden"
                  }>{slide.name}</h5>
                </div>
                {/* {console.log(this.state.name.length > 0 ? `?${slide.id}?Tvshows`:`?${slide.id}`)} */}
                <Link to={{
                  pathname:  `${this.state.type}`,
                  search: this.state.name.length > 0 ? `?${slide.id}?Tvshows`:`?${slide.id}`,
                  state: { fromDashboard: true },
                  key: index
                  // index: this.state.currentSlide
                }}>
                  <div class="">
                   
                {/* <img
                  src={slide.rectanglePosters[0].rectanglePosters}
                  alt="This is a carousel slide"
                  key={index}
                  className={
                    index === this.state.currentSlide
                      ? "block w-full h-auto object-cover"
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
                key={index}
                className={
                  index === this.state.currentSlide
                    ? "block w-full h-auto object-cover"
                    : "hidden"
                }
                onMouseEnter={() => {
                  this.setState({ paused: true });
                }}
                onMouseLeave={() => {
                  this.setState({ paused: false });
                }}
            // class="object-cover blur-3xl h-450 lg:h-110 w-full "
            cloud_name="tefdb"
            loading="lazy"
            format="webp"
            publicId={slide.rectanglePosters[0].rectanglePosters}
            // src={movie.movie[0].rectanglePosters[0].rectanglePosters}
            alt="Image"
          >
            <Transformation quality="85"/>
          </Image>
                
                {/* {console.log(slide[this.state.currentSlide])} */}
              

                
                {/* <div key={index} class="lg:-h-10 carousel-caption justify-center items-center md:block absolute text-center "> */}
                {/* <p key={index}
                  className={
                    index === this.state.currentSlide
                      ? "text-sm lg:text-md block font-mono w-full h-auto object-cover "
                      : "hidden"
                  }>Available languages {slide.availLanguages.length}</p> */}
                {/* Available languages {slide.availLanguages.length} */}
               {/* </div> */}
                {/* <div class="rounded hidden md:block absolute justify-center text-center bottom-6 left-2 h-10 w-48 bg-slate-500  border">
                <h5 class="text-xs" key={index}
                  className={
                    index === this.state.currentSlide
                      ? "block  w-full h-auto object-cover text-xl font-bold"
                      : "hidden"
                  }>Available languages {slide.availLanguages.length}</h5>
                  </div> */}
                </div>
                  </Link>
                  <div class=" z-0 bg-opacity-30 h-10 md:h-full lg:h-10 carousel-caption top-36 lg:top-10 flex justify-center items-center md:block absolute text-center">
                <p class="lg:text-xs" key={index}
                  className={
                    index === this.state.currentSlide
                      ? "block -mt-5  lg:w-full h-5 lg:h-10 object-cover text-xs lg:text-md font-mono "
                      : "hidden"
                  }>Available languages {slide.availLanguages.length}</p>
                </div>
                  </div>
              );
            })}
          </Swipe>
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