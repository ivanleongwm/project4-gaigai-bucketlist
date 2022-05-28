import React from "react";
import { Tabs, Tab } from 'react-bootstrap';
import TripCard from './TripCard/TripCard'

function TripsContainer() {
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
            setLoggedInUser(username)
        });
      }    

    return (
        <div className="trips-container">
            <Tabs defaultActiveKey="Solo Trip" id="uncontrolled-tab-example" className="mb-5">
                <Tab eventKey="Solo Trip" title="Solo Trip">
                    <TripCard />
                </Tab>
                <Tab eventKey="Group Trip" title="Group Trip">
                    Hello
                </Tab>
            </Tabs>
        </div>
    )
}

export default TripsContainer;