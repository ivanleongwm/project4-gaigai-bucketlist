import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HeaderBar from './components/HeaderBar/HeaderBar'
import LoginForm from './components/Login/Login'
import Secret from './components/Secret/Secret'

import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  return "Home"
}

const People = () => {
  return "People";
}

function App() {
  return (
    <BrowserRouter>
    <HeaderBar />
    <LoginForm />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="people" element={<People />}></Route>
        <Route path="secret" element={<Secret />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
