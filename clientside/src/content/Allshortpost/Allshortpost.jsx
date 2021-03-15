import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getshortPost } from './../../actions/shortpostActions';
import Spinner from '../../effects/Spinner';
import AlertMessage from './../../effects/AlertMessage';
import Allitems from './Allitems';
import { getUser } from '../../actions/authActions';

const Allshortpost = () => {
    const dispatch = useDispatch()
    const [u, setu] = useState(0)

    const isUser = useSelector(state => state.user.user)
    useEffect(() => {
        if(isUser){ 
            dispatch(getshortPost())
            dispatch(getUser(isUser._id))
        }
      }, [u, dispatch, isUser])

      const allPosts = useSelector(state=>state.shortpost)
      const currentUser = useSelector(state=>state.currentUser)
      const {user} = currentUser

     
      const {loading, error, shortpost} = allPosts


    return (
        <div>
            <h3 className="text-secondary mt-3 mb-3 text-center">All posts</h3>
            {
                loading ? <Spinner /> : error ? <AlertMessage>{error} </AlertMessage> : shortpost.length===0 ? <AlertMessage> There is no post yet. </AlertMessage>: shortpost.map((short, index)=> user===null?null:<Allitems key={index} short={short} shortpost={shortpost} setu={setu} u={u} user={user}/> )
            }
        </div>
    );
}

export default Allshortpost
