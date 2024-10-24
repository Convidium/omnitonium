import React, { useEffect, useRef, useState } from 'react'
import decodeImage from '../functions/decodeImage.js'
import '../../style/recordData.scss';

import { ReactComponent as UploadSVG } from '../../svg/upload.svg';
import { ReactComponent as ImageSVG } from '../../svg/image.svg';
import { ReactComponent as LoadingSVG } from '../../svg/loading.svg';
import { ReactComponent as CloseSVG } from '../../svg/close.svg';
import { ReactComponent as ErrorSVG } from '../../svg/error.svg';
import { ReactComponent as ReloadSVG } from '../../svg/reload.svg';
import TagsInput from '../UI/TagsInput.js';

function RecordData({ onDataChange }) {
    const supportedExtensions = ['jpeg', 'png', 'jpg'];
    const [URL, setURL] = useState("");
    const [imageState, setImageState] = useState("none");
    const inputRef = useRef("");

    const handleDataChange = (data, dataType) => {
        onDataChange(data, dataType);                                         // Updating Data
    };

    const handleGenreChange = (data) => {
        onDataChange(data, "genre-tags");                                         // Updating Data
    };

    const handleMoodChange = (data) => {
        onDataChange(data, "mood-tags");                                         // Updating Data
    };

    const handleSelected = (event) => {
        try {
            const selectedFile = event.target.files[0];
            const selectedFileName = selectedFile.name.split('.').at(-1);
            if (supportedExtensions.includes(selectedFileName)) {
                renderImage(selectedFile);
            } else {
                throw new TypeError("unsupported extention");
            }
        } catch (error) {
            setImageState("error");
        }
    }

    const renderImage = (selectedFile) => {
        const reader = new FileReader();
        setImageState("loading");

        reader.addEventListener("load", () => {
            const decodedImage = decodeImage(reader.result, 'image/png');
            onDataChange(decodedImage, "blob");                                     // Updating Data

            setURL(reader.result);
            setImageState("loaded");
        });
        reader.readAsDataURL(selectedFile);
    }

    const upload = () => {
        document.getElementById("upload-file-input").click();
    }

    const reload = () => {
        setImageState("none");
        setURL("");
        inputRef.current.value = "";
        onDataChange(null, "blob");                                                 // Updating Data
    }

    const ImagePreview = () => {
        switch (imageState) {
            case "none":
                return (
                    <div className='cover no-cover-preview'>
                        <ImageSVG />
                        <span>Image will appear here</span>
                    </div>
                )
            case "loading":
                return (
                    <div className='cover loading-cover-preview'>
                        <LoadingSVG className="loading-svg" />
                        <span>Loading...</span>
                    </div>
                )
            case "loaded":
                return (
                    <div className='cover-image'>
                        <button className="btn close-btn" onClick={reload}><CloseSVG /></button>
                        <img src={URL} className='cover' />
                    </div>
                )
            case "error":
                return (
                    <div className='cover error-cover'>
                        <ErrorSVG />
                        <span>Something went wrong. Please try again</span>
                        <button className="btn close-btn" onClick={reload}><ReloadSVG /></button>
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <div className='record-data-block'>
            <div className="image-block">
                <div className="dropzone-block no-select">
                    <input type='file' id="upload-file-input" name="upload-file-input"
                        onChange={(e) => handleSelected(e)}
                        ref={inputRef} />
                    <UploadSVG onClick={upload} />
                    <span onClick={upload}>Drop record cover here</span>
                    <button
                        className="btn upload-btn f-reg"
                        onClick={upload}>
                        Upload
                    </button>
                </div>
                <div className="cover-block no-select">
                    <ImagePreview />
                </div>
            </div>
            <hr className="splitting-line" />
            <div className="content-addition">
                <div className='input-block single-part'>
                    <span>Record:</span>
                    <input placeholder='Record' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "title")} />
                </div>
                <div className='input-block single-part'>
                    <span>Artist:</span>
                    <input placeholder='Artist' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "artist")} />
                </div>
                <div className='input-block single-part'>
                    <span>Year:</span>
                    <input placeholder='Year' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "year")} />
                </div>
                <div className='input-block single-part'>
                    <span>Label:</span>
                    <input placeholder='Label' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "label")} />
                </div>
                <div className='input-block double-part'>
                    <span>Genre:</span>
                    <TagsInput onTagsChange={handleGenreChange} />
                </div>
                <div className='input-block double-part'>
                    <span>Mood:</span>
                    <TagsInput onTagsChange={handleMoodChange} />
                </div>
                <div className='input-block textarea-block double-part'>
                    <span>Record info:</span>
                    <textarea placeholder="Write anything related to the record, so others can read it, while they're listening to it" className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "info")} />
                </div>
            </div>
        </div>
    )
}
export default RecordData