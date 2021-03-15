import { SHORTPOST_CREATE_DATA, SHORTPOST_UPDATE_DATA, SHORTPOST_UPDATE_DATA_FAIL, SHORTPOST_CREATE_DATA_FAIL, SHORTPOST_GET_DATA, SHORTPOST_GET_DATA_FAIL, SHORTPOST_GET_DATA_SUCCESS, SHORTPOST_REMOVE_DATA, SHORTPOST_REMOVE_DATA_FAIL, LIKE_UPDATE_DATA, LIKE_UPDATE_DATA_FAIL, UPDATE_CREATER_NAME, UPDATE_CREATER_NAME_FAIL, USERDETAILS, USERDETAILS_FAIL, LIKE_USER, LIKE_USER_FAIL } from './../constants/constants';
import axios from 'axios'

export const getshortPost = () => {
    return async (dispatch, getState) => {
            dispatch({type: SHORTPOST_GET_DATA})
        try {
            const token = getState().user.user.token
            const {data} = await axios.get('https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/getdatashortpost',  { headers: { logined: `Bearer ${token}` }})
            dispatch({ type: SHORTPOST_GET_DATA_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: SHORTPOST_GET_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}

export const createshortPost = (shortpost) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user.token
            const {data} = await axios.post('https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/createdatashortpost', shortpost, { headers: { logined: `Bearer ${token}` }})
            dispatch({ type: SHORTPOST_CREATE_DATA, payload: data })
        } catch (error) {
            dispatch({ type: SHORTPOST_CREATE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}
export const removeshortAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/removedatashortpost/${id}`, id, { headers: { logined: `Bearer ${token}` }})
            dispatch({ type: SHORTPOST_REMOVE_DATA, payload: data })
        } catch (error) {
            dispatch({ type: SHORTPOST_REMOVE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}
export const updateshortAction = (id, items) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/updatedatashortpost/${id}`, items, { headers: { logined: `Bearer ${token}` }})
            dispatch({ type: SHORTPOST_UPDATE_DATA, payload: data })
        } catch (error) {
            dispatch({ type: SHORTPOST_UPDATE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}

export const likeshortAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/likedatashortpost/${id}`, null, { headers: { logined: `Bearer ${token}` }})
            dispatch({ type: LIKE_UPDATE_DATA, payload: data })
        } catch (error) {
            dispatch({ type: LIKE_UPDATE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}
export const updateCreatedBy = (id, newName) => {
    return async (dispatch, getState) => {
        try {
           console.log(newName);
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/updatecreatedby/${id}`, newName, { headers: { logined: `Bearer ${token}` }})
            dispatch({ type: UPDATE_CREATER_NAME, payload: data })
        } catch (error) {
            dispatch({ type: UPDATE_CREATER_NAME_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}
export const userDetailsAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user.token
            const {data} = await axios.get(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/userdetails/${id}`, { headers: { logined: `Bearer ${token}` }})
           
            dispatch({ type: USERDETAILS, payload: data })
        } catch (error) {
            dispatch({ type: USERDETAILS_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}

export const userPagelikeAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/shortpost/userdetailslike/${id}`, null, { headers: { logined: `Bearer ${token}` }})
           
            dispatch({ type: LIKE_USER, payload: data })
        } catch (error) {
            dispatch({ type: LIKE_USER_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
}