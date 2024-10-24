import React, { useRef, useState } from 'react'
import '../../style/addAlbumForm.scss';
import '../../style/ui-elements.scss';
import '../../style/scrollbar.scss';

import { ReactComponent as NextSVG } from '../../svg/next.svg';
import { ReactComponent as AddSVG } from '../../svg/add.svg';
import RecordData from './RecordData.js';
import RecordSongs from './RecordSongs.js';

function AddAlbumForm() {
    const [page, setPage] = useState("one");
    const [recordData, setRecordData] = useState({
        cover: null,
        title: "Unknown",
        artist: "Unknown",
        year: "Unknown",
        label: "Unknown",
        info: "",
        genre: ["Unknown"],
        mood: ["Unknown"],
        songIDs: []
    });

    const handleDataChange = (data, dataType) => {
        switch (dataType) {
            case "title":
                recordData.title = data;
                break;
            case "artist":
                recordData.artist = data;
                break;
            case "year":
                recordData.year = data;
                break;
            case "label":
                recordData.label = data;
                break;
            case "genre-tags":
                recordData.genre = data;
                break;
            case "mood-tags":
                recordData.mood = data;
                break;
            case "info":
                recordData.info = data;
                break;
            case "blob":
                recordData.cover = data;
                break;
            default:
                console.error("Something is wrong with your data");
                break;
        }
    }
    return (
        <div className="relative-height add-record-block navbar-rounded">
            <div className="header f-big">
                <span>Create new record</span>
            </div>
            <hr className="splitting-line" />
            <RecordData onDataChange={handleDataChange}/>
            {/* <RecordSongs/> */}
            <div className='form-btn-block'>
                <button className="btn navigation-btn add-song-btn">
                    <span>Add songs</span>
                    <AddSVG />
                </button>
                <div className='form-change'>
                    <button type='reset' className="btn navigation-btn reset-btn">Cancel</button>
                    <button type='reset' className="btn navigation-btn reset-btn">Reset</button>
                    <button type='submit' className="btn navigation-btn submit-btn">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddAlbumForm;