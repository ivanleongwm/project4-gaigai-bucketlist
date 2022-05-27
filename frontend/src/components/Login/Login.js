import React from "react";
import { Form , Button, Row , Col} from "react-bootstrap"
import { useState, useEffect } from "react";


function LoginForm({setLoggedInUser}) {
    const [username, setUsername] = useState("Michael");
    const [password, setPassword] = useState("123456");

    const handleLogin = (event) => {
        event.preventDefault();
        const login = { username, password };
    
        fetch("/api/users/login", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username, 
              password: password})
<<<<<<< HEAD
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data.jwt)
            sessionStorage.setItem("jwt", data.jwt);
            setLoggedInUser(username)
=======
      })
        .then((res) => {
            console.log("response line",res)
            return res.json()
        })
        .then((data) => {
            console.log("jwt data",data.jwt)
            sessionStorage.setItem("jwt", data.jwt)
>>>>>>> a77be52c2b76cd42ef213a59b9a6e75df863a6c9
        });
      }    

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => setUsername(event.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(event) => {handleLogin(event)}}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default LoginForm;