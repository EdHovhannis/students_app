import { GET_DATA_FAIL, GET_DATA_FETCHING, GET_DATA_SUCCESS } from './../constants/constants'


export const getDataReducer = (state = { loading: true, posts: [] }, action) => {
    switch (action.type) {
        case GET_DATA_FETCHING:
            return { loading: true, posts: action.payload }
        case GET_DATA_SUCCESS:
            return {
                loading: false, posts: action.payload
            }
        case GET_DATA_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}