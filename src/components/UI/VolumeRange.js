import React, { useState, useRef } from "react";
import "../../style/UI/trackRange.scss";

function VolumeRange({ max, value, onChange }) {
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        updateValue(e);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            updateValue(e);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        updateValue(e.touches[0]);
    };

    const handleTouchMove = (e) => {
        if (isDragging) {
            updateValue(e.touches[0]);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const updateValue = (e) => {
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const offsetY = rect.bottom - e.clientY; // Distance from bottom
        const newValue = Math.min(Math.max(0, (offsetY / rect.height) * max), max);

        onChange(newValue); // Update parent state
    };
    
    const progressStyle = {
        height: `${(value / max) * 100}%`,
    };

    const thumbStyle = {
        bottom: `${((value / max) * 100)-5}%`,
    };

    return (
        <div
            className="track-wrapper vertical"
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="track">
                <div className="progress" style={progressStyle} />
                <div className="thumb" style={thumbStyle} />
            </div>
        </div>
    );
}

export default VolumeRange;