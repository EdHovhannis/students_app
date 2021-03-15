import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDataAction } from '../../actions/postsAction';

const StudentsItems = ({post, index, setIdcheck, c, setc}) => {
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
        <>
                <tbody>
                    <tr className="text-center">
                        <th scope="row">{index+1}</th>
                        <td>
                            <img src={post.image} alt="" style={{maxWidth:"1.6rem"}}/>
                        </td>
                        <td>{post.firstName}</td>
                        <td>{post.lastName}</td>
                        <td>{post.faculty}</td>
                        <td>{post.course}</td>
                        { post.author===userId?
                             <>
                                <td className="trash_icon" onClick={removeHandler}><i className="fa fa-trash"></i></td>
                                <td className="edit_icon" onClick={editHandler}><i className="fa fa-edit"></i></td>
                             </>
                             :
                             <>
                                <td className="trash_icon none" onClick={()=>{return false}}><i className="fa fa-trash"></i></td>
                                <td className="edit_icon none" onClick={()=>{return false}}><i className="fa fa-edit"></i></td>
                             </>
                        }
                       
                    </tr>
                    
                </tbody>
        </>
    );
}

export default StudentsItems;
