import React, { useState } from 'react'
import '../../style/topMessage.scss';
import { ReactComponent as CloseSVG } from '../../svg/close.svg';


function TopMesageModal({ isError, message, handleClose }) {
    const { messageType, songName } = message;
    
    const RenderedResponse = () => {
        switch (messageType) {
            case "success":
                return (
                    <div className='text-content'>
                        <span>{songName}</span> has been successfully added! You can Close this window.
                    </div>
                )
            case "error":
                return (
                    <div className='text-content'>
                        <span>{songName}</span> can't be added! Something's wrong with the data.
                    </div>
                )
            case "error-fetch":
                return (
                    <div className='text-content'>
                        <span>{songName}</span> can't be uploaded! Something's wrong on the server side.
                    </div>
                )
            case "error-data":
                return (
                    <div className='text-content'>
                        <span>{songName}</span> can't be added! Error during uploading.
                    </div>
                )
            default:
                return (
                    <div className='text-content'>
                        <span>Warning!!!</span>
                    </div>
                )
        }
    }

    return (
        <div className='message-wrapper'>
            <div className={`message-block ${messageType}`}>
                <RenderedResponse />
                <div className='close-message' onClick={handleClose}><CloseSVG /></div>
            </div>
        </div>
    );
}

export default TopMesageModal;