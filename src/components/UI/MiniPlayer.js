import React, { useRef, useState, useEffect } from 'react'
import "../../style/miniPlayer.scss"
import TrackRange from './TrackRange';
import VolumeRange from './VolumeRange';
import { ReactComponent as PlaySVG } from '../../svg/play.svg';
import { ReactComponent as PauseSVG } from '../../svg/pause.svg';
import { ReactComponent as DeleteSVG } from '../../svg/trash-can.svg';
import blobToBase64 from '../functions/blobToBase64';
import setCssVariable from '../functions/setGlobalCSSValues';

function MiniPlayer({ songData, albumData, onDelete }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
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
            blobToBase64(albumData.cover).then((base64Image) => {
                setAlbumCover(base64Image);
            });
            setCssVariable(JSON.parse(localStorage.getItem("MusicPlayerColors")));
        }
    }, [albumData]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updatePosition = () => setPosition(audio.currentTime);
            audio.addEventListener("timeupdate", updatePosition);
            audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
            audio.addEventListener("ended", handleSongEnd); // Detect song end
            audioRef.current.volume = 0.5;

            return () => {
                audio.removeEventListener("timeupdate", updatePosition);
            };
        }
    }, []);

    const handlePlayStop = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleSongEnd = () => {
        setIsPlaying(false); // Stop playback
        setPosition(0);      // Reset position to start
    };

    const handleRangeChange = (e) => {
        const newPosition = parseFloat(e);
        setPosition(newPosition);
        audioRef.current.currentTime = newPosition;
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    return (
        <div className="mini-player-wrapper">
            <div className="mini-player-preview">
                <div className="song-cover">
                    <img src={albumCover} alt='' />
                </div>
                <div className="player-controls">
                    <div className="song-play" onClick={handlePlayStop}>
                        {isPlaying ? <PauseSVG /> : <PlaySVG />}
                    </div>
                    <div className='song-track'>
                        <TrackRange max={duration} value={position} onChange={(val) => handleRangeChange(val)} />
                    </div>
                    <div className="volume-track">
                        <VolumeRange max={1} value={volume} onChange={(val) => handleVolumeChange(val)} />
                    </div>
                    <div className='delete-audiofile' onClick={onDelete}>
                        <DeleteSVG/>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={songData} type="audio/mpeg" />
        </div>
    );
}
export default MiniPlayer;