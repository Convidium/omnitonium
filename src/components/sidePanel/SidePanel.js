import React, { useEffect, useState } from 'react'
import '../../style/SidePanel.scss';
import ModalTemplate from '../modalBlockTemp/ModalTemp';
import bufferToBase from '../functions/bufferToBase64';

import { ReactComponent as AlbumCollectionSVG } from '../../svg/album-collection.svg';
import { ReactComponent as AlbumSVG } from '../../svg/record-vinyl.svg';
import { ReactComponent as AddAlbumSVG } from '../../svg/add-record.svg';
import { ReactComponent as LoadingSVG } from '../../svg/loading.svg';
// import { ReactComponent as ErrorSVG } from '../../svg/error.svg';

function SidePanel({ handleError }) {
    const [albumFetch, setAlbumFetch] = useState([]);
    const [hoveredAlbum, setHoveredAlbum] = useState(null);

    const [loadingState, setLoadingState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [cover, setCover] = useState(<AlbumSVG className="padding" />);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/album_details');
                if (response.ok == false) {
                    setErrorState(true);
                    handleError({
                        type: "404",
                        title: "No data detected",
                        info: "Maybe, turn on database, maybe reload it, I dunno. 404 not found I guees"
                    })
                } else {
                    const data = await response.json();
                    setAlbumFetch(data);
                }
                setLoadingState(true);
            } catch (error) {
                handleError({
                    type: "404",
                    title: "Цейво, no data detected",
                    info: "Maybe, turn on database, maybe reload it, I dunno. 404 not found I guees"
                })
            }
        }
        fetchData();
    }, []);

    const albums = [
        {
            title: "Pet Sounds",
            artist: "the Beach Boys"
        },
        {
            title: "SMiLE",
            artist: "the Beach Boys"
        },
        {
            title: "Sgt Pepper's Lonely Hearts Club Band",
            artist: "The Beatles"
        },
        {
            title: "Revolver",
            artist: "The Beatles"
        },
        {
            title: "Abbey Road",
            artist: "The Beatles"
        },
        {
            title: "Crisis? What Crisis?",
            artist: "Supertramp"
        }
    ]
    const albumList = albumFetch.map((albumData, index) => {
        return (
            <div
                key={index}
                className="album"
                onMouseEnter={() => setHoveredAlbum(index)}
                onMouseLeave={() => setHoveredAlbum(null)}
            >
                <button className="sqare-btn padding-0">
                    {albumData.album_cover != "" ? <img src={bufferToBase(albumData.album_cover)} className='square-cover' /> : cover}
                </button>
                {hoveredAlbum == index && (
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
                {loadingState == true ?
                    albumList
                    :
                    <div className='loading'><LoadingSVG /></div>
                }
            </div>
            <hr className="splitting-line" />
            <div className="album-add">
                <button className="sqare-btn action-btn">
                    <AddAlbumSVG />
                </button>
            </div>
        </div>
    );
}

export default SidePanel;