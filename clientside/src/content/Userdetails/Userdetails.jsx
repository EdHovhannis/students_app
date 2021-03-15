import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { userDetailsAction, userPagelikeAction } from '../../actions/shortpostActions'
import Spinner from '../../effects/Spinner'

const Userdetails = (props) => {
  const query = props.location.search.split("=")[1]
  const dispatch = useDispatch()

  useEffect(() => {
    if (query) { dispatch(userDetailsAction(query)) }
  }, [dispatch, query])

  const userDetails = useSelector(state => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    if(user===null) {
      setMas([])
    } else {
      setMas([...user.likes])
    }
  }, [user]);
  
  const [mas, setMas] = useState([])

  const userPageLikeHandler = async () => {
    dispatch(userPagelikeAction(query))

    if(mas.includes(user._id)) {
        setMas(mas.filter(id=>id!==user._id))
    } else {
        setMas([...mas, user._id])
    }
}
  return (
    <>
      {
        user === null ? <Spinner /> :
          <div className="d-flex align-items-center flex-wrap">
            
            <div className=" m-5 mx-auto border border-2 p-5">
              <div className="d-flex">
                <h1 className="card-title m-3">{user.name}</h1>
                <h1 className="card-title m-3">{user.lastName}</h1>
              </div>
                <h5 className="m-3">{user.sex}</h5>
                <h5 className="m-3">{user.email}</h5>
            </div>

            <div className="card m-5 mx-auto" style={{ width: "18rem" }}>
              <img src={user.image} className="card-img-top" alt={user.name} />
              <div className="card-body">
                <div className="like icon text-primary" onClick={userPageLikeHandler}>
                  <i className="far fa-thumbs-up p-1"></i> {mas.length} Like
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Userdetails
