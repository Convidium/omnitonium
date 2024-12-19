import React, { useState } from 'react'
import '../../style/addAlbumForm.scss';
import '../../style/ui-elements.scss';
import '../../style/scrollbar.scss';
import { ReactComponent as LoadingSVG } from '../../svg/loading.svg';

import RecordData from './RecordData.js';
import generateID from '../functions/generateID.js';
import uploadFiles from '../functions/uploadFiles.js';


function AddAlbumForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [recordData, setRecordData] = useState({
        name: "Unknown",
        artist: "Unknown",
        genre: ["Unknown"],
        mood: ["Unknown"],
        cover: "",
        label: "Unknown",
        year: "Unknown",
        info: "",
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
        setIsLoading(true);

        const albumID = generateID("a");
        console.log(albumID);
        
        uploadFiles(albumID, recordData);
        setIsLoading(false);
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
        <div className={"relative-height add-record-block navbar-rounded" + (isLoading ? " loading" : "")}>
            <div className="header f-big">
                <span>Create new record</span>
            </div>
            <hr className="splitting-line" />
            <RecordData onDataChange={handleDataChange} />
            {isLoading ? <LoadingSVG className="loading-foreground loading-svg"/> : null}
            <div className='form-btn-block'>
                <div className='form-change'>
                    <button type='reset' className="btn navigation-btn reset-btn">Cancel</button>
                    <button type='submit' className="btn navigation-btn submit-btn" onClick={submitData}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddAlbumForm;