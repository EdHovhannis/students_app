import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import useWindowDimensions from './../effects/ScreenSize';
import { updateDataAction } from './../../actions/postsAction'

const StudentEdit = ({posts, setIdcheck, idCheck}) => {
    // const {width} = useWindowDimensions()
    // console.log(idCheck)
    const post = posts.find(post=>post._id===idCheck)
   

    const dispatch = useDispatch()
    const [data, setData] = useState({
        firstName: post.firstName,
        lastName: post.lastName,
        faculty: post.faculty,
        course: post.course,
        image: post.image
    })
    const collectDataHandler = (event) => {
        setData({
            ...data, [event.target.id]: event.target.value
        })

    }

    const EditHandler = (event) => {
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
            dispatch(updateDataAction(post._id, data))
            setData({
                firstName: '',
                lastName: '',
                faculty: '',
                course: '',
                image: ''
            })
            setIdcheck(null)
            return

        }

    }
    const cancelHandler = () => {
        setIdcheck(null)
    }
    return (
        <div className="_form-content">
            <form className= "w-100 mx-auto mt-5 p-3" style={{ backgroundColor: "#e3f2fd" }}
                onSubmit={EditHandler}
            >
                <div className="mb-1">
                    <h3 className="text-center"> Edit <span className="badge bg-secondary">items</span></h3>
                </div>
                <div className="mb-1">
                    <label htmlFor="firstName" className="form-label m-1">First Name</label>
                    <input min="2" max="20" type="text" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="First Name . . ."
                         value={data.firstName}
                        required
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="lastName" className="form-label m-1">Last Name</label>
                    <input min="2" max="20" type="text" className="form-control" id="lastName" aria-describedby="emailHelp" 
                        value={data.lastName}
                        required
                        onChange={collectDataHandler}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="faculty" className="form-label m-1">Faculties</label>
                    <select value={data.faculty} className="form-select" aria-label="Default select example" id="faculty" onChange={collectDataHandler}>
                        <option value="facs" disabled>Choose your faculty . . .</option>
                        <option value="Economics">Economics</option>
                        <option value="Information Technologies">Information Technologies</option>
                        <option value="Faculty of Law">Faculty of Law</option>
                        <option value="Fisics">Fisics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Philosophy">Philosophy</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label htmlFor="course" className="form-label m-1">Course</label>
                    <select value={data.course} className="form-select" aria-label="Default select example" id="course" onChange={collectDataHandler}>
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
                         value={data.image}
                        required
                        onChange={collectDataHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary m-1 mt-3">Edit</button>
                <button type="button" className="btn btn-secondary m-1 mt-3"
                    onClick={cancelHandler}
                >Cancel</button>
            </form>
        </div>
    );
}

export default StudentEdit;