import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ message, onClose, iconType }) => {
    const [exiting, setExiting] = useState(false);

    const handleClose = () => {
        setExiting(true);
    };

    useEffect(() => {
        if (exiting) {
            const timer = setTimeout(() => {
                onClose();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [exiting, onClose]);

    return (
        <div className={`popup-overlay ${exiting ? 'popup-exit' : ''}`}>
            <div className={`popup-container animated-popup ${exiting ? 'exit' : ''}`}>
                <div className="popup-icon">
                    {iconType === 'success' ? (
                        <svg width="28" height="28" fill="#28a745" viewBox="0 0 16 16" className="bi bi-check-circle">
                            <path d="M15.854 4.854a.5.5 0 0 0-.708-.708L6.5 13.293 1.354 8.146a.5.5 0 1 0-.708.708l5.5 5.5a.5.5 0 0 0 .708 0l8.5-8.5z"/>
                        </svg>
                    ) : (
                        <svg width="28" height="28" fill="#dc3545" viewBox="0 0 16 16" className="bi bi-x-circle">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    )}
                </div>
                <p className="popup-message">{message}</p>
                <button className="popup-close-button" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
