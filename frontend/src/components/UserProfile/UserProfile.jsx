import React from "react";
import { Row, Col, Container, Button, ListGroup } from 'react-bootstrap';
import './UserProfile.css'
import {useState, useEffect} from 'react'

function UserProfile() {
    const [profileDetails, setProfileDetails] = useState({
            username: '',
            email: '',
            password: ''
    })

    const fetchUserProfileData = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/users/get-user-profile-info", { 
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
            console.log("USER PROFILE DATA",data)
            setProfileDetails(data.userDetails[0])
        });
      }

      useEffect(()=>{
        fetchUserProfileData()
      },[])

    return (
        <div className="user-profile-container">
            <Container>
                <Row>
                    <Col sm={4}>
                    <div className="banner-image-container">
                            <div id="parallelogram">
                                
                                <div className="image">
                                    <div className="black-filter">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="user-profile-details">
                            <br/>
                            <h1>User Profile</h1>
                            <br/>
                        <ListGroup>
                            <ListGroup.Item>{'Username: ' + profileDetails.username}</ListGroup.Item>
                            <ListGroup.Item>{'Email: ' + profileDetails.email}</ListGroup.Item>
                            <ListGroup.Item>{'Password: ' + profileDetails.password}</ListGroup.Item>
                        </ListGroup>
                        <br/>
                        <Button variant="danger">Delete User</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
                
    )
}

export default UserProfile;