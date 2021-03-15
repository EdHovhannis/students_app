import axios from 'axios'
import { GET_DATA_FAIL, GET_DATA_FETCHING, GET_DATA_SUCCESS, CREATE_DATA, CREATE_DATA_SUCCESS, CREATE_DATA_FAIL, UPDATE_DATA, UPDATE_DATA_SUCCESS, UPDATE_DATA_FAIL, REMOVE_DATA, REMOVE_DATA_SUCCESS, REMOVE_DATA_FAIL } from './../constants/constants'


export const getDataAction = () => {
    return async dispatch => {
        dispatch({type: GET_DATA_FETCHING})
        try {
            const {data} = await axios.get('https://studentsappbyedgarhovhannisyan.herokuapp.com/api/posts/getdata')
            dispatch({type: GET_DATA_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: GET_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
    
}
export const createDataAction = (posts) => {
    return async (dispatch, getState) => {
            dispatch({type: CREATE_DATA})
        try {
            const token = getState().user.user.token
            const {data} = await axios.post('https://studentsappbyedgarhovhannisyan.herokuapp.com/api/posts/createdata', posts, { headers: { logined: `Bearer ${token}` }})
            dispatch({type: CREATE_DATA_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: CREATE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
    
}
export const updateDataAction = (id, items) => {
    return async (dispatch, getState) => {
            dispatch({type: UPDATE_DATA})
        try {
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/posts/updatedata/${id}`, items, { headers: { logined: `Bearer ${token}` }})
            dispatch({type: UPDATE_DATA_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: UPDATE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
    
}
export const removeDataAction = (id) => {
    return async (dispatch, getState) => {
            dispatch({type: REMOVE_DATA})
        try {
            const token = getState().user.user.token
            const {data} = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/posts/removedata/${id}`, null, { headers: { logined: `Bearer ${token}` }})
            dispatch({type: REMOVE_DATA_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: REMOVE_DATA_FAIL, payload: error.response&&error.response.data.message ? error.response.data.message : error.message })
        }
    }
    
}