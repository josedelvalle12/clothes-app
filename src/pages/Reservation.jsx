import React, { useState, useEffect } from 'react';
import { useServicesContext } from '../components/ServicesContext';
import '../styles/Reservation.css';
import { collection, addDoc } from "firebase/firestore";
import { addReservation} from '../components/FirebaseService';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../components/SuccessPopUp';
import '../styles/SuccessPopUp.css'
import Schedule from './Schedule';
import AnimatedRoutes from '../components/AnimatedRoutes';

function Reservation() {
  const { updatedServices, setUpdatedServices, selectedDate, setSelectedDate, selectedTime } = useServicesContext();
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  const total = updatedServices.reduce((acc, service) => acc + service.price, 0);

  console.log("selectedDate:", selectedDate, "selectedTime:", selectedTime);
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedDate || !selectedTime) {
        alert("⚠️ Debes elegir una fecha y horario antes de confirmar tu reserva.")
        navigate('/schedule');
        return
      }
    
    try {
      const docRef = await addDoc(collection(db, "reservas"), {
        clienteId: "123",
        servicios: updatedServices,
        fecha: selectedDate,
        horario: selectedTime,
        pagoTotal: total,
      });
      console.log("Reserva guardada con ID: ", docRef.id);

      setUpdatedServices([]);
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
        navigate('/')
    }, 10000);
    setSelectedDate(null);
    } catch (e) {
      console.error("Error al guardar la reserva: ", e);
    }
  };

  return (
    <div className='reservationSection'>
        <h2 className='reservationTitle'>Resumen de la reserva</h2>
      <div className='reservationSection-1'>
        
        <ul className='ulServices'>
          {updatedServices.map((service) => (
            <li className='liContainer' key={service.id}>
              <img
                className='imgli'
                src={service.image}
                alt={service.name}
                style={{ width: 40, borderRadius: "50%" }}
              />

              <div className='name'>
                <p>{service.title}</p>
              </div>

              <div className='priceWrapper'>
                <p className='price'>${service.price}</p>
              </div>
            </li>
          ))}
        </ul>

      </div>

      <div className='reservationSection-2'>
        <div className='total'>
        <p>Total</p>
        <p>${total}</p>
        </div>
        <button className='reservarButton' onClick={handleSubmit}>Reservar</button>
        {showPopUp && (
          <SuccessPopup message='¡Pedido registrado con éxito!' onClose={() => navigate('/')}></SuccessPopup>
        )}
      </div>
    </div>
  );
}

export default Reservation