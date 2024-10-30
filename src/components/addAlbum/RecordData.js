import React, { useEffect, useRef, useState } from 'react'

import '../../style/recordData.scss';
import TagsInput from '../UI/TagsInput.js';
import DropzoneImage from '../UI/DropzoneImage.js';

function RecordData({ onDataChange, visibility }) {

    const handleDataChange = (data, dataType) => {
        onDataChange(data, dataType);                                         // Updating Data
    };

    const handleGenreChange = (data) => {
        onDataChange(data, "genre-tags");                                         // Updating Data
    };

    const handleMoodChange = (data) => {
        onDataChange(data, "mood-tags");                                         // Updating Data
    };

    return (
        <div className={'record-data-block ' + visibility}>
            <DropzoneImage onDataChange={onDataChange}/>
            <hr className="splitting-line" />
            <div className="content-addition">
                <div className='input-block single-part'>
                    <span>Record:</span>
                    <input placeholder='Record' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "title")} />
                </div>
                <div className='input-block single-part'>
                    <span>Artist:</span>
                    <input placeholder='Artist' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "artist")} />
                </div>
                <div className='input-block single-part'>
                    <span>Year:</span>
                    <input placeholder='Year' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "year")} />
                </div>
                <div className='input-block single-part'>
                    <span>Label:</span>
                    <input placeholder='Label' className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "label")} />
                </div>
                <div className='input-block double-part'>
                    <span>Genre:</span>
                    <TagsInput
                        onTagsChange={handleGenreChange} />
                </div>
                <div className='input-block double-part'>
                    <span>Mood:</span>
                    <TagsInput
                        onTagsChange={handleMoodChange} />
                </div>
                <div className='input-block textarea-block double-part'>
                    <span>Record info:</span>
                    <textarea placeholder="Write anything related to the record, so others can read it, while they're listening to it" className='add-input'
                        onChange={(e) => handleDataChange(e.target.value, "info")} />
                </div>
            </div>
        </div>
    )
}
export default RecordData;