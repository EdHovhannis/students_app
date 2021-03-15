import React, {useState} from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {registerAction} from '../../actions/authActions';
import AlertMessage from '../../effects/AlertMessage';
import useWindowDimensions from './../../effects/ScreenSize';

const Register = () => {
    const {width} = useWindowDimensions()
    let history = useHistory()
    const toHome = () => {
        history.push('/')
    }
   const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: ""

})
    const collectUserInfoHandler = (event) => {
        setData({
            ...data, [event.target.id]: event.target.value
        })
    }
    const [checkIf, setCheckif] = useState(true)
    const [check, setCheck] = useState(true)
    const showPassword = () => {
        setCheckif(!checkIf)
    }
    const showPassword2 = () => {
        setCheck(!check)
    }

    const dispatch = useDispatch()
    const signUpHandler = (event) => {
        event.preventDefault()
        dispatch(registerAction(data))
        setData({
            name: "",
            email: "",
            password: "",
            repeatpassword: ""

        })
        history.push("/")
    }
    const info = useSelector(state=>state.user)
    const {error} = info
    return (
        <form className={width<800? "mx-auto mt-5 w-100 p-3 loginForm": "mx-auto mt-5 w-25 p-3 loginForm"} style={{ backgroundColor: "#e3f2fd" }} onSubmit={signUpHandler}>
            {
            !error ? <h1 className="text-secondary p-1">Sign up</h1> : <h1 className="text-secondary p-1">Oops!</h1>
            }
            {
                error
                ?<AlertMessage variant={"two"}>{error}</AlertMessage>
                :<>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" placeholder="name . . ." 
                
                value={data.name}
                onChange={collectUserInfoHandler} 
                />
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="@email . . ." 
                required
                value={data.email}
                onChange={collectUserInfoHandler} 
                />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input type={checkIf?"password":"text"} className="form-control passwordInp" id="password" placeholder="password" 
                  required
                  value={data.password}
                  onChange={collectUserInfoHandler} 
                />
                <label htmlFor="password">Password</label>
                <i className={checkIf?"fas fa-eye-slash eyeIcon":"far fa-eye eyeIcon"} onClick={showPassword} ></i>
            </div>
            <div className="form-floating mb-3">
                <input type={check?"password":"text"} className="form-control passwordInp" id="repeatpassword" placeholder="repeatpassword" 
                required
                value={data.repeatpassword}
                onChange={collectUserInfoHandler} 
                />
                <label htmlFor="repeatpassword">Repeat Password</label>
                <i className={check?"fas fa-eye-slash eyeIcon":"far fa-eye eyeIcon"} onClick={showPassword2} ></i>
            </div>
            <div className="mt-1" onClick={()=>history.push("/auth/restore")}>
                &nbsp; <span className="text-primary forgotPassword">Forgot password? </span>
            </div>
            <div className="d-flex align-items-center justify-content-around mt-3 flex-lg-column">
                <button className="btn btn-primary w-100 mb-1" type="submit">Sign up</button>
                <div className="mb-1">
                   <span className="text-primary">or</span> 
                </div>
                <button className="btn btn-secondary w-100" onClick={()=>{history.push("/auth/login")}}>Back to Login</button>
            </div>
           
            </>
            }
             <div className="toHome icon m-3" onClick={toHome}>
                <i className="fas fa-home"></i>
            </div>
        </form>
    )
}

export default Register
