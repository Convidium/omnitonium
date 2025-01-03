import { useRef, useState } from "react";
import decodeSong from '../functions/decodeSong.js'
import MiniPlayer from '../UI/MiniPlayer.js';

import { ReactComponent as UploadSVG } from '../../svg/upload.svg';
import { ReactComponent as LoadingSVG } from '../../svg/loading.svg';
import { ReactComponent as ErrorSVG } from '../../svg/error.svg';
import { ReactComponent as ReloadSVG } from '../../svg/reload.svg';

function DropzoneSong({ handleAudiofile, albumData }) {
    const supportedExtensions = ['mp3', 'flac', 'ogg', "wav"];
    const [URL, setURL] = useState("");
    const [songState, setSongState] = useState("none");
    const [dragState, setDragState] = useState(false);
    const inputRef = useRef("");

    const handleSelected = (selectedFile) => {
        try {
            const selectedFileName = selectedFile.name.split('.').at(-1);
            if (supportedExtensions.includes(selectedFileName)) {
                renderImage(selectedFile, selectedFileName);
            } else {
                throw new TypeError("unsupported extention");
            }

        } catch (error) {
            setSongState("error");
        }
    }

    const renderImage = (selectedFile, selectedFileName) => {
        const reader = new FileReader();
        setSongState("loading");

        reader.addEventListener("load", () => {
            const decodedSong = decodeSong(reader.result, `audio/${selectedFileName}`);
            setURL(reader.result);
            handleAudiofile(reader.result);
            setSongState("loaded");
        });
        reader.readAsDataURL(selectedFile);
    }

    const upload = () => {
        document.getElementById("upload-audio-input").click();
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
        setSongState("none");
        setURL("");
        handleAudiofile("");
    }

    const SongPreview = () => {
        switch (songState) {
            case "none":
                return (
                    <div className={"dropzone-block validable no-select" + (dragState ? " dragging" : " ")}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}>
                        <input type='file' id="upload-audio-input" name="upload-file-input"
                            onChange={(e) => handleSelected(e.target.files[0])}
                            ref={inputRef} />
                        <UploadSVG onClick={upload} />
                        <span onClick={upload}>Drop record file here</span>
                        <button
                            className="btn upload-btn f-reg"
                            onClick={upload}>
                            Upload
                        </button>
                    </div>
                )
            case "loading":
                return (
                    <div className='mini-player-current'>
                        <LoadingSVG className="loading-svg" />
                        <span>Loading...</span>
                    </div>
                )
            case "loaded":
                return (
                    <MiniPlayer songData={URL} albumData={albumData} onDelete={reload} />
                )
            case "error":
                return (
                    <div className='mini-player-current'>
                        <ErrorSVG />
                        <span>Something went wrong. Please try again</span>
                        <button className="btn close-btn" onClick={reload}><ReloadSVG /></button>
                    </div>
                )
        }
    }

    return (
        <div className="song-block double-part">
            <div className="song-player-block no-select">
                <SongPreview />
            </div>
        </div>
    )
}

export default DropzoneSong;