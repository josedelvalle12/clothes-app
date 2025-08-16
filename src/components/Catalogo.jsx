class Catalogo {
    constructor(products) {
        this.products = products;
    }

    filtrar({ categoria = 'Todos', busqueda = '' }) {
        return this.products.filter(producto => {
            const coincideBusqueda =
            busqueda === '' || producto.title.includes(busqueda.toLowerCase());
            const coincideCategoria =
            categoria === 'Todos' || producto.category === categoria;

            return coincideBusqueda && coincideCategoria;
        })
    }

    agruparPorCategoria(productosFiltrados) {
        const agrupado = productosFiltrados.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});
        return Object.entries(agrupado);
    } 

    obtenerCategorias() {
        return [...new Set(this.products.map(p => p.category))]
    }
}

export default Catalogo;