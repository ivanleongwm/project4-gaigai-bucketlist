import {Card, Button} from 'react-bootstrap';
import image from '../../../../assets/images/seoul-sakura.jpg'

function TripCard () {
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

export default TripCard;