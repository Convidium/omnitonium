import React, { useRef, useState, useEffect } from 'react'
import "../../style/miniPlayer.scss"

import { ReactComponent as PlaySVG } from '../../svg/play.svg';
import { ReactComponent as PauseSVG } from '../../svg/pause.svg';
import blobToBase64 from '../functions/blobToBase64';
import setCssVariable from '../functions/setGlobalCSSValues';

function MiniPlayer({ songData, albumData }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [albumCover, setAlbumCover] = useState();

    const audioRef = useRef(null);
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            isPlaying ? audio.play() : audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (albumData.cover !== "") {
            blobToBase64(albumData.cover)
                .then(
                    base64Image => {
                        setAlbumCover(base64Image);
                    }
                )
            setCssVariable(JSON.parse(localStorage.getItem("MusicPlayerColors")));
        }
    }, [])

    const handlePlayStop = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else if (!isPlaying) {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className='mini-player-wrapper'>
            <div className='mini-player-preview'>
                <div className='song-cover'>
                    <img src={albumCover} alt="" />
                </div>
                <div className='player-controls'>
                    {/* <div className='cancel-track'>
                        X
                    </div> */}
                    <div className='song-play' onClick={handlePlayStop}>
                        {isPlaying ? <PauseSVG /> : <PlaySVG />}
                    </div>
                    <div className='song-track'>
                        <div className='song-range'></div>
                        <div className='song-thumb'></div>
                        <input type='range' step="0.01" className='range' onChange={e => setPosition(e.target.value)} />
                    </div>
                    <div className='volume-track'>
                        <div className='song-range'></div>
                        <div className='song-thumb'></div>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={songData} type="audio/mpeg"></audio>
        </div>
    )
}
export default MiniPlayer;