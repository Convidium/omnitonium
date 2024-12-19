import React, { useRef, useState } from 'react'
import '../../style/recordSongs.scss';

import { ReactComponent as UploadSVG } from '../../svg/upload.svg';
import DropzoneSong from '../UI/DropzoneSong.js';

function RecordSongs({ onDataChange }) {

    return (
        <div className={'relative-height navbar-rounded song-properties-block'}>
            <div className='double-part'>
                <div className="header f-big">
                    <span>Create new song</span>
                </div>
                <hr className="splitting-line" />
            </div>
            <div className='grid'>
                <div className='input-block double-part'>
                    <span>Song name:</span>
                    <input placeholder='Name' className='add-input' />
                </div>
                <div className='input-block single-part'>
                    <span>Writer:</span>
                    <input placeholder='Author' className='add-input' />
                </div>
                <div className='input-block single-part'>
                    <span>Composed by:</span>
                    <input placeholder='Composer' className='add-input' />
                </div>
                <div className='input-block textarea-block double-part'>
                    <span>Song info:</span>
                    <textarea placeholder="Write anything related to the the song, so others can read it, while they're listening to it" className='add-input' />
                </div>
                <DropzoneSong onDataChange={onDataChange} />
            </div>
        </div>
    )
}
export default RecordSongs