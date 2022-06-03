function Comment({comment}) {
    
    return (
        <div className="comment-container">
            <li class="media">
                        <a href="#" class="pull-left">
                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" class="img-circle"/>
                        </a>
                        <div class="media-body">
                            <span class="text-muted pull-right">
                                <small class="text-muted">30 min ago</small>
                            </span>
                            <strong class="text-success">{'@' + comment.username}</strong>
                            <p>
                                {comment.remark}
                            </p>
                        </div>
                    </li>
        </div>       
    )
}

export default Comment;