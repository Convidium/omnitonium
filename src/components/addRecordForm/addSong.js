import React, { useEffect, useRef, useState } from 'react'
import '../../style/Form/addSong.scss';

import { ReactComponent as UploadSVG } from '../../svg/upload.svg';
import DropzoneSong from '../UI/DropzoneSong.js';
import uploadTrack from '../functions/uploadTrack.js';
import generateID from "../functions/generateID.js";

function AddSong({ handleEvent, recordData }) {
    const trackID = generateID("t");
    const [songName, setSongName] = useState("");
    const [audiofile, setAudiofile] = useState("");
    const [audiofileExists, setAudiofileExists] = useState(false);
    const [songNameExists, setSongNameExists] = useState(false);

    const songNameRef = useRef(null);
    const writerRef = useRef(null);
    const composerRef = useRef(null);
    const infoRef = useRef(null);

    const handleValidation = (e) => {
        const element = e.target;
        if (element.value == "") {
            element.parentNode.classList.add("red");
            setSongNameExists(false);
        } else {
            element.parentNode.classList.remove("red");
            setSongNameExists(true);
            setSongName(element.value);
        }
    }

    const handleAudiofile = (audiofile) => {
        if (audiofile === "") {
            setAudiofileExists(false);
            setAudiofile(audiofile);
        } else {
            setAudiofileExists(true);
            setAudiofile(audiofile);
        }
    };

    // Function that handles input data and uploads it to the server, and uploads audiofile to database directory
    const handleSubmit = async () => {
        if (audiofileExists && songNameExists) {
            const trackProps = [audiofile, songName, writerRef.current.value, composerRef.current.value, infoRef.current.value, recordData.albumID, trackID];
            await uploadTrack(trackProps, handleEvent);
        }
        else if (songNameExists) {
            handleEvent("add-song-failed", { messageType: "error", songName: songName });
        }
        else {
            handleEvent("add-song-failed", { messageType: "error", songName: "This Song" });
        }
    }

    const resetInfo = () => {
        setSongName("");
        setAudiofile("");
        setSongNameExists(false);
        setAudiofileExists(false);
        songNameRef.current.value = "";
        writerRef.current.value = "";
        composerRef.current.value = "";
        infoRef.current.value = "";
    }

    return (
        <div className='song-properties-block'>
            <div className='song-properties'>
                <div className='overflow-y grid'>
                    <div className='input-block double-part'>
                        <span>Song name*:</span>
                        <input placeholder='Name' className='add-input' onBlur={handleValidation} ref={songNameRef} />
                    </div>
                    <div className='input-block single-part'>
                        <span>Writer:</span>
                        <input placeholder='Author' className='add-input' ref={writerRef} />
                    </div>
                    <div className='input-block single-part'>
                        <span>Composed by:</span>
                        <input placeholder='Composer' className='add-input' ref={composerRef} />
                    </div>
                    <div className='input-block textarea-block double-part'>
                        <span>Song info:</span>
                        <textarea
                            placeholder="Write anything related to the the song, so others can read it, while they're listening to it"
                            className='add-input' ref={infoRef} />
                    </div>
                </div>
                <DropzoneSong handleAudiofile={handleAudiofile} albumData={recordData} audiofileExists={audiofileExists} />
            </div>
            <div className='form-btn-block'>
                <button type='reset' className="btn reset-btn" onClick={resetInfo}>Reset</button>
                <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default AddSong;