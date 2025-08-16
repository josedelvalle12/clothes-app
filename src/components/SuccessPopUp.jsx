import React from 'react';
import '../styles/SuccessPopUp.css';

export default function SuccessPopup({ message, onClose }) {
    return (
    <div className="popup-overlay">
        <div className="popup-container">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
        </div>
    </div>
    );
}
