import React from "react";
import { Row, Col, Container } from 'react-bootstrap';

import TripsContainer from './TripsContainer/TripsContainer'

import './Home.css'

function Home() {
    return (
        <div className="homepage-container">
            <Container>
                <Row>
                    <Col sm={4}>
                        <div className="banner-image-container">
                            <div id="parallelogram">
                                
                                <div className="image">
                                    <div className="black-filter">
                                        <h2>Trips</h2>
                                        <a className="create-new-trip-button" href="">
                                            CREATE NEW TRIP
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <TripsContainer/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;