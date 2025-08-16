import React, { createContext, useContext, useState, useEffect } from 'react';
import Catalogo from './Catalogo';
import { useMemo } from 'react';
import { delay } from 'framer-motion';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [updatedServices, setUpdatedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedService, setSelectedService] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingService, setPendingService] = useState(null);
  const [isImageReady, setIsImageReady] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    setLoading(true);
    const startTime = Date.now();

    fetch("https://fakestoreapi.com/products")
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta de la API');
      return response.json();
    })
    .then(data => {
        setProducts(data);
        setError(null);
    })
    .catch(error => {
      console.log("Error al obtener productos:", error);
      setError(error.message || 'Error desconocido');
  })
  .finally(() => {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(700 - elapsed, 0);

    setTimeout(() => {
      setLoading(false);
      setIsFirstLoading(false);
    }, delay);
  });
  }, []);

  const catalogo = useMemo(() => {
    return Array.isArray(products) ? new Catalogo(products) : null;
  }, [products]);

  return (
    <ServicesContext.Provider value={{ updatedServices, setUpdatedServices, 
    selectedCategory, setSelectedCategory, 
    selectedService, setSelectedService, 
    products, setProducts, 
    search, setSearch, 
    catalogo, 
    loading, 
    isFirstLoading, setIsFirstLoading, 
    error, 
    searching, setSearching,
    categoryLoading, setCategoryLoading,
    pendingService, setPendingService,
    isImageReady, setIsImageReady, 
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesContext = () => useContext(ServicesContext);
