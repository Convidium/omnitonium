import React, { useState } from 'react'
import '../../style/addAlbumForm.scss';
import '../../style/ui-elements.scss';
import '../../style/scrollbar.scss';

import { ReactComponent as AddSVG } from '../../svg/next.svg';
import RecordData from './RecordData.js';
import RecordSongs from './RecordSongs.js';

function AddAlbumForm() {
    const [page, setPage] = useState([1, 0]);
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

    const submitData = (e) => {
        e.preventDefault();
    }

    const pageState = () => {
        switch (pageState) {
            case 0:
                
                break;
        
            default:
                break;
        }
    }

    return (
        <div className="relative-height add-record-block navbar-rounded">
            <div className="header f-big">
                <span>Create new record</span>
            </div>
            <hr className="splitting-line" />
            <RecordData onDataChange={handleDataChange} visibility={page[0] == 0 ? "hidden" : "visible"}/>
            <RecordSongs visibility={page[1] == 0 ? "hidden" : "visible"} />
            <div className='form-btn-block'>
                <div className='form-navigation flex'>
                    <button className="btn navigation-btn prev-next-btn prev" onClick={() => setPage([1, 0])}>
                        <AddSVG className="rotate-180"/>
                        <span>Prev</span>
                    </button>
                    <div>{page.indexOf(1) + 1}/2</div>
                    <button className="btn navigation-btn prev-next-btn next" onClick={() => setPage([0, 1])}>
                        <span>Next</span>
                        <AddSVG />
                    </button>
                </div>
                <div className='form-change'>
                    <button type='reset' className="btn navigation-btn reset-btn">Cancel</button>
                    <button type='submit' className="btn navigation-btn submit-btn">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddAlbumForm;