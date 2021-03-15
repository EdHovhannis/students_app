import React from 'react'
import { useSelector } from 'react-redux'
import AlertMessage from '../../effects/AlertMessage'
import MobileItems from './MobileItems'
import Loader from './../../effects/Spinner';

const MobileScreen = ({c, setc, setIdcheck, type}) => {
    const postsKeys = useSelector(state => state.posts)
    const { loading, posts, error } = postsKeys
    
    return (
        <>
            {
                loading ? <Loader /> : error ? <AlertMessage>{error}</AlertMessage>:
                posts.filter(val=>val.firstName.toLowerCase().indexOf(type.toLowerCase())>=0).map((post, index)=>{
                    return <MobileItems key={index} post={post} index={index} c={c} setc={setc} setIdcheck={setIdcheck}/>
                })
            }
        </>
    )
}

export default MobileScreen
