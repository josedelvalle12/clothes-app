import React, { useState }  from 'react';
import '../styles/Home.css';
import Services from '../components/Services';
import { useServicesContext } from '../components/ServicesContext';
import CategorySection from '../components/CategorySection';
import ServiceDescription from '../components/ServiceDescription';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { updatedServices, setUpdatedServices, selectedService, setSelectedService, isImageReady, setIsImageReady, setPendingService } = useServicesContext();
  
  const handleServiceClick = (serviceName) => {
    const isSelected = updatedServices.some((service) => service.name === serviceName);

    const updatedService = serviceName;
    
    const updatedServicesCopy = isSelected
    ? updatedServices.filter((service) => service.name !== serviceName)
    : [...updatedServices, updatedService];
    
    setUpdatedServices(updatedServicesCopy);
    console.log('Servicio seleccionado:', updatedService);
  };

  const handleServiceSelect = (product) => {
  setPendingService(product);

  const img = new Image();
  img.src = product.image;

  img.onload = () => {
    setIsImageReady(true);
    setSelectedService(product);
  };
};

  
  return (
    <div className='home' style={{ backgroundColor: '#fff', height: '100%' }}>
    <AnimatePresence mode='wait'>

    {selectedService ? (
      <ServiceDescription key="description" 
      name={selectedService.title} 
      price={selectedService.price} 
      image={selectedService.image} 
      description={selectedService.description} 
      onClose={() => setSelectedService(null)}></ServiceDescription>) 
    : (
      <>
        <CategorySection></CategorySection>
        <Services onServiceClick={handleServiceSelect}></Services>
      </>
    )}
    </AnimatePresence>
    </div>
  )
}


