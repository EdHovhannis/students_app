import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createshortPost } from '../../actions/shortpostActions'
import { useSelector } from 'react-redux'
import Spinner from '../../effects/Spinner'
import AlertMessage from './../../effects/AlertMessage';
import Shortpost from './Shortpost'
import { getshortPost } from './../../actions/shortpostActions';
import useWindowDimensions from '../../effects/ScreenSize';
import { useHistory } from 'react-router-dom';

const UserInfo = ({ user }) => {
    const {width} = useWindowDimensions()
    const dispatch = useDispatch()
    const [x, setx] = useState(true)
    const [k, setk] = useState(0)
    const history=useHistory()
    const [text, setText] = useState({
        shortpost: ""
    })
    const collectTextHandle = (event) => {
        setText({ ...text, [event.target.id]: event.target.value })
    }
    const CreateHandler = () => {
        setx(false)
        setText({
            shortpost: ""
        })
    }
    const AcceptCreateHandler = () => {
        if (text.shortpost === "") {
            alert("Text Area is empty. Type something. ") 
        } else {
                dispatch(createshortPost(text))
                setx(true)
                setText({
                    shortpost: ""
                })
                setk(k+1)
        }
    }
    useEffect(() => {
      dispatch(getshortPost())
    }, [k, dispatch])

    const shortPostItems = useSelector(state => state.shortpost)
    const { loading, error, shortpost } = shortPostItems
    return (
        <div>
            <h3 className="mt-1 text-center text-secondary border p-3 w-100">My Account</h3>
            <div className="d-flex align-items-start justify-content-between flex-wrap">

                <div className={width<=800?"card m-3 flex-grow-3 mx-auto":"card m-3 flex-grow-3"} >
                    <div className="card-body">
                        <img style={{ width: "18rem" }} src={user.image} alt={user.name} />
                        <h5 className="card-title">{user.name}</h5>
                        <h5 className="card-title">{user.lastName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{user.sex}</h6>
                        <h6 className="card-subtitle mb-2 text-dark">likes:&nbsp;<span className="text-primary">{user.likes.length}</span></h6>
                        <div className="d-flex flex-column w-100">
                            {
                                x ? <button className="btn btn-primary mb-1" onClick={CreateHandler}>Create Post</button>
                                    : <>
                                        <button className="btn btn-primary mb-1" onClick={AcceptCreateHandler}>Accept</button>
                                        <button className="btn btn-secondary mb-1" onClick={() => { setx(true) }}>Cancel</button>
                                    </>

                            }
                            {
                                !x ? <textarea max="100" name="shortpost" id="shortpost" cols="30" rows="5"
                                        value={text.shortpost}
                                        onChange={collectTextHandle}
                                    ></textarea>
                                    : <>
                                        <button className="btn btn-info mb-1" onClick={()=>{history.push(`/settings/${user._id}`)}}>Settings</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="m-3 w-25 flex-grow-1 border p-3">
               
                {
                    loading ? 
                    <div className="m-3 flex-grow-1">
                        <Spinner />
                    </div> : 
                    error ? 
                    <AlertMessage variant="two"> {error} </AlertMessage> : 
                    shortpost.length===0 ? 
                    <AlertMessage> There is no post. </AlertMessage> : 
                    <>
                    <h1 className="text-secondary w-75 mx-auto p-1">My posts</h1>
                    { shortpost.filter(item=>item.creater===user._id).length===0?<AlertMessage> You have no post yet. </AlertMessage> : shortpost.filter(item=>item.creater===user._id).map((short, index)=> <Shortpost key={JSON.stringify(short)+index} short={short} setk={setk} k={k} shortpost={shortpost} user={user}/>)} 
                    </>
                }
                </div>
            </div>
        </div>
    );
}

export default UserInfo
