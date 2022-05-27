import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {useState, useEffect} from 'react';
import HeaderBar from './components/HeaderBar/HeaderBar'
import LoginForm from './components/Login/Login'
import Secret from './components/secret/secret'

const Home = () => {
  return "Home"
}

const People = () => {
  return "People";
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <BrowserRouter>
    <HeaderBar loggedInUser={loggedInUser}/>
    <LoginForm setLoggedInUser={setLoggedInUser}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="people" element={<People />}></Route>
        <Route path="secret" element={<Secret />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
