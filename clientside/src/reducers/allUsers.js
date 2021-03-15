import { GET_USER, GET_USER_FAIL } from "../constants/constants";


export const getUserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case GET_USER:
            // localStorage.setItem("currentUser", JSON.stringify({...action?.payload}))
            return { user: { ...action.payload } }
        case GET_USER_FAIL:
            return { error: action.payload}
        default:
            return state;
    }
}