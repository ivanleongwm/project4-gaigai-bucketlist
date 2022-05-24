import React from "react";
import { Form , Button, Row , Col} from "react-bootstrap"
import { useState, useEffect } from "react";


function LoginForm() {

    const handleLogin = (event) => {
        console.log(event)
        event.preventDefault();
        const jwt = sessionStorage.getItem("jwt")
        fetch("/api/posts", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token':jwt
          },
          body: JSON.stringify({
              jwt: jwt
            })
         })
        .then((res) => {
            console.log("response line",res)
            return res.json()
        })
        .then((data) => {
            console.log("jwt data",data.jwt)
            sessionStorage.setItem("jwt", data.jwt)
        });
      }    

    return (
        <div>This is a secret page
            <Button variant="primary" type="submit" onClick={(event) => {handleLogin(event)}}>
                    POST
                </Button>
        </div>
    )
}

export default LoginForm;