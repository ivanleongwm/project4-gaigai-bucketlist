import {Card} from 'react-bootstrap';
import './ForumCard.css'
import CommentBox from './CommentBox'

function ForumCard({postData,stateChange, setStateChange}) {
    
    return (
        <div className="forum-card">
            <Card>
                <Card.Body>
                <Card.Text>
                    {postData.location + " | " + postData.postDate.slice(0,10) + " | " + postData.postTitle + ":" + postData.postBody}
                </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={'https://project4-gaigai-bucketlist.herokuapp.com/image/' + postData.file} />
            </Card>
            <CommentBox postData={postData} stateChange={stateChange} setStateChange={setStateChange}/>
            
        </div>
    )
}

export default ForumCard;