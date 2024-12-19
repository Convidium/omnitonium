import React, { useState } from 'react'
import '../../style/modalTemp.scss';
import bufferToBase from '../functions/bufferToBase64';
import { ReactComponent as PlaySVG } from '../../svg/play.svg';
import { ReactComponent as PlayCircleSVG } from '../../svg/play-circle.svg';
import { ReactComponent as InfoSVG } from '../../svg/info.svg';


function ModalTemplate({ errorState, data }) {
    console.log(data);
    
    const [genres, setGenres] = useState(
        errorState == false ? JSON.parse(data.album_genre).genre_names : "No Data"
    );

    const URL = bufferToBase(data.album_cover);

    return (
        <div className='modal-wrapper'>
            <div className="modal rounded">
                <div className='main-content'>
                    <div className='modal-cover'>
                        <img src={URL} />
                        <div className='play-onhover'>
                            <PlaySVG />
                        </div>
                    </div>
                    <div className='modal-info'>
                        <div className='album-name'>
                            <span>{data.album_name}</span>
                        </div>
                        <div className='album-artist-year'>
                            <span>{data.album_artist}</span> • {data.year}
                        </div>
                        <div className='album-additional'>
                            <div className='album-genre'>{genres[0]}</div>
                            <div className='album-tracks-count'>12 Tracks</div>
                        </div>
                    </div>
                </div>
                <hr className="vertical-line" />
                <div className='see-full'>
                    <button className='btn'>
                        <InfoSVG />
                    </button>
                    <button className='btn'>
                        <PlaySVG className="play-svg" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalTemplate;