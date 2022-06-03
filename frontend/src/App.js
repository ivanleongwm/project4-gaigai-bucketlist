import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {useState} from 'react';
import HeaderBar from './components/HeaderBar/HeaderBar'
import LoginForm from './components/Login/Login'
import Home from './components/HomePage/Home'
import "bootstrap/dist/css/bootstrap.min.css";
import TripCardPage from './components/HomePage/TripsContainer/TripCardPage/TripCardPage'
import LoggedOutPage from './components/LoggedOutPage/LoggedOutPage'
import UserProfile from './components/UserProfile/UserProfile'
import SignUp from './components/SignUp/SignUp'

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const username = sessionStorage.getItem("username");

  return (
    <BrowserRouter>
    <HeaderBar loggedInUser={loggedInUser}/>
    <Routes>
        {
          username ?
          <>
          <Route path="/" element={<Home />}></Route>
          <Route path="trips/:id" element={<TripCardPage/>}></Route>
          <Route path="user-profile" element={<UserProfile/>}></Route>
          </>
          : 
          <>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/*" element={<LoggedOutPage/>}></Route>
          </>
          
        }
        <Route path="login" element={<LoginForm setLoggedInUser={setLoggedInUser}/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
//<Route path="intro" element={<LoggedOutPage/>}></Route>

export default App;
