import {React, useContext, useEffect, useMemo}  from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ServiceList } from '../helpers/ServiceList';
import { useServicesContext } from './ServicesContext';
import Catalogo from './Catalogo';
import '../styles/CategorySection.css';

export default function CategorySection() {

    const { selectedCategory, setSelectedCategory, catalogo, search, setSearch, setCategoryLoading } = useServicesContext();


    const categories = useMemo(() => {
        console.log('catalogo:', catalogo);
        if (!catalogo || !Array.isArray(catalogo.products)) return ['Todos'];
        return ['Todos', ...new Set(catalogo.products.map((p => p.category)))];
    }, [catalogo]);

    const handleCategoryChange = (category) => {
    setCategoryLoading(true);
    setSelectedCategory(category);

    setTimeout(() => {
        setCategoryLoading(false);
    }, 500);
};

    
    return (
        <div className='category-section'>
            <div className='name-filter-section'>
                <input type='text' placeholder='Buscar productos' value={search} onChange={(e) => setSearch(e.target.value)}></input>
            </div>
            <div className='category-section-line'>
                <div className='sections'>
                {categories.map((category) => (
                    <button key={category} className='category-button' onClick={() => handleCategoryChange(category)}>
                    
                        <p className={selectedCategory === category ? 'category-button-p-selected' : 'category-button-base'}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </p>
                    </button>
                ))}
                </div>
            </div>
    </div>
    )
}