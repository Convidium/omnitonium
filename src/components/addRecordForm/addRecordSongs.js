import React, { useEffect, useRef, useState } from 'react'
import '../../style/Form/addSongs.scss';

import { ReactComponent as AddSongSVG } from '../../svg/add-song.svg';
import { ReactComponent as DragSVG } from '../../svg/drag.svg';
import fetchSongs from "../functions/fetchSongs";

function RecordSongs({ recordData }) {
    const [songs, setSongs] = useState([]);
    const [songIndex, setSongIndex] = useState(null);
    const songItemDrag = useRef(null);
    const songItemDragOver = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await fetchSongs("songsByAlbum", "id-a-53a6dfe6b02d9");
            console.log(fetchedData); // Now this will log actual data
            setSongs(fetchedData); // Save data in state
        };

        fetchData();
    }, []);

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
                {
                    renderedSongs[0] !== undefined ?
                        renderedSongs
                        :
                        <div className='add-song'>
                            <div className='add-song-message'>
                                <span>Added songs will be displayed here</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default RecordSongs