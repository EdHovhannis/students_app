import { CHECK_ACCOUNT, CHECK_ACCOUNT_FAIL, LOGIN, LOGIN_FAIL, LOGOUT, CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL } from './../constants/constants'

export const loginReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload }))
            return { user: { ...action.payload } }
        case LOGOUT:
            localStorage.removeItem("profile")
            return { user: null }
        case LOGIN_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}

export const checkuserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case CHECK_ACCOUNT:
            return { user: action.payload }
        case CHECK_ACCOUNT_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}
export const changepasswordReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD:
            return { user: action.payload }
        case CHANGE_PASSWORD_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}
