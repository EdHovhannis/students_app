import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../actions/authActions'
import { useDispatch } from 'react-redux';
import SettingsForm from './SettingsForm';

const Settings = (props) => {
    const dispatch = useDispatch()
    const isUser = useSelector(state => state.user.user)

    useEffect(() => {
        if (isUser) { dispatch(getUser(isUser._id)) }
    }, [dispatch, isUser])


    

    const currentUser = useSelector(state => state.currentUser)
    const { user } = currentUser
    return (
        <div className="d-flex flex-wrap align-items-center">
            {
                user === null ? null :
                    <div className="card m-5" style={{ width: "18rem" }}>
                        <img src={user.image} className="card-img-top" alt={user.name} />
                        <div className="card-body">
                            <h5 className="card-title"><span className="text-secondary">Name:</span> {user.name} </h5>
                            <h5 className="card-title"><span className="text-secondary">Last Name:</span> {user.lastName} </h5>
                            <h6 className="card-title"><span className="text-secondary">Email:</span> {user.email} </h6>
                            <h6 className="card-title"><span className="text-secondary">Sex:</span>{user.sex}</h6>
                        </div>
                    </div>
            }

            {
                user === null ? null : <SettingsForm  user={user} props={props}/>
            }
        </div>
    )
}

export default Settings
