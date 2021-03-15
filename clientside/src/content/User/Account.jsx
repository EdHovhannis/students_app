import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser} from '../../actions/authActions';
import AlertMessage from './../../effects/AlertMessage';
import Spinner from '../../effects/Spinner';

import UserInfo from './UserInfo';

const Account = () => {
    const _id = useSelector(state => state.user.user._id)

    const dispatch = useDispatch()

    useEffect(() => {
        if(_id) {dispatch(getUser(_id))}
    }, [_id, dispatch])

    const currentUser = useSelector(state=>state.currentUser)
    const {error, user} = currentUser 

    return (
        <>
        {
            user===null  ? <Spinner/> :
            <div>
            {
                error ?
                    <AlertMessage>{error}</AlertMessage> :
                    user ?
                     <UserInfo user = {user} /> :
                        !user ?
                            <AlertMessage>There is no user</AlertMessage> :
                            null
            }
            </div>
        }
        </>
    )
}

export default Account
