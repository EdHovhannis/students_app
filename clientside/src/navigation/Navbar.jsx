import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT } from './../constants/constants';
import { getUser } from '../actions/authActions';
import useWindowDimensions from '../effects/ScreenSize';



const Navbar = ({ searchByType }) => {
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    const [isStudents, setisStudents] = useState(JSON.parse(localStorage.getItem("checkkey")))
    const getkeytrue = () => {
        localStorage.removeItem("checkkey")
        JSON.stringify(localStorage.setItem("checkkey", true))
        setisStudents(true)
    }
    const setkeyfalse = () => {
        localStorage.removeItem("checkkey")
        JSON.stringify(localStorage.setItem("checkkey", false))
        setisStudents(false)
    }

    const logOutHandler = () => {
        dispatch({ type: LOGOUT })
        localStorage.removeItem("checkkey")
        JSON.stringify(localStorage.setItem("checkkey", false))
        setisStudents(false)
    }
    const isUser = useSelector(state => state.user.user)

    useEffect(() => {
        if (isUser) { dispatch(getUser(isUser._id)) }
    }, [dispatch, isUser])

    const currentUser = useSelector(state => state.currentUser)
    const { user } = currentUser


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <NavLink onClick={setkeyfalse} className="navbar-brand _brand" activeClassName="activeBrand" exact to="/">
                        <i className="fas fa-graduation-cap"></i>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {
                                !isUser ? null
                                    : <>
                                        <li className="nav-item">
                                            <NavLink onClick={getkeytrue} className="nav-link" aria-current="page" to="/studentslist" activeClassName="active">Students-list</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink onClick={setkeyfalse} className="nav-link" to="/registerasastudent" activeClassName="active">Student?</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink onClick={setkeyfalse} className="nav-link" to="/allposts" activeClassName="active">All posts</NavLink>
                                        </li>
                                    </>
                            }


                            {
                                !isUser ?
                                    <li className="nav-item dropdown">
                                        <NavLink onClick={setkeyfalse} className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" activeClassName="active">
                                            Sign
                                    </NavLink>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><NavLink onClick={setkeyfalse} className="dropdown-item" to="/auth/login">Login</NavLink></li>
                                            <li><NavLink onClick={setkeyfalse} className="dropdown-item" to="/auth/register">Create account</NavLink></li>
                                        </ul>
                                    </li>
                                    :
                                    <li className="nav-item dropdown">
                                        {user === null ? null : <NavLink onClick={setkeyfalse} className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" activeClassName="active">
                                            {user.name}
                                        </NavLink>}
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {user === null ? null : <li><NavLink className="dropdown-item" to={`/mypage/${user.name}/${isUser._id}`} >My Account</NavLink></li>}
                                            <li><NavLink onClick={logOutHandler} className="dropdown-item" exact to={"/"}>Log out</NavLink></li>
                                        </ul>
                                    </li>
                            }

                        </ul>
                        {
                            isStudents
                                ?  <form className={width < 800 ? "d-flex w-100 me-2" : "d-flex w-25 "} >
                                        <input className="form-control" type="search" placeholder="Type to search . . ." aria-label="Search" onChange={searchByType} />
                                    </form>
                                : null
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar






