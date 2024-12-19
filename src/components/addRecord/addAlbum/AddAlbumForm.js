import React, { useEffect, useRef, useState } from 'react'
import '../../../style/addAlbumForm.scss';
import '../../../style/ui-elements.scss';
import '../../../style/scrollbar.scss';
import { ReactComponent as LoadingSVG } from '../../../svg/loading.svg';

import RecordData from './RecordData.js';
import RecordSongs from './RecordSongs.js';
import generateID from '../../functions/generateID.js';
import uploadFiles from '../../functions/uploadFiles.js';


function AddAlbumForm({ onDataChange, handleEvent }) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const trackRef = useRef(null);

    useEffect(() => {
        updateCarousel();
        window.addEventListener("resize", updateCarousel);

        return () => window.removeEventListener("resize", updateCarousel);
    }, [currentPage]);

    const updateCarousel = () => {
        const track = trackRef.current;
        const width = 600;
        track.style.transform = `translateX(-${currentPage * width}px)`;
    };

    const handleNext = () => {
        setCurrentPage((prevIndex) => (prevIndex + 1) % 2);
    };

    const handlePrev = () => {
        setCurrentPage((prevIndex) => (prevIndex - 1 + 2) % 2);
    };

    const submitData = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const albumID = generateID("a");
        onDataChange(albumID, "submit_data");
        setIsLoading(false);
    }

    const PageTitle = () => {
        switch (currentPage) {
            case 0:
                return <span>Create new record</span>
            case 1:
                return <span>Add songs</span>
            default:
                return <span>Create new record</span>
        }
    }

    const PageControls = () => {
        switch (currentPage) {
            case 0:
                return <>
                    <button type='reset' className="btn carousel-control navigation-btn reset-btn">Cancel</button>
                    <button type='submit' className="btn carousel-control navigation-btn submit-btn" onClick={handleNext}>Continue</button>
                </>
            case 1:
                return <>
                    <button type='reset' className="btn carousel-control navigation-btn reset-btn" onClick={handlePrev}>Back</button>
                    <button type='submit' className="btn carousel-control navigation-btn submit-btn" onClick={submitData}>Sumbit</button>
                </>
        }
    }

    return (
        <div className={"relative-height add-record-block navbar-rounded" + (isLoading ? " loading" : "")}>
            <div className="header f-big">
                <PageTitle />
            </div>
            <hr className="splitting-line" />
            <div className='carousel'>
                <div className='carousel-track' ref={trackRef}>
                    <div className={`carousel-item ${currentPage == 0 ? "active" : ""}`}>
                        <RecordData onDataChange={onDataChange} />
                    </div>
                    <div className={`carousel-item ${currentPage == 1 ? "active" : ""}`}>
                        <RecordSongs handleEvent={handleEvent} />
                    </div>
                </div>
            </div>
            {isLoading ? <LoadingSVG className="loading-foreground loading-svg" /> : null}
            <div className='form-btn-block'>
                <div className='form-change'>
                    <div className="carousel-controls">
                        <PageControls />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAlbumForm;