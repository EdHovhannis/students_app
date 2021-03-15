import React, { useState } from 'react';
import { changeSettings, deleteAccountAction } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { updateCreatedBy } from '../../actions/shortpostActions';
import { LOGOUT } from '../../constants/constants';

const SettingsForm = ({ props, user }) => {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: user.email,
        image: user.image,
        lastName: user.lastName,
        name: user.name,
        sex: user.sex
    })

    const collectDataHandler = (event) => {
        setData({
            ...data, [event.target.id]: event.target.value
        })

    }

    const changeSettingsHandler = (event) => {
        event.preventDefault()
        dispatch(changeSettings(props.match.params.id, data))
        dispatch(updateCreatedBy(props.match.params.id, { createdBy: data.name }))
        props.history.push("/")
    }
    const deleteAccount = () => {
        dispatch(deleteAccountAction(user._id))
        dispatch({type: LOGOUT})
        localStorage.removeItem("checkkey")
        JSON.stringify(localStorage.setItem("checkkey", false))
    }

    return (
        <>
            <form className="w-50 m-5 mx-auto" onSubmit={changeSettingsHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input required type="email" className="form-control" id="email"
                        value={data.email}
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-3">
                    <label min="2" required htmlFor="name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="name"
                        value={data.name}
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input min="2" type="text" className="form-control" id="lastName"
                        value={data.lastName}
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">Sex</label>
                    <select className="form-select" id="sex" defaultValue="sex" onChange={collectDataHandler}>
                        <option value="sex" disabled>sex</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image"
                        value={data.image}
                        onChange={collectDataHandler}
                    />
                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-primary m-1">Change Settings</button>
                    <button type="button" className="btn btn-danger m-1" onClick={deleteAccount}>Delete Account</button>
                </div>
            </form>
        </>
    );
}

export default SettingsForm
