import './TripCardPage.css';
import {Card, Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import image from '../../../../assets/images/seoul-sakura.jpg'
import {useParams} from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap';
import UploadImages from '../ImageUploading/ImageUploading';

const moment = require('moment');

function TripCardPage () {
    const {id} = useParams();
    const [singleTripData, setSingleTripData] = useState({
        photos:[]
    })

    const fetchData = () => {
        const jwt = sessionStorage.getItem("jwt");

        fetch(`/api/trips/${id}`, { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'token': jwt
          }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
            setSingleTripData(data)
            console.log("photos array",data.photos)
        });
      }    

    useEffect(() => {
        fetchData()
      },[])

    return (
        <div className="single-trip-card-container">
            <Container className="vh-100 d-flex flex-column">
                <Row className="h-100">
                    <Col sm={4}>
                    <div class="banner-image-container">
                        <div id="parallelogram">
                            <div class="image"></div>
                        </div>
                    </div>
                    </Col>
                    <Col sm={8}>
                        <div>Trip Index: {singleTripData.tripIndex}</div>
                        <div>Location: {singleTripData.location}</div>
                        <div>Start Date: {moment(singleTripData.startDate).format('DD-MM-YYYY')}</div>
                        <div>End Date: {moment(singleTripData.endDate).format('DD-MM-YYYY')}</div>
                        <div>Activity: {singleTripData.activity}</div>
                        {
                            singleTripData.photos.map((photo)=> {
                                return (
                                    <img className="trip-images" src={photo}/>
                                )
                            })
                        }
                        <div>Public tag: {singleTripData.public}</div>
                        <UploadImages />
                    </Col>
                </Row>
            </Container>
        </div> 
    )
}

export default TripCardPage;