import React, { useState } from 'react'
import AddAlbumForm from './addAlbum/AddAlbumForm.js';
import AddSong from './addSong/AddSong.js';
import TopMesageModal from '../modalBlockTemp/TopMessageModal.js';
import generateID from '../functions/generateID.js';

import Navbar from "./navbarForm.js";
import NavigationButtons from "./navigationButtons.js";
import "../../style/Form/addRecordForm.scss";
import DropzoneImage from '../UI/DropzoneImage.js';

function AddRecord() {
    const [onAddSongState, setAddSongState] = useState(false);
    const [topMessageState, setTopMessageState] = useState(false);
    const [message, setMessage] = useState("");
    const generatedAlbumID = generateID("a");
    localStorage.setItem("newAlbumID", generatedAlbumID);

    const [recordData, setRecordData] = useState({
        name: "Unknown",
        artist: "Unknown",
        genre: ["Unknown"],
        mood: ["Unknown"],
        cover: "",
        label: "Unknown",
        year: "Unknown",
        info: "",
        songIDs: [],
        albumID: generatedAlbumID
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

    const handleEvent = (change, data, state) => {
        switch (change) {
            case "add-song-modal":
                setAddSongState(true);
                break;
            case "add-song-success":
                setTopMessageState(true);
                setMessage(data);
                break;
            case "remove-song-modal":
                setAddSongState(false);
                break;
            case "add-song-failed":
                setTopMessageState(true);
                setMessage(data);
                break;
            default:
                break;
        }
    }

    const [currentStep, setCurrentStep] = useState(1);
    const onStepChange = (newStep) => {
        if (newStep > 0 && newStep <= 3) {
            setCurrentStep(newStep);
        }

    }

    const CurrentStepElement = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className='step-title'>Upload the cover of the album:</div>
                        <DropzoneImage onDataChange={(data) => handleDataChange(data, "blob")} initialData={recordData.cover} />
                    </>
                )
            default:
                return (
                    <div>Hello</div>
                )
        }
    }
    return (
        <div className="relative-height navbar-rounded form-wrapper">
            <Navbar currentStep={currentStep} />
            <div className='form-content'>
                <CurrentStepElement />
            </div>
            <NavigationButtons onStepChange={onStepChange} currentStep={currentStep} />
            {/* <AddAlbumForm onDataChange={handleDataChange} handleEvent={handleEvent} /> */}
            {/* {onAddSongState ? <AddSong handleEvent={handleEvent} albumData={recordData} /> : null}
            {topMessageState ? <TopMesageModal isError={topMessageState} message={message} handleClose={() => setTopMessageState(false)} /> : null} */}
        </div>
    )
}

export default AddRecord;