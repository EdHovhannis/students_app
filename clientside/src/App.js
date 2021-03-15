import React, { useState } from 'react'
import Navbar from './navigation/Navbar'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './content/Home/Home';
import StudentsList from './content/StudentList/StudentsList';
import AuthPage from './content/Authorization/AuthPage'
import RegisterStudent from './content/StudentRegister/RegisterStudent';
import { useSelector } from 'react-redux';
import Account from './content/User/Account';
import Allshortpost from './content/Allshortpost/Allshortpost';
import Settings from './content/User/Settings';
import Userdetails from './content/Userdetails/Userdetails';
import Restore from './content/Authorization/Restore';


function App() {

  const [type, setType] = useState("")


  const searchByType = (event) => {
    setType(event.target.value);
  }
  const isUser = useSelector(state => state.user.user)
  return (
    <>
      <Navbar
        searchByType={searchByType}
      />
      <Switch>
        {
          isUser ? <Route path="/settings/:id" component={Settings} /> : null
        }
        <Route path="/userdetails/:id" component={Userdetails} />
        <Route exact path="/" component={Home} />
        <Route path="/registerasastudent">
          <RegisterStudent />
        </Route>
        <Route path="/studentslist">
          <StudentsList type={type} />
        </Route>
        <Route path="/allposts">
          <Allshortpost />
        </Route>
        <Route path="/mypage/:id?" component={Account} />
        <Route path="/auth/restore" component={Restore} />
        {/* <Route path="/auth/newpassword" component={Newpassword} /> */}

        {isUser ? <Redirect to="/" /> : <Route path="/auth" component={AuthPage} />}
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App
