import {   SHORTPOST_GET_DATA, SHORTPOST_GET_DATA_SUCCESS, SHORTPOST_GET_DATA_FAIL, USERDETAILS_FAIL, USERDETAILS } from './../constants/constants';


export const shortpostReducer = (state={loading: true, shortpost:[]}, action) => {
    switch (action.type) {
        case SHORTPOST_GET_DATA:
            return {
                loading: true
            }
        case SHORTPOST_GET_DATA_SUCCESS:
            return {
                loading: false, shortpost: action.payload
            }
        case SHORTPOST_GET_DATA_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const userDetails = (state = { user: null }, action) => {
    switch (action.type) {
        case USERDETAILS:
            return { user: { ...action.payload } }
        case USERDETAILS_FAIL:
            return { error: action.payload}
        default:
            return state;
    }
}