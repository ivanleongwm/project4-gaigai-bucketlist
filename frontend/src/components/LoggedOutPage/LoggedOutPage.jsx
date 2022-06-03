import React from 'react'
import {useRef, useState} from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './LoggedOutPage.css'

function LoggedOutPage() {
    const[showFindOutMore, setShowFindOutMore] = useState(true)

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 0.2,
       
    };

    const sliderRef = useRef();

    function next(event) {
        //event.target.slider.slickNext();
        if (event.target.id === 'next') {
            sliderRef.current.slickNext()
            setShowFindOutMore(false)
        } 
      }

    function previous(event) {
        if (event.target.id === '') {
            sliderRef.current.slickPrev()
            setShowFindOutMore(true)
        }
    }

    return (
    <div className="logged-out-container">
        <Slider ref={sliderRef} {...settings}>
            <div id="prev" className="main-page-image" onClick={(event) => {
                console.log(event)
                previous(event)}}>
                <div className="center-platform">
                    {
                        showFindOutMore ?
                        <div className="center-box">
                            <h1>GaiGai</h1>
                            <h4>A trip planning diary</h4>
                            <button id="next" className="button" onClick={(event) => {next(event)}}>
                                Learn More >
                            </button>
                        </div> 
                        :
                        <div></div>
                    }
                 </div>  
            </div>
            <div className="description">
            Hello
            </div>
        </Slider>
    </div>  
    )
}

export default LoggedOutPage;