import React from 'react';

function UploadImages() {
    return (
        <div className="m-3">
          <label className="mx-3">Choose file: </label>
          <input className="d-none" type="file" />
          <button className="btn btn-outline-primary">Upload</button>
        </div>
      );
}

export default UploadImages;