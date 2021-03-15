import React from 'react'
import { useHistory } from 'react-router'
import Login from './Login'
import Register from './Register'
import Restore from './Restore';

const AuthPage = () => {
    const history = useHistory()
    const path = history.location.pathname

    return (
        <div>
            {path === "/auth" && <Login />}
            {path === "/auth/login" && <Login />}
            {path === "/auth/register" && <Register />}
            {path === "/auth/restore" && <Restore />}
        </div>
    );
}

export default AuthPage
