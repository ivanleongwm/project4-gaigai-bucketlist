import {Card, Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import image from '../../../../assets/images/seoul-sakura.jpg'
import {useParams} from 'react-router-dom'

function TripCardPage () {
    const {id} = useParams();

    const fetchData = () => {
        const jwt = sessionStorage.getItem("jwt");

        fetch(`/api/trips/${id}`, { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "jwt": jwt
            })
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

    return (
        <div className="trip-card-container">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div> 
    )
}

export default TripCardPage;