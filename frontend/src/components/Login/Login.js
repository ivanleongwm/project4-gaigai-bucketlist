import React from "react";
import { Form , Button, Row , Col} from "react-bootstrap"
import { useState, useEffect } from "react";


function LoginForm() {
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
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data.jwt)
            sessionStorage.setItem("jwt", data.jwt);
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