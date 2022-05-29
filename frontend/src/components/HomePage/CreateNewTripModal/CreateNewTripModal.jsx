import './CreateNewTripModal.css'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" placeholder="Pick Start Date" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" placeholder="Pick End Date" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridLocation">
                <Form.Label>Location</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridActivityTitle">
                <Form.Label>Activity Title</Form.Label>
                <Form.Control placeholder="Brief title of trip" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Brief Description of To Dos</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Thumbnail Url</Form.Label>
                <Form.Control/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                <Form.Check type="switch" label="Public Post" />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default MyVerticallyCenteredModal;