import axios from 'axios'
import { LOGIN, LOGIN_FAIL, CHANGE_SETTINGS, CHANGE_SETTINGS_FAIL, GET_USER_FAIL, GET_USER, DELETE_ACCOUNT_FAIL, DELETE_ACCOUNT, CHECK_ACCOUNT, CHECK_ACCOUNT_FAIL, CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL } from './../constants/constants'

export const loginAction = (user) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/login`, user)
            dispatch({
                type: LOGIN, payload: data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}


export const registerAction = (user) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/register`, user)
            dispatch({
                type: LOGIN, payload: data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}
export const changeSettings = (id, items) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/changesettings/${id}`, items)
            dispatch({
                type: CHANGE_SETTINGS, payload: data
            })
        } catch (error) {
            dispatch({
                type: CHANGE_SETTINGS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}
export const getUser = (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/getuser/${id}`)
            dispatch({
                type: GET_USER, payload: data
            })
        } catch (error) {
            dispatch({
                type: GET_USER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const deleteAccountAction = (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/deleteaccount/${id}`)
            dispatch({
                type: DELETE_ACCOUNT, payload: data
            })
        } catch (error) {
            dispatch({
                type: DELETE_ACCOUNT_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const restoreAction = (email) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/checkemail`, email)
            dispatch({
                type: CHECK_ACCOUNT, payload: data
            })
        } catch (error) {
            dispatch({
                type: CHECK_ACCOUNT_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const passwordchangeAction = (id, info) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(`https://studentsappbyedgarhovhannisyan.herokuapp.com/api/auth/changepassword/${id}`, info)
            dispatch({
                type: CHANGE_PASSWORD, payload: data
            })
        } catch (error) {
            dispatch({
                type: CHANGE_PASSWORD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}