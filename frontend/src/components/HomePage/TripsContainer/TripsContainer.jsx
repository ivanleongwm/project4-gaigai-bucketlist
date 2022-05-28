import React from "react";
import { Tabs, Tab } from 'react-bootstrap';
import TripCard from './TripCard/TripCard'

function TripsContainer() {
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