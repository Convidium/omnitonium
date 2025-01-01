import React, { useState, useRef } from "react";
import "../../style/UI/trackRange.scss";

function TrackRange({ max=100, value, onChange }) {
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef(null);
    const inputRef = useRef(null);

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
        const input = inputRef.current;
        if (!track || !input) return;

        const rect = track.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // Mouse/touch position relative to the track
        const newValue = Math.min(Math.max(0, (offsetX / rect.width) * max), max);

        input.value = newValue; // Sync with the input
        onChange(newValue); // Update parent state
    };

    return (
        <div
            className="track-wrapper"
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
                <div className="progress" style={{ width: `${(value / max) * 100}%` }} />
                <div
                    className="thumb"
                    style={{ left: `${(value / max) * 100}%` }}
                />
            </div>
            {/* Hidden input for form integration */}
            <input
                ref={inputRef}
                type="range"
                min="0"
                max={max}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}

export default TrackRange;
