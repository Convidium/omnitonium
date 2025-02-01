import React, { useEffect, useState } from 'react'
import '../../style/SidePanel.scss';
import ModalTemplate from '../modalBlockTemp/ModalTemp';
import bufferToBase from '../functions/bufferToBase64';

import { ReactComponent as AlbumCollectionSVG } from '../../svg/album-collection.svg';
import { ReactComponent as AlbumSVG } from '../../svg/record-vinyl.svg';
import { ReactComponent as AddAlbumSVG } from '../../svg/add-record.svg';
import { ReactComponent as LoadingSVG } from '../../svg/loading.svg';
import { useNavigate } from 'react-router-dom';
// import { ReactComponent as ErrorSVG } from '../../svg/error.svg';

function SidePanel({ handleError }) {
    const navigate = useNavigate();
    const [albumFetch, setAlbumFetch] = useState([]);
    const [hoveredAlbum, setHoveredAlbum] = useState(null);

    const [loadingState, setLoadingState] = useState(false);
    const [isLoadedState, setIsLoadedState] = useState(false);
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoadingState(true);
                const response = await fetch('http://localhost:5000/album_details');
                if (response.ok === false) {
                    setErrorState(true);
                    handleError({
                        type: "404",
                        title: "No data detected",
                        info: "Maybe, turn on database, maybe reload it, I dunno. 404 not found I guees"
                    })
                } else {
                    const data = await response.json();
                    setAlbumFetch(data);
                    setIsLoadedState(true);
                    setLoadingState(false);
                }
            } catch (error) {
                handleError({
                    type: "404",
                    title: "Цейво, no data detected",
                    info: "Maybe, turn on database, maybe reload it, I dunno. 404 not found I guees"
                })
                setAlbumFetch([]);
                setLoadingState(false);
            }
        }
        fetchData();
    }, []);

    const albumList = albumFetch.map((albumData, index) => {
        return (
            <div
                key={index}
                className="album"
                onMouseEnter={() => setHoveredAlbum(index)}
                onMouseLeave={() => setHoveredAlbum(null)}
            >
                <button className="sqare-btn padding-0">
                    {albumData.album_cover !== "" ? <img src={bufferToBase(albumData.album_cover)} className='square-cover' alt="" /> : <AlbumSVG className="padding" />}
                </button>
                {hoveredAlbum === index && (
                    <ModalTemplate
                        errorState={errorState}
                        data={albumData}
                        key={index}
                        onMouseEnter={() => setHoveredAlbum(index)}
                        onMouseLeave={() => setHoveredAlbum(null)}
                    />
                )}
            </div>
        )
    });

    return (
        <div className="side-panel navbar-rounded relative-height">
            <div className="home-list">
                <button className="navigate-home sqare-btn action-btn">
                    <AlbumCollectionSVG />
                </button>
            </div>
            <hr className="splitting-line" />
            <div className="albums-list">
                {loadingState === true ?
                    <div className='loading'><LoadingSVG /></div>
                    :
                    null
                }
                {isLoadedState === true ?
                    albumList
                    :
                    null
                }
            </div>
            <hr className="splitting-line" />
            <div className="album-add">
                <button className="sqare-btn action-btn" onClick={() => navigate('/new-album')}>
                    <AddAlbumSVG />
                </button>
            </div>
        </div>
    );
}

export default SidePanel;