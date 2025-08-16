import React from 'react';
import { Route, Routes, useLocation} from "react-router-dom";
import Home from '../pages/Home.jsx';
import Schedule from '../pages/Schedule.jsx';
import Reservation from '../pages/Reservation';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes({ updatedServices, IDReserva, IDCliente, NombreApellido, Servicio, Fecha, Horario, PagoTotal }) {
    const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home updatedServices={updatedServices}></Home>}></Route>
            <Route path='/schedule' element={<Schedule updatedServices={updatedServices}></Schedule>}></Route>
            <Route path='/reservation' element={<Reservation updatedServices={updatedServices} IDReserva={IDReserva}
  IDCliente={IDCliente}
  Servicio={Servicio}
  Fecha={Fecha}
  Horario={Horario}
  PagoTotal={PagoTotal}></Reservation>}></Route>
        </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes