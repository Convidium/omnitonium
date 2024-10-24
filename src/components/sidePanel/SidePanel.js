import React, { useState } from 'react'
import '../../style/SidePanel.scss';
import ModalTemplate from '../modalBlockTemp/ModalTemp';

import { ReactComponent as AlbumCollectionSVG } from '../../svg/album-collection.svg';
import { ReactComponent as AlbumSVG } from '../../svg/record-vinyl.svg';
import { ReactComponent as AddAlbumSVG } from '../../svg/add-record.svg';

function SidePanel() {

    const [hoveredAlbum, setHoveredAlbum] = useState(null);

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

    const albumList = albums.map((albumData, index) => {
        return (
            <div
                key={index}
                className="album"
                onMouseEnter={() => setHoveredAlbum(index)}
                onMouseLeave={() => setHoveredAlbum(null)}
            >
                <button className="sqare-btn">
                    <AlbumSVG />
                </button>
                {hoveredAlbum == index && (
                    <ModalTemplate
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
                {albumList}
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