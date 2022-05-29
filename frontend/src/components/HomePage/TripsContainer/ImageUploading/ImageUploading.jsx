import React from 'react';
import {useRef} from 'react';

function UploadImages() {
    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click();
    };

    return (
        <div className="m-3">
        <label className="mx-3">Choose file: </label>
        <input ref={inputRef} className="d-none" type="file" />
        <button onClick={handleUpload} className="btn btn-outline-primary">
            Upload
        </button>
        </div>
    );
}

export default UploadImages;