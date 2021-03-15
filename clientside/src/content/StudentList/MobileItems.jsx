import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeDataAction } from '../../actions/postsAction'


const MobileItems = ({ post, index, setc, c, setIdcheck }) => {
    const dispatch = useDispatch()
    const removeHandler = () => {
        dispatch(removeDataAction(post._id))
        setc(c+1)
    }
    const editHandler = () => {
        setIdcheck(post._id)
    }
    const userId=useSelector(state=>state.user.user._id)
    return (
        <div className="border mx-auto mt-1 p-1 w-100 " style={{position:"relative"}}>
            <span className="_index_amount"> {index + 1}{")"}</span>&nbsp;
            <h6>
                <span className="text-secondary">First Name:&nbsp;</span>{post.firstName}
                &nbsp;
            </h6>
            <h6>
                <span className="text-secondary">Last Name:&nbsp;</span>{post.lastName}
            </h6>
            <p>
                <span className="text-secondary">Faculty:&nbsp;</span>{post.faculty}
                &nbsp;
                <span className="text-secondary">Course:&nbsp;</span>{post.course}
                { 
                post.author===userId?
                <>
                    <span className="trash_icon mobile_icon_trash" onClick={removeHandler}>
                        <i className="fa fa-trash"></i>
                    </span>
                    <span className="edit_icon mobile_icon_edit" onClick={editHandler}>
                        <i className="fa fa-edit"></i>
                    </span>
                </> : 
                <>
                <span className="trash_icon none mobile_icon_trash" onClick={()=>{return false}}>
                    <i className="fa fa-trash "></i>
                </span>
                <span className="edit_icon none mobile_icon_edit" onClick={()=>{return false}}>
                    <i className="fa fa-edit"></i>
                </span>
                </>
                }
            </p>
        </div>
    );
}

export default MobileItems
