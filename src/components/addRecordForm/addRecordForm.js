import React, { useState } from 'react'
import TopMesageModal from '../modalBlockTemp/TopMessageModal.js';
import generateID from '../functions/generateID.js';

import Navbar from "./navbarForm.js";
import NavigationButtons from "./navigationButtons.js";
import RecordInfo from "./addRecordInfo.js";
import RecordSongs from "./addRecordSongs.js";
import AddSong from "./addSong.js";
import "../../style/Form/addRecordForm.scss";
import DropzoneImage from '../UI/DropzoneImage.js';

function AddRecord() {
    const [topMessageState, setTopMessageState] = useState(false);
    const [message, setMessage] = useState("");
    const generatedAlbumID = generateID("a");
    localStorage.setItem("newAlbumID", generatedAlbumID);

    const [recordData, setRecordData] = useState({
        title: "",
        artist: "",
        genre: [],
        mood: [],
        cover: "",
        label: "",
        year: "",
        info: "",
        songIDs: [],
        albumID: generatedAlbumID
    });

    const handleDataChange = (data, dataType) => {
        try {
            recordData[dataType] = data;
        } catch (error) {
            console.error("Something is wrong with your data: ", error);
        }
    }

    const addSongID = (newSongID) => {
        setRecordData(prevState => ({
            ...prevState, // Spread the existing state
            songIDs: [...prevState.songIDs, newSongID] // Create a new array with the added ID
        }));
    };

    const handleEvent = (change, data, trackID) => {
        switch (change) {
            case "add-song-success":
                setTopMessageState(true);
                setMessage(data);
                addSongID(trackID);
                break;
            case "add-song-failed":
                setTopMessageState(true); 
                setMessage(data);
                break;
            default:
                break;
        }
        console.log(recordData);
        
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
                        <div className='step-title'>Upload the cover of the record:</div>
                        <DropzoneImage onDataChange={(data) => handleDataChange(data, "cover")} initialData={recordData.cover} />
                    </>
                )
            case 2:
                return (
                    <>
                        <div className='step-title'>Add information about the record</div>
                        <RecordInfo handleDataChange={handleDataChange} initialData={recordData} />
                    </>
                )
            case 3:
                return (
                    <>
                        <div className='step-title'>Add songs to the record</div>
                        <div className='add-songs-block'>
                            <AddSong handleEvent={handleEvent} recordData={recordData} />
                            <RecordSongs recordData={recordData} />
                        </div>
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
            <Navbar onStepChange={onStepChange} currentStep={currentStep} />
            <div className='form-content'>
                <CurrentStepElement />
            </div>
            <NavigationButtons onStepChange={onStepChange} currentStep={currentStep} />
            {/* <AddAlbumForm onDataChange={handleDataChange} handleEvent={handleEvent} /> */}
            {topMessageState ? <TopMesageModal isError={topMessageState} message={message} handleClose={() => setTopMessageState(false)} /> : null}
        </div>
    )
}

export default AddRecord;