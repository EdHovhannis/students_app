import React from 'react'
import HomeCard from '../../effects/HomeCard'
import Slider from '../../effects/Slider'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Home = () => {
    const history = useHistory()
    if (history.location.pathname === "/") {
        document.querySelector("title").innerHTML = "Home"
    } 
    const userInfo = useSelector(state=>state.user)
    const {user} = userInfo
    return (
        <div className="d-flex align-items-center justify-content-around flex-wrap">
            {!user?<HomeCard />:null} 
            <Slider />
        </div>
    );
}

export default Home
