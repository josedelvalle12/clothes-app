import { useRef, useEffect, useMemo } from 'react';
import ServiceItem from '../components/ServiceItem';
import { useServicesContext } from '../components/ServicesContext' ;
import { ClipLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/Services.css';
import '../styles/ServiceItem.css';

function Services({ onServiceClick }) {
    const ref = useRef(null);
    const { selectedCategory, setSelectedService, 
        search, setSelectedCategory, 
        catalogo, loading, 
        setLoading, isFirstLoading, 
        setIsFirstLoading, error, 
        searching, setSearching, 
        categoryLoading, setCategoryLoading } = useServicesContext();

    useEffect(() => {
    if (search !== '') {
        setSearching(true);
        const timeout = setTimeout(() => {
        setSearching(false);
        }, 300); // delay visual para mostrar el skeleton

        return () => clearTimeout(timeout);
    }
    }, [search]);

    const productosFiltrados = useMemo(() => {
        return catalogo.filtrar({
            categoria: selectedCategory,
            busqueda: search 
        });
    }, [catalogo, selectedCategory, search]);

    const productosAgrupados = useMemo(() => {
        if (search === '') {
            return catalogo.agruparPorCategoria(productosFiltrados);
        }
        return [];
    }, [catalogo, productosFiltrados, search]); 
    
    useEffect(() => {
        if (search === "") {
            setSelectedCategory(selectedCategory);  // Fuerza una actualización si es necesario
        }
    }, [search]);
    
    // Render inicial y Loading
    if (error) return <p className='error'>Error al cargar productos: {error}</p>
    if (loading && isFirstLoading) {
        return (
        <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    <ClipLoader color="#36d7b7" size={50} />
    </div>
        )
    }

    // Hooks
    const renderLoadingSkeletons = () => { 
            return Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className='serviceItem'>
            <Skeleton height={160} width="100%" borderRadius="12px" />
            <Skeleton height={15} width="100%" />
            <Skeleton height={15} width="20%" style={{ alignSelf: "flex-start" }} />
        </div>
    ));
    };

    const renderGroupedProducts = () => {
        if (categoryLoading) {
            return <div className='serviceList'>  {renderLoadingSkeletons()} </div>
        }
        
        return productosAgrupados.map(([category, items]) => (
            <div key={category} className='div-container'>
            <p className='categoryTitle'>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            <div className='serviceList'>
            {items.map(product => (
                <ServiceItem
                key={product.id}
                name={product.title}
                price={product.price}
                image={`${product.image}`}
                onClick={() => onServiceClick(product)}
                />
            ))}
            </div>
        </div>
        ))
    };

    const renderSearchResults = () => {
        
        if (!productosFiltrados || productosFiltrados.length === 0) {
            return <p className='loading'>No hay productos encontrados.</p>
        }
        return <div className='serviceList'>

        {
            searching
            ? renderLoadingSkeletons()
            : productosFiltrados.map(product => (
                <ServiceItem
                key={product.id}
                name={product.title}
                price={product.price}
                image={`${product.image}`}
                description={product.description}
                onClick={() => onServiceClick(product)}
                />
            ))
            }
        </div>
    };

    return (
    <div className='serviceSection' ref={ref}>
        <>
            <section className='titlesSection'>
                <p className='servicesTitle'>Productos</p>
            </section>

            <section>
                    {search === '' ? (
                        loading || categoryLoading ? 
                        // Skeletons por categoría
                        <div className='serviceList'>{renderLoadingSkeletons()}</div> : 
                        // Productos agrupados por categoría
                        renderGroupedProducts()
                    ) : (
                        // Resultado de búsqueda
                        renderSearchResults()
                    )}
            </section>

        </>        
    </div>
);
}

export default Services 