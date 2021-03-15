import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { restoreAction } from '../../actions/authActions';
import { useSelector } from 'react-redux';
import Newpassword from './Newpassword';
import AlertMessage from '../../effects/AlertMessage';
import useWindowDimensions from './../../effects/ScreenSize';

const Restore = (props) => {
    const {width} = useWindowDimensions()
    const dispatch = useDispatch()
    const [mail, setMail] = useState({
        email: ""
    })

    const collectHandler = (event) => {
        setMail({
            ...mail, [event.target.id]: event.target.value
        })
    }

    const RestoreHandler = (event) => {
        event.preventDefault()
        dispatch(restoreAction(mail))
    }

    const check = useSelector(state => state.check)
    const { error, user } = check

    return (
        <>
            {
                user ? <Newpassword user={user} /> : <form className={ width<800? "mx-auto mt-5 w-100 p-3 loginForm": "mx-auto mt-5 w-25 p-3 loginForm"} style={{ backgroundColor: "#e3f2fd" }} onSubmit={RestoreHandler} >

                    {error ? <h2 className="text-secondary p-1">Oops!</h2> : <h2 className="text-secondary p-1">Restore password</h2>}

                    {
                        error ?
                            <div className="form-floating mb-3">
                                <AlertMessage>{error}</AlertMessage>
                            </div> :
                            <div className="form-floating mb-3">
                                <input required type="email" className="form-control" id="email" placeholder="insert your email"
                                    value={mail.email}
                                    onChange={collectHandler}
                                />
                                <label htmlFor="email">Insert your email</label>
                            </div>
                    }
                    {error ? <button className="btn btn-primary w-100" type="button" onClick={() => window.location.reload()} >Try again</button> : <button className="btn btn-primary w-100" type="submit" >Accept</button>}

                    <div className="toHome icon mt-2 me-2" onClick={() => props.history.push("/")}>
                        <i className="fas fa-home"></i>
                    </div>
                </form>
            }
        </>
    )
}

export default Restore
