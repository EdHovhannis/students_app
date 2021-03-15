import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk";
import { getUserReducer } from "./reducers/allUsers";
import { changepasswordReducer, checkuserReducer, loginReducer } from "./reducers/authReducer";
import { getDataReducer } from "./reducers/postsReducer";
import { shortpostReducer, userDetails } from './reducers/shortpostsReducer';



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
    user: { user: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null }
}

const reducer = combineReducers({
    posts: getDataReducer,
    user: loginReducer,
    shortpost: shortpostReducer,
    currentUser: getUserReducer,
    userDetails: userDetails,
    check: checkuserReducer,
    changed: changepasswordReducer
})


const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store
