import React, { useState, useEffect } from 'react';
import { useServicesContext } from '../components/ServicesContext';
import 'react-calendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Schedule.css';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import { useNavigate } from 'react-router-dom';
import SuccessPopUp from '../components/SuccessPopUp';
import '../styles/SuccessPopUp.css'
import Reservation from './Reservation';


function Schedule() {
  const { selectedDate, selectedTime, setSelectedDate, setSelectedTime} = useServicesContext();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const horarios = ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveDate = () => {
    if (!selectedDate || !selectedTime) {
      setShowPopUp(true);
    setTimeout(() => {
        setShowPopUp(false);
    }, 5000);
    } else if (selectedDate || selectedTime) {
      navigate('/reservation')
    }
  };

  return (
    <div className='scheduleSection'>
      <h2 className='scheduleTitle'>Seleccioná Fecha y Horario</h2>

      <section>
        <p className='dateSection'>Fechas disponibles</p>
      </section>
      <div className='calendar-container'>
        <Calendar onChange={handleDateChange} 
        value={selectedDate} 
        onClickDay={(date) => handleDateChange(date)} 
        className="custom-calendar"
        prev2Label={null}
        next2Label={null}>
        </Calendar>
      </div>

      
      <section>
        <p className='dateSection'>Horarios disponibles</p>
      </section>
    
      <div className='scheduleButtons'>
        {horarios.map((horario) => (
          <button key={horario} 
          className={`scheduleButton ${selectedTime === horario ? 'scheduleSelected' : ''}`} 
          onClick={() => setSelectedTime(horario)}>
            <QueryBuilderRoundedIcon ></QueryBuilderRoundedIcon>
            {horario}
          </button>
        ))}
      </div>
          <button className="reservarButton" onClick={handleSaveDate}>Confirmar</button>
          {showPopUp && (
            <SuccessPopUp message="Debes seleccionar fecha y horario para continuar."></SuccessPopUp>
          )}
    </div>
  )
}

export default Schedule