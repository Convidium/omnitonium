import React, { useRef, useState } from 'react'
import '../../../style/addSong.scss';

import { ReactComponent as UploadSVG } from '../../../svg/upload.svg';
import DropzoneSong from '../../UI/DropzoneSong.js';

function AddSong({ handleEvent, albumData }) {
    const [songName, setSongName] = useState("");
    const [audiofile, setAudiofile] = useState("");
    const [audiofileExists, setAudiofileExists] = useState(false);
    const [songNameExists, setSongNameExists] = useState(false);

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

    const handleSubmit = () => {
        if (audiofileExists && songNameExists) {
            try {
                // function that will add song to database and then return the ID here
            } catch (error) {
                handleEvent("add-song-failed", songName);
            }
            // Sucsess Message
            handleEvent("add-song-sucsess", songName);
        }
        
        // Fail Message
        if (songNameExists) {
            handleEvent("add-song-failed", songName);
        } else {
            handleEvent("add-song-failed", "This song");
        }
    }
    return (
        <div className='relative-height navbar-rounded song-properties-block'>
            <div className='double-part'>
                <div className="header f-big">
                    <span>Create new song</span>
                </div>
                <hr className="splitting-line" />
            </div>
            <div className='song-properties'>
                <div className='overflow-y grid'>
                    <div className='input-block double-part'>
                        <span>Song name*:</span>
                        <input placeholder='Name' className='add-input' onBlur={handleValidation} />
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
                        <textarea placeholder="Write anything related to the the song, so others can read it, while they're listening to it" className='add-input' ref={infoRef} />
                    </div>
                    <DropzoneSong handleAudiofile={handleAudiofile} albumData={albumData} />
                </div>
            </div>
            <div className='form-btn-block'>
                <button type='reset' className="btn carousel-control navigation-btn reset-btn" onClick={() => handleEvent("remove-song-modal")}>Cancel</button>
                <button type='submit' className="btn carousel-control navigation-btn submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default AddSong;