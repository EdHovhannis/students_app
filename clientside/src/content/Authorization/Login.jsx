import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../actions/authActions';
import AlertMessage from './../../effects/AlertMessage';
import useWindowDimensions from './../../effects/ScreenSize';

const Login = () => {
    const {width} = useWindowDimensions()
    let history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const collectUserInfoHandler = (event) => {
        setData({
            ...data, [event.target.id]: event.target.value
        })
    }
    const toHome = () => {
        setData({
            email: "",
            password: ""
        })
        history.push("/")
    }

    const [checkIf, setCheckif] = useState(true)
    const showPassword = () => {
        setCheckif(!checkIf)
    }
   
    const signInHandler = (event) => {
        event.preventDefault()
        dispatch(loginAction(data))
        setData({
            email: "",
            password: ""
        })
        history.push("/")
    }
    const info = useSelector(state=>state.user)
    const {error} = info
    return (
        <form className={ width<800? "mx-auto mt-5 w-100 p-3 loginForm" : "mx-auto mt-5 w-25 p-3 loginForm"}  onSubmit={signInHandler} style={{ backgroundColor: "#e3f2fd" }}>
            {
            !error ? <h1 className="text-secondary p-1">Sign in</h1> : <h1 className="text-secondary p-1">Oops!</h1>
            } 
            {
            error
            ? <AlertMessage variant={"two"}>{error} <span className="try_again" onClick={()=>{window.location.reload()}}> Try again </span> or <span className="try_again" onClick={()=>history.push("/auth/restore")}> Restore </span> </AlertMessage>
            :<>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="@email . . ."
                    required
                    value={data.email}
                    onChange={collectUserInfoHandler}
                />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating">
                <input type={checkIf?"password":"text"} className="form-control passwordInp" id="password" placeholder="password"
                    required
                    value={data.password}
                    onChange={collectUserInfoHandler}
                /> 
                <label htmlFor="password">Password</label>
                <i className={checkIf?"fas fa-eye-slash eyeIcon":"far fa-eye eyeIcon"} onClick={showPassword} ></i>
            </div>
            <div className="mt-1" onClick={()=>history.push("/auth/restore")}>
                &nbsp; <span className="text-primary forgotPassword">Forgot password? </span>
            </div>
            <div className="d-flex align-items-center justify-content-around mt-3 flex-lg-column">
                <button className="btn btn-primary w-100 mb-1" type="submit">Sign in</button>
                <div className="mb-1">
                   <span className="text-primary">or</span> 
                </div>
                <button className="btn btn-secondary w-100" type="button" onClick={()=>history.push("/auth/register")} >Sign up</button>
            </div>
            </> 
            }
            <div className="toHome icon m-3" onClick={toHome}>
                <i className="fas fa-home"></i>
            </div>
        </form>
    )
}

export default Login;
