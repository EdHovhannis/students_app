import React from 'react'
import useWindowDimensions from './ScreenSize'

const Slider = () => {
    const {width} = useWindowDimensions()
    return (
        <>
            
            <div id="carouselExampleIndicators" className={width<640?"carousel slide w-100 mt-5":"carousel slide w-50 mt-3"} data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://raw.githubusercontent.com/EdHovhannis/images_api/master/students/stim1.jpg" className="d-block w-100" alt="stim1" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://raw.githubusercontent.com/EdHovhannis/images_api/master/students/stim5.jpg" className="d-block w-100" alt="stim2" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://raw.githubusercontent.com/EdHovhannis/images_api/master/students/stim3.jpg" className="d-block w-100" alt="stim3" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://raw.githubusercontent.com/EdHovhannis/images_api/master/students/stim4.jpg" className="d-block w-100" alt="stim3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Slider
