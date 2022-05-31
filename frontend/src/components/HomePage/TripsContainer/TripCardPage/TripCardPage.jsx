import './TripCardPage.css';
import {Card, Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import image from '../../../../assets/images/seoul-sakura.jpg'
import {useParams} from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap';
import UploadImages from '../ImageUploading/ImageUploading';
import InstagramPostCard from './InstagramPost/InstagramPost'
import SingleTripHeader from './SingleTripHeader'
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NecessityCard from './NeccesitiesCard/NecessityCard';

const moment = require('moment');

const things = {
    essentials : {
        "medications" : [1,false],
        "passport" : [1,false],
        "visa" : [1,false],
        "wallet" : [1,false],
        "water bottle" : [1,false]
    },
    accessories : {
        "belt" : [1,false],
        "sunglasses" : [1,false],
        "watch" : [1,false],
        "cap" : [1,false]
    },
    footwear : {
        "hiking shoes" : [1,false],
        "sandals" : [1,false],
        "shoes" : [1,false],
        "socks" : [1,false]
    },
    toiletries : {
        "floss" : [1,false],
        "mouth wash" : [1,false],
        "tooth paste" : [1,false],
        "towel" : [1,false]
    }
}

function TripCardPage () {
    const {id} = useParams();
    const [singleTripData, setSingleTripData] = useState({
        photos:[]
    })
    const [allThingsForTrip, setAllThingsForTrip] = useState(things)
    const [addNewCategory, setAddNewCategory] = useState({"category":""})

    const fetchData = () => {
        const jwt = sessionStorage.getItem("jwt");

        fetch(`/api/trips/get-single-trip-data/${id}`, { 
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
            setSingleTripData(data.singleTripDetail)
            setAllThingsForTrip(data.singleTripNecessities.things)
            console.log("photos array",data.photos)
        });
      }

      const onNeccesitiesChange = (payload) => {
        const jwt = sessionStorage.getItem("jwt");
        fetch(`/api/trips/update-single-trip-data/${id}`, { 
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'token': jwt
            },
            body: JSON.stringify({
                payload})
          })
          .then((res) => {
              return res.json()
          })
          .then((data) => {
              console.log("data",data)
          });
      }
      
    useEffect(() => {
        fetchData()
      },[])

    useEffect(() => {
        console.log("all things master data", allThingsForTrip)
    },[allThingsForTrip])

    const handleChange = (event) => {
        const payload = {...addNewCategory,"category":event.target.value}
        setAddNewCategory(payload);
        onNeccesitiesChange(payload);
    }

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
                    <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        const payload = {...allThingsForTrip,
                            [addNewCategory["category"]]:{"materials":[1,false]}}
                        setAllThingsForTrip(payload)
                        onNeccesitiesChange(payload)
                        }
                    }
                    >
                    <label>
                    Add item:
                    </label>
                    <input
                        name="description"
                        placeholder="description"
                        onChange={(event) => {handleChange(event)}}
                        type="text"
                    />
                    <input type="submit" value="Add" />
                </form>
                        {
                                Object.keys(allThingsForTrip).map(function(key, index) {
                                    return <NecessityCard cardName={key} cardData={allThingsForTrip[key]} allThingsForTrip={allThingsForTrip} setAllThingsForTrip={setAllThingsForTrip}
                                    onNeccesitiesChange={onNeccesitiesChange}/>
                                })
                        }
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                            m: 1,
                            width: 600,
                            height: 250,
                            },
                        }}
                        >
                        <Paper elevation={5}>
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
                        </Paper>
                        </Box>
                        <UploadImages />
                        <InstagramPostCard/>
                    </Col>
                </Row>
            </Container>
        </div> 
    )
}

export default TripCardPage;