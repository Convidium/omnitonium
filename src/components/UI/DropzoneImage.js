import { useRef, useState } from "react";
import decodeImage from '../functions/decodeImage.js'

import { ReactComponent as UploadSVG } from '../../svg/upload.svg';
import { ReactComponent as ImageSVG } from '../../svg/image.svg';
import { ReactComponent as LoadingSVG } from '../../svg/loading.svg';
import { ReactComponent as CloseSVG } from '../../svg/close.svg';
import { ReactComponent as ErrorSVG } from '../../svg/error.svg';
import { ReactComponent as ReloadSVG } from '../../svg/reload.svg';

function DropzoneImage({ onDataChange }) {
    const supportedExtensions = ['jpeg', 'png', 'jpg'];
    const [URL, setURL] = useState("");
    const [imageState, setImageState] = useState("none");
    const [dragState, setDragState] = useState(false);
    const inputRef = useRef("");

    const handleSelected = (selectedFile) => {
        try {
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

    const onDragOver = (e) => {
        e.preventDefault();
        setDragState(true);
        e.dataTransfer.dropEffect = "copy";

    }

    const onDragLeave = (e) => {
        e.preventDefault();
        setDragState(false);
        e.dataTransfer.dropEffect = "copy";

    }

    const onDrop = (e) => {
        e.preventDefault();
        setDragState(false);
        const files = e.dataTransfer.files;
        handleSelected(files[0]);
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
        <div className="image-block">
            <div className={"dropzone-block no-select" + (dragState ? " dragging" : " ")}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}>
                <input type='file' id="upload-file-input" name="upload-file-input"
                    onChange={(e) => handleSelected(e.target.files[0])}
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
    )
}

export default DropzoneImage;