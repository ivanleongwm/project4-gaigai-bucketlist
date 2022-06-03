import React from "react";
import {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import TripCard from './TripCard/TripCard'
import './TripsContainer.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Forum from '../Forum/Forum'
import Highlights from '../Highlights/Highlights'

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

    useEffect(()=>{
        console.log("user trips data fetched",userTrips)
    },[userTrips])

    return (
        <div className="trips-container">
            <Tabs>
                <TabList>
                <Tab>Trips</Tab>
                <Tab>Highlights</Tab>
                <Tab>Forum</Tab>
                </TabList>
                <TabPanel>
                    {
                        userTrips.map((tripDetails, index)=>{
                            return <TripCard key={index} tripDetails={tripDetails}/>
                        })
                    }
                </TabPanel>
                <TabPanel>
                    <Highlights/>
                </TabPanel>
                <TabPanel>
                    <Forum/>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default TripsContainer;