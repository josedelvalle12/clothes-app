import {React, useRef, useEffect, useState}  from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import '../styles/Navbar.css';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


export default function Navbar() {
    const location = useLocation();

    

return (
    <div className='navbar'>
            <Link to="/">
                <button className={`button-navbar ${location.pathname ==="/" ? "button-navbar-selected" : ""}`}>
                        <div className='button-svg'>
                            <HomeRoundedIcon></HomeRoundedIcon>
                        </div>
                    <p>Inicio</p>
                </button>
            </Link>
            <Link to="/schedule">
                <button className={`button-navbar ${location.pathname ==="/schedule" ? "button-navbar-selected" : ""}`}>
                    <div className='button-svg'>
                        <EventRoundedIcon></EventRoundedIcon>
                    </div>
                <p>Fecha y horario</p>
                </button>
            </Link>
            <Link to="/reservation">
                <button className={`button-navbar ${location.pathname ==="/reservation" ? "button-navbar-selected" : ""}`}>
                    <div className='button-svg'>
                        <FactCheckRoundedIcon></FactCheckRoundedIcon>
                    </div>
                    
                <p>Reserva</p>
                </button>
            </Link>
    </div>
    )
}
