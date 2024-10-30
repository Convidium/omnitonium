import React, { useRef, useState } from 'react'
import '../../style/addSongForm.scss';
import '../../style/addSongForm.scss';

import { ReactComponent as UploadSVG } from '../../svg/upload.svg';

function RecordSongs({ visibility }) {
    const [dragState, setDragState] = useState(false);
    const inputRef = useRef("");

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
        // handleSelected(files[0]);
    }

    return (
        // <span>Add Songs</span>
        <div className={'song-properties-block ' + visibility}>
            <div className='input-block double-part'>
                <span>Song name:</span>
                <input placeholder='Name' className='add-input' />
            </div>
            <div className='input-block single-part'>
                <span>Writer:</span>
                <input placeholder='Author' className='add-input' />
            </div>
            <div className='input-block single-part'>
                <span>Composed by:</span>
                <input placeholder='Composer' className='add-input' />
            </div>
            <div className='input-block textarea-block double-part'>
                <span>Song info:</span>
                <textarea placeholder="Write anything related to the the song, so others can read it, while they're listening to it" className='add-input' />
            </div>
            <div className='input-block textarea-block double-part'>
                <span>Song info:</span>
                <textarea placeholder="Write anything related to the the song, so others can read it, while they're listening to it" className='add-input' />
            </div>
            {/* <div className={"dropzone-block no-select" + (dragState ? " dragging" : " ")}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}>
                <input type='file' id="upload-file-input" name="upload-file-input"
                    onChange={(e) => console.log(e.target.files[0])}
                    ref={inputRef} />
                <UploadSVG onClick={upload} />
                <span onClick={upload}>Drop record cover here</span>
                <button
                    className="btn upload-btn f-reg"
                    onClick={upload}>
                    Upload
                </button>
            </div> */}
        </div>
    )
}
export default RecordSongs