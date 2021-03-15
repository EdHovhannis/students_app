import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getDataAction } from '../../actions/postsAction'
import StudentsItems from './StudentsItems'
import Spinner from '../../effects/Spinner'
import AlertMessage from '../../effects/AlertMessage';
import { useHistory } from 'react-router-dom';
import StudentEdit from './StudentEdit'
import useWindowDimensions from '../../effects/ScreenSize'
import MobileScreen from './MobileScreen'

const StudentsList = ({ type }) => {
    const { width } = useWindowDimensions()

    let history = useHistory()
    if (history.location.pathname === "/studentslist") {
        document.querySelector("title").innerHTML = "Student list"
    }

    const [idCheck, setIdcheck] = useState(null)
    const [c, setc] = useState(0)


    const dispatch = useDispatch()

    const postsKeys = useSelector(state => state.posts)
    const { loading, posts, error } = postsKeys

    useEffect(() => {
        dispatch(getDataAction())

    }, [c, idCheck, dispatch])


    return (
        <div className={idCheck === null ? null : "d-flex align-items-center justify-content-around flex-wrap"} >
            {width <= 800 ? <MobileScreen c={c} setc={setc} setIdcheck={setIdcheck} type={type} /> : null}
            <div className={width <= 800 ? "mobile_display" : null}>
                <h1 className="m-3 text-center border-bottom">Students' list</h1>
                {
                    loading
                        ? <Spinner />
                        : error
                            ? <AlertMessage> {error} </AlertMessage>
                            : posts.length === 0 ? <AlertMessage>There is no Student in students register ! <span className="registerasastudent" onClick={() => history.push("/registerasastudent")}> sign in as Student?</span> </AlertMessage> : <table className={idCheck === null ? "table w-75 mx-auto mt-3" : "table w-100 mx-auto mt-3"}>

                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">Amount</th>
                                        <th scope="col">Logo</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Faculty</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">Delete</th>
                                        <th scope="col">Edit</th>

                                    </tr>
                                </thead>
                                { posts.filter(val=>val.firstName.toLowerCase().indexOf(type.toLowerCase())>=0).map((post, i) => { return <StudentsItems key={i} post={post} index={i} setIdcheck={setIdcheck} c={c} setc={setc} /> })   }
                             
                                <tbody>
                                    <tr className="text-center">
                                        <th scope="row"> <span className="text-secondary"> { posts.filter(val=>val.firstName.toLowerCase().indexOf(type.toLowerCase())>=0).map((post, i) => { return <StudentsItems key={i} post={post} index={i} setIdcheck={setIdcheck} c={c} setc={setc} /> }).length} from: {posts.length} </span></th>
                                    </tr>
                                </tbody>
                            </table>
                }
            </div>
            {
                idCheck === null ? null : <div>
                    {
                        loading ? <Spinner /> : error ? <AlertMessage> {error} </AlertMessage> : <StudentEdit posts={posts} idCheck={idCheck} setIdcheck={setIdcheck} />
                    }
                </div>
            }
        </div>
    )
}

export default StudentsList


// state.filter((val)=>{
//     return val.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
//   }).map((item, index)=> {
//     return (
//       <div key={index}>{item.name}</div>
//     )
//   })


//  {/*Filter by Course*/}
