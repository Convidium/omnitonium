import React, { useState } from 'react'
import '../../style/addAlbumForm.scss';
import '../../style/ui-elements.scss';
import '../../style/scrollbar.scss';

import { ReactComponent as AddSVG } from '../../svg/next.svg';
import RecordSongs from '../addSong/RecordSongs.js';

function AddAlbumForm() {
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
        <RecordSongs onDataChange={handleDataChange}/>
    )
}

export default AddAlbumForm;