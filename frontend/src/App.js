import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HeaderBar from './components/HeaderBar/HeaderBar'
import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  return "Home"
}

const Login = () => {
  const handleLogin = () => {
    fetch("/api/login", { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: "Michael", password: "123456"})
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
  }

  return <button onClick={handleLogin}>Login</button>;
}



const People = () => {
  return "People";
}

function App() {
  return (
    <BrowserRouter>
    <HeaderBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="people" element={<People />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
