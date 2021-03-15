import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { passwordchangeAction } from './../../actions/authActions';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import AlertMessage from '../../effects/AlertMessage';
import useWindowDimensions from './../../effects/ScreenSize';

const Newpassword = ({ user }) => {
    const {width} = useWindowDimensions()
    const dispatch = useDispatch()
    const [newpass, setNewpass] = useState({
        newpassword: ""
    })
    const collectHandler = (event) => {
        setNewpass({
            ...newpass, [event.target.id]: event.target.value
        })
    }

    let history = useHistory()
    const acceptpasswordHandler = (event) => {
        event.preventDefault()
        dispatch(passwordchangeAction(user._id, newpass))
    }
    const changed = useSelector(state => state.changed)

    const [checkIf, setCheckif] = useState(true)

    const showPassword = () => {
        setCheckif(!checkIf)
    }
    useEffect(() => {
        if (changed.user) {
            history.push('/auth/login')
        }
    }, [changed.user, history]);

    return (
        <form  className={ width<800? "mx-auto mt-5 w-100 p-3 loginForm": "mx-auto mt-5 w-25 p-3 loginForm"} style={{ backgroundColor: "#e3f2fd" }} onSubmit={acceptpasswordHandler} >
            {changed.error ? <h3 className="text-secondary p-1">Oops!</h3> : <h3 className="text-secondary p-1">Type new password</h3>}
            {changed.error ?
                <div className="form-floating mb-3">
                    <AlertMessage>{changed.error}</AlertMessage>
                </div> :
                <div className="form-floating mb-3">
                    <input min="6" required type={checkIf?"password":"text"} className="form-control passwordInp" id="newpassword" placeholder="insert new password"
                        value={newpass.newpassword}
                        onChange={collectHandler}
                    />
                    <label htmlFor="newpassword">Insert your password</label>
                    <i className={checkIf?"fas fa-eye-slash eyeIcon":"far fa-eye eyeIcon"} onClick={showPassword} ></i>
                </div>}
            {changed.error ? <button className="btn btn-primary w-100" type="button" onClick={() => window.location.reload()}>Try again</button> : <button className="btn btn-primary w-100" type="submit">Change password</button>}
        </form>
    );
}

export default Newpassword
