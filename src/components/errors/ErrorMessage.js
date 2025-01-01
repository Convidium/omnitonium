import React, { useEffect } from 'react';
import "../../style/errorMessage.scss";

import { ReactComponent as ErrorSVG } from '../../svg/error.svg';
import { ReactComponent as CloudExclamationSVG } from '../../svg/cloud-exclamation.svg';
import { ReactComponent as CloseSVG } from '../../svg/close.svg';

function ErrorMessage({ errorData, closeError }) {
    const handleKeyDown = (event) => {
        if (event.key === "Escape" || event.key === "Backspace") {
            closeError();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, []);

    return (
        <div className="full-screen dark-bg">
            <div className="error-wrapper rounded">
                <div className="error-border error-block rounded-10">
                    <div className="main-title"><span>ERROR {errorData.type}</span></div>
                    <hr className="splitting-line error-full-width"></hr>
                    <div className="error-info">
                        <div className="error-left-block">
                            <CloudExclamationSVG />
                        </div>
                        <div className="error-right-block">
                            <div className="title">{errorData.title}</div>
                            <div className="info">{errorData.info}</div>
                        </div>
                    </div>
                </div>
                <button className="error-close-btn btn" onClick={() => closeError()}><CloseSVG /></button>
            </div>
        </div>
    );
}

export default ErrorMessage;