import React, { useState, useEffect } from 'react'
import useWindowDimensions from '../../effects/ScreenSize'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createDataAction, getDataAction } from '../../actions/postsAction'
import Spinner from '../../effects/Spinner';
import AlertMessage from '../../effects/AlertMessage'

const RegisterStudent = () => {
    const history = useHistory()
    if (history.location.pathname === "/registerasastudent") {
        document.querySelector("title").innerHTML = "Sign up as a student."
    }
    const { width } = useWindowDimensions()

    const dispatch = useDispatch()
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        faculty: '',
        course: '',
        image: ''
    })
    const collectDataHandler = (event) => {
        setData({
            ...data, [event.target.id]: event.target.value
        })

    }

    const AcceptHandler = (event) => {
        event.preventDefault()
        let letters = /^[A-Za-z]+$/
        let txt = data.firstName+data.lastName
        if(!txt.match(letters)) {
            alert("First name and Last name must be letters.")
            setData({
                firstName: '',
                lastName: '',
                faculty: '',
                course: '',
                image: ''
            })
            return
        }
        else {
            dispatch(createDataAction(data))
            history.push("/studentslist")
            setData({
                firstName: '',
                lastName: '',
                faculty: '',
                course: '',
                image: ''
            })
            return
        }

    }
    useEffect(() => {
        dispatch(getDataAction())
    }, [dispatch])

    const userId = useSelector(state=>state.user.user._id)
    const author = useSelector(state=>state.posts) 
    const {loading, error, posts} = author
    return (
        <div className="_form-content">
            {
                loading ? <Spinner /> : error ? <AlertMessage variant="two"> {error} </AlertMessage> : posts.findIndex(post=>post.author===userId) > -1 ? <AlertMessage variant="tree"> You've already registered as a student. You can only change it or remove it from <NavLink to="/studentslist">Students-list</NavLink> page. </AlertMessage> :
                <form className={width < 1000 ? "w-75 mx-auto mt-3 p-3" : "w-25 mx-auto mt-5 p-3"} style={{ backgroundColor: "#e3f2fd" }}
                onSubmit={AcceptHandler}
            >
                <div className="mb-1">
                    <h3 className="text-center"> Sign up as a <span className="badge bg-secondary">Student</span></h3>
                </div>
                <div className="mb-1">
                    <label htmlFor="firstName" className="form-label m-1">First Name</label>
                    <input min="2" max="20" type="text" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="First Name . . ."
                        value = {data.firstName}
                        required
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="lastName" className="form-label m-1">Last Name</label>
                    <input min="2" max="20" type="text" className="form-control" id="lastName" aria-describedby="emailHelp" placeholder="Last Name . . ."
                        value = {data.lastName}
                        required
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="faculty" className="form-label m-1">Faculties</label>
                    <select defaultValue="facs"  className="form-select" aria-label="Default select example" id="faculty" onChange={collectDataHandler}>
                        <option value="facs" disabled>Choose your faculty . . .</option>
                        <option value="Economics">Economics</option>
                        <option value="Information Technologies">Information Technologies</option>
                        <option value="Faculty of Law">Faculty of Law</option>
                        <option value="Fisics">Fisics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Linguistics">Linguistics</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label htmlFor="course" className="form-label m-1">Course</label>
                    <select defaultValue="0"  className="form-select" aria-label="Default select example" id="course" onChange={collectDataHandler}>
                        <option value="0" disabled>Choose your course . . .</option>
                        <option value="1">&#8544;</option>
                        <option value="2">&#8545;</option>
                        <option value="3">&#8546;</option>
                        <option value="4">&#8547;</option>
                        <option value="Magister">Magister</option>
                        <option value="Graduated">Graduated from university</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label htmlFor="image" className="form-label m-1">Image URL</label>
                    <input min="2" max="20" type="text" className="form-control" id="image" aria-describedby="emailHelp" placeholder="Image URL . . ."
                        required
                        value={data.image}
                        onChange={collectDataHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary m-1 mt-3">Accept</button>
            </form>
            }
            
        </div>
    );
}

export default RegisterStudent
