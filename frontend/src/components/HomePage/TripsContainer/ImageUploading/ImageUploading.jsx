import React from 'react';
import {useRef, useState} from 'react';

function UploadImages() {
    const [uploadedFileName, setUploadedFileName] = useState(null);

    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click();
    };

    const handleDisplayFileDetails = () => {
        inputRef.current?.files &&
        setUploadedFileName(inputRef.current.files[0].name);
    };

    return (
        <div className="m-3">
          <label className="mx-3">Choose file:</label>
          <input
            ref={inputRef}
            onChange={handleDisplayFileDetails}
            className="d-none"
            type="file"
          />
          <button
            onClick={handleUpload}
            className={`btn btn-outline-${
              uploadedFileName ? "success" : "primary"
            }`}
          >
            {uploadedFileName ? uploadedFileName : "Upload"}
          </button>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <input type="file" name="file" id="file" class="custom-file-input"/>
                    <label for="file" class="custom-file-label">Choose File</label>
                </div>
                <input type="submit" value="Submit" class="btn btn-primary btn-block"/>
            </form>
        </div>
      );
}


export default UploadImages;