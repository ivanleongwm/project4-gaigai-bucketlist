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

const People = () => {
  return "People";
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <BrowserRouter>
    <HeaderBar loggedInUser={loggedInUser}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<LoginForm setLoggedInUser={setLoggedInUser}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
