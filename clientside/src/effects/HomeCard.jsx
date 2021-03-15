import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeCard = () => {
    return (
        <div className = "card mt-3" style = {{ width: "18rem", border: "1px solid #ccccc" }}>
            <img src="https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/student-256.png" className="card-img-top" alt="student"></img>
            <div className="card-body">
                <h5 className="card-title">What can you do?</h5>
                <h6 className="card-subtitle mb-2 text-muted">If you are our student...</h6>
                <p className="card-text">...you can create your own account, register your personal data and create short posts, remarks, memories and etc.</p>
                    Just &nbsp; 
                <NavLink to="/auth/login" className="card-link">Login</NavLink>
                    &nbsp;
                    or 
                <NavLink to="/auth/register" className="card-link">Create Account</NavLink>
            </div>
        </div>
    )
}

export default HomeCard
