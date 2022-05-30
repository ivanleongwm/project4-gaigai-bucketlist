import React from "react";
import {useState, useEffect} from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import TripCard from './TripCard/TripCard'
import './TripsContainer.css'

function TripsContainer() {
    const [userTrips,setUserTrips] = useState([])

    const fetchTripsData = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/trips/get-user-trips", { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'token':jwt,
            'username': username
          }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
            setUserTrips(data)
        });
      }

    useEffect(()=>{
        fetchTripsData()
        console.log("useeffect run")
    },[]);  

    return (
        <div className="trips-container">
            <Tabs defaultActiveKey="Solo Trip" id="uncontrolled-tab-example" className="mb-5">
                <Tab eventKey="Solo Trip" title="Solo Trip" className="d-inline-flex">
                    {
                        userTrips.map((tripDetails, index)=>{
                            return <TripCard key={index} tripDetails={tripDetails}/>
                        })
                    }
                </Tab>
                <Tab eventKey="Group Trip" title="Group Trip" className="d-inline-flex">
                    Hello
                </Tab>
            </Tabs>
        </div>
    )
}

export default TripsContainer;