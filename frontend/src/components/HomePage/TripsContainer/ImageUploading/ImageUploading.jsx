import React from 'react';

function UploadImages() {

    return (
        <div className="m-3">
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <input type="file" name="file" id="file" class="custom-file-input" onChange={(event) => {console.log(event.target.value)}}/>
                    <label for="file" class="custom-file-label">Choose File</label>
                </div>
                <input type="submit" value="Submit" class="btn btn-primary btn-block"/>
            </form>
        </div>
      );
}


export default UploadImages;