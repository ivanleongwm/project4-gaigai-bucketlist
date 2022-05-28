import React from "react";
import { Row, Col, Container } from 'react-bootstrap';

import TripsContainer from './TripsContainer/TripsContainer'

import './Home.css'

function Home() {
    return (
        <div className="homepage-container">
            <Container>
                <Row>
                    <Col sm={4}>1 of 2</Col>
                    <Col sm={8}>
                        <TripsContainer/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;