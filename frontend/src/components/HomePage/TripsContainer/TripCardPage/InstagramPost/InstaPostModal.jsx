import './InstaPostModal.css'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {useState,useEffect} from 'react';
import UploadImages from '../../ImageUploading/ImageUploading'
import {useParams} from 'react-router-dom'

function InstaPostModal(props) {
    const today = new Date().toISOString().slice(0, 10)
    const {id} = useParams()
    const [postCreateData,setPostCreateData] = useState({
        postTitle : "Happy day at ala restaurant",
        postDate : today,
        postBody: "a wonderous tour of the world",
        //formGridThumbnailUrl : "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        publicPrivate : true
    }); 
    const [userPosts, setUserPosts] = useState({})
    // handle change event
    const handleChange = (e) => {
        e.preventDefault(); // prevent the default action
        setPostCreateData({...postCreateData, [e.target.id]:e.target.value}); // set name to e.target.value (event)
        console.log(postCreateData); 
    };

    //post fetch call to create data in database, on submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/create-post", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token': jwt
          },
          body: JSON.stringify({
              ...postCreateData,
              "username" : username,
              "tripIndex" : id
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
        });
      }    

    const fetchPostsData = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/get-user-posts", { 
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
            console.log("USER POSTS",data)
            setUserPosts(data)
        });
    }

    useEffect(()=>{
        console.log("post details",postCreateData)
        console.log("TRIPINDEX",id)
    },[postCreateData])

    useEffect(()=>{
        fetchPostsData()
    },[])

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Story
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="postTitle">
                <Form.Control 
                    type="text" 
                    placeholder="Title of Post" 
                    value={postCreateData.postTitle} 
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group as={Col} controlId="postDate">
                <Form.Control 
                    type="date" 
                    placeholder="Pick Start Date" 
                    value={postCreateData.postDate} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridLocation">
                <Form.Select defaultValue="Choose Location...">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="postBody">
                <Form.Control 
                    type="textarea" 
                    placeholder="Brief title of trip" 
                    value={postCreateData.postBody} 
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" size="sm" 
                onChange={(event) => {console.log(event.target.value)}}/>
            </Form.Group>
                <Form.Group as={Col} className="mb-3" id="publicPrivate">
                <Form.Check 
                    type="switch" 
                    label="Public Post" 
                    value={postCreateData.publicPrivate} // true false not working
                    onChange={handleChange}
                />
                </Form.Group>
                <UploadImages/>
            <Button variant="primary" type="submit" onClick={(event) => {handleSubmit(event)}}>
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
  
export default InstaPostModal;