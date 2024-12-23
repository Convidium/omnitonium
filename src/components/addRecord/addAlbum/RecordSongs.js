import React, { useRef, useState } from 'react'
import '../../../style/recordSongs.scss';

import { ReactComponent as AddSongSVG } from '../../../svg/add-song.svg';
import { ReactComponent as DragSVG } from '../../../svg/drag.svg';

function RecordSongs({ handleEvent }) {
    const [songs, setSongs] = useState([
        {
            position: 1,
            name: "Sgt Pepper's Lonely Hearts Club Band",
            duration: 122,
            isDragged: false,
        },
        {
            position: 2,
            name: "With a Little Help From My Friends",
            duration: 165,
            isDragged: false,
        },
        {
            position: 3,
            name: "Lucy in The Sky With Diamonds",
            duration: 207,
            isDragged: false,
        },
        {
            position: 4,
            name: "Getting Better",
            duration: 167,
            isDragged: false,
        }
    ]);
    const [songIndex, setSongIndex] = useState(null);
    const songItemDrag = useRef(null);
    const songItemDragOver = useRef(null);
    
    const onDragStart = (e, index) => {
        songItemDrag.current = index;
    };
    
    const onDragEnter = (e, index) => {
        songItemDragOver.current = index;
        setSongIndex(index);
    };
    
    const onDragEnd = (e) => {
        const draggedFrom = songItemDrag.current;
        const draggedTo = songItemDragOver.current;
    
        if (draggedFrom === draggedTo || draggedTo === null) {
            return;
        }
    
        const updatedSongs = [...songs];
        const [draggedItem] = updatedSongs.splice(draggedFrom, 1);
        updatedSongs.splice(draggedTo, 0, draggedItem);
    
        const reindexedSongs = updatedSongs.map((song, idx) => ({
            ...song,
            position: idx + 1,
        }));
    
        setSongs(reindexedSongs);
        setSongIndex(null);
        songItemDrag.current = null;
        songItemDragOver.current = null;
    };

    const renderedSongs = songs.map((song, index) => {
        const minutes = Math.floor(song.duration / 60);
        const remainingSeconds = song.duration % 60;
        return (
            <>
                <div draggable droppable="true"
                    onDragStart={e => onDragStart(e, index)}
                    onDragEnter={e => onDragEnter(e, index)}
                    onDragEnd={e => onDragEnd(e, index)}
                    className='song-item' key={index}>
                    <div className='song-position'>{song.position}.</div>
                    <div className='song-name'>{song.name}</div>
                    <div className='song-duration'>{minutes + ":" + remainingSeconds.toString().padStart(2, "0")}</div>
                    <div className='song-drag'><DragSVG /></div>
                </div>
                {songIndex == index ? <div className='drag-indicator'></div> : null}
            </>
        )
    })

    return (
        <div className='song-list-wrapper'>
            <div className='song-list'>
                {renderedSongs}
                <div className='song-item add-song'>
                    <button className='btn add-song-btn' onClick={() => handleEvent("add-song-modal")}>
                        <span>Add a Song</span>
                        <AddSongSVG />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RecordSongs