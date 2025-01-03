import React, { useState } from 'react'
import AddAlbumForm from '../addRecord/addAlbum/AddAlbumForm.js';
import AddSong from '../addRecord/addSong/AddSong.js';
import TopMesageModal from '../modalBlockTemp/TopMessageModal.js';

function AddRecord() {
    const [onAddSongState, setAddSongState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [message, setMessage] = useState("");
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

    const handleEvent = (change, data) => {
        switch (change) {
            case "add-song-modal":
                setAddSongState(true);
                break;
            case "remove-song-modal":
                setAddSongState(false);
                break;
            case "add-song-sucsess":
                console.log("sucsess");
                break;
            case "add-song-failed":
                setErrorState(true);
                setMessage(data);
                break;
            default:
                break;
        }

    }
    return (
        <>
            <AddAlbumForm onDataChange={handleDataChange} handleEvent={handleEvent} />
            {onAddSongState ? <AddSong handleEvent={handleEvent} albumData={recordData} /> : null}
            {errorState ? <TopMesageModal isError={errorState} message={message} handleClose={() => setErrorState(false)} /> : null}
        </>
    )
}

export default AddRecord;