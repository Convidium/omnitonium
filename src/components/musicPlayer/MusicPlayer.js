import React, { useEffect, useState } from 'react'
import '../../style/musicPlayer.scss';
import { ReactComponent as AlbumSVG } from '../../svg/record-vinyl.svg';

function MusicPlayer() {
    const [albumFetch, setAlbumFetch] = useState([]);
    const [songFetch, setSongFetch] = useState([]);
    const [hoveredAlbum, setHoveredAlbum] = useState(null);

    const [loadingState, setLoadingState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [cover, setCover] = useState(<AlbumSVG className="padding" />);

    useEffect(() => {
        async function fetchAlbumData() {
            try {
                const response = await fetch('http://localhost:5000/album_details');
                if (response.ok == false) {
                    setErrorState(true);
                } else {
                    const data = await response.json();
                    setAlbumFetch(data);
                }
                setLoadingState(true);
            } catch (error) {
            }
        }

        async function fetchSongsData() {
            try {
                const response = await fetch('http://localhost:5000/tracks');
                if (response.ok == false) {
                    setErrorState(true);
                } else {
                    const data = await response.json();
                    setSongFetch(data);
                }
                setLoadingState(true);
            } catch (error) {
            }
        }
        fetchAlbumData();
        fetchSongsData();
        console.log(songFetch);
        
    }, []);
    return (
        <div className="music-palyer-wrapper side-panel navbar-rounded relative-height">
            12
        </div>
    );
}

export default MusicPlayer;