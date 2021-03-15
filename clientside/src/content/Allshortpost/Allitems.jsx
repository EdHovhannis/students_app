import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeshortAction, removeshortAction, updateshortAction } from '../../actions/shortpostActions'
import { useHistory } from 'react-router';


const Allitems = ({ short, shortpost, u, setu, user }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const copy = [...short.likes]
    const [mas, setMas] = useState(copy)

    const likeHandler = async () => {
        dispatch(likeshortAction(short._id))

        if (mas.includes(user._id)) {
            setMas(mas.filter(id => id !== user._id))
        } else {
            setMas([...mas, user._id])
        }
    }

    const deleteShortPostHandler = () => {
        dispatch(removeshortAction(short._id))
        setu(u+1) 
    }

    const [bool, setBool] = useState(true)
    const [data, setData] = useState({
        shortpost: ""
    })
    const populateHandler = () => {
        setData({ ...data, shortpost: shortpost.find(thatshort => thatshort._id === short._id).shortpost })
        setBool(false)
    }
    const collectEditDataHandler = (event) => {
        setData({
            ...data, shortpost: event.target.value
        })
    }
    const updateHandler = () => {
        dispatch(updateshortAction(short._id, data))
        setu(u+1)
        setBool(true)
    }
    return (
        <>
            <div className="card w-75 mx-auto m-1 bg-light">
                <div>
                    <h6 className="mt-1 ms-1"><span className="text-secondary">Post by</span> {user._id === short.creater ?<span className="touserdetails" onClick={()=>history.push(`/mypage/${user.name}/${user._id}`)}>&nbsp;{"You"}</span>:<span className="touserdetails" onClick={()=>history.push(`/userdetails/${short.createdBy}?query=${short.creater}`)}>&nbsp;{short.createdBy}</span> }  </h6>
                </div>
                <div className="card-body ">
                    {!bool ? <input type="text" className='shortpost_edit_input border border-dark' onChange={collectEditDataHandler} value={data.shortpost} /> : short.shortpost}
                </div>
                {
                    user._id === short.creater ?
                        <div className="d-flex align-items-center">
                            <div className="trash_icon" onClick={deleteShortPostHandler}>
                                <i className="fa fa-trash p-1"></i>
                            </div>
                            <div className="edit_icon" onClick={bool ? populateHandler : updateHandler}>
                                <i className={bool ? "fa fa-edit text-success m-1 p-1" : "fas fa-check text-success m-1 p-1"}></i>
                            </div>
                            <div className="like icon text-primary" onClick={likeHandler}>
                                <i className="far fa-thumbs-up p-1"></i> <span> {mas.length} </span>
                            </div>
                        </div> :
                        <div className="d-flex align-items-center">
                            <div className="trash_icon none">
                                <i className="fa fa-trash p-1"></i>
                            </div>
                            <div className="edit_icon none">
                                <i className="fa fa-edit p-1"></i>
                            </div>
                            <div className="like icon text-primary" onClick={likeHandler}>
                                <i className="far fa-thumbs-up p-1"></i> <span> {mas.length} </span>
                            </div>
                        </div>
                }

            </div>
        </>
    );
}

export default Allitems;
