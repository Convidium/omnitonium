import React, { useState } from 'react'
import '../../style/topMessage.scss';
import { ReactComponent as CloseSVG } from '../../svg/close.svg';


function TopMesageModal({isError, message, handleClose}) {
    // Switch case here for varous messages
    return (
        <div className='message-wrapper'>
            {/* <div className='message-block'>
                <div className='text-content'>
                    <span>{message}</span> can't be added! Something's wrong with the data.
                    </div>
                <hr className='splitting-line'/>
                <div className='close-message' onClick={handleClose}><CloseSVG/></div>
            </div> */}
        </div>
    );
}

export default TopMesageModal;