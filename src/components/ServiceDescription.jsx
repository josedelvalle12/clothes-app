import {React, useState, useContext} from 'react';
import '../styles/ServiceDescription.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from "framer-motion";
import { useServicesContext} from '../components/ServicesContext';
import SuccessPopup from './SuccessPopUp';
import '../styles/SuccessPopUp.css'
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';

function ServiceDescription({ name, price, image, description, onClose }) {
    const { updatedServices, setUpdatedServices, selectedService } = useServicesContext();
    console.log(selectedService);
    console.log(updatedServices)
    const [showPopUp, setShowPopUp] = useState(false);
    
    const handleAddToReservation = () => {
    setUpdatedServices([...updatedServices, selectedService]);
    setShowPopUp(true);
    setTimeout(() => {
        setShowPopUp(false);
        onClose()
    }, 1500);
};

    return (
        <motion.div
        className="serviceDescription"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
        <div className="imgBtnContainer">
            <button className="backBtn" onClick={onClose}>
            <ArrowBackIcon />
            </button>
            <img src={image} alt="" />
        </div>
        <section className="descriptionSection">
            <div className="descriptionText">
            <p className="descriptionTitle">{name}</p>
            <p className="priceService">${price}</p>
            <p className="description">{description}</p>
            </div>
            <button className="reservarBtn" onClick={handleAddToReservation}>Reservar</button>
            {showPopUp && (
                <SuccessPopup message='¡Producto guardado!' onClose={() => setShowPopUp(false)}></SuccessPopup>
            )}
        </section>
        </motion.div>
    );
}

export default ServiceDescription;
