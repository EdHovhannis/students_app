import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { likeshortAction, removeshortAction } from './../../actions/shortpostActions';
import { updateshortAction } from './../../actions/shortpostActions';

const Shortpost = ({ short, setk, k, shortpost, user }) => {
    const dispatch = useDispatch()

    // const [like, setLike] = useState(short.likes.length)
    const copy = [...short.likes]
    const [mas, setMas] = useState(copy)

    const [bool, setBool] = useState(true)
    const [data, setData] = useState({
        shortpost: ""
    })

    const deleteShortPostHandler = () => {
        dispatch(removeshortAction(short._id))
        setk(k+1) 
    }
    const populateHandler = () => {
        setData({...data, shortpost: shortpost.find(thatshort=>thatshort._id===short._id).shortpost})
        setBool(false) 
    }
    const collectEditDataHandler = (event) => {
        setData({
            ...data, shortpost : event.target.value
        })
    }
    const updateHandler = () => {
        dispatch(updateshortAction(short._id, data))
        setk(k+1)
        setBool(true)
    }
    const likeHandler = async () => {
        dispatch(likeshortAction(short._id))

        if(mas.includes(user._id)) {
            setMas(mas.filter(id=>id!==user._id))
        } else {
            setMas([...mas, user._id])
        }
    }
    
    return (
        <>
            <div className="card bg-info text-light mt-1">
                <div className="card-body">
                   {!bool ? <input type="text" className='shortpost_edit_input' onChange={collectEditDataHandler} value={data.shortpost} /> : short.shortpost}
                </div>
                <div className="d-flex align-items-center shortpost_icons">
                    <div onClick={deleteShortPostHandler}>
                        <i className="fa fa-trash text-danger m-1 p-1"></i>
                    </div>
                    <div onClick = { bool ? populateHandler : updateHandler }>
                        <i className={bool? "fa fa-edit text-success m-1 p-1" : "fas fa-check text-success m-1 p-1"}></i>
                    </div>
                    <div onClick={likeHandler} className="like icon">
                        <i className="far fa-thumbs-up text-dark m-1 p-1"></i>&nbsp; <span>{mas.length}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shortpost


