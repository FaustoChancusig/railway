// Inicializar productos con stock
if (!localStorage.getItem('productos')) {
    const productos = [
        { id: '1', nombre: 'Samsung Galaxy S22', precio: 1200, stock: 10, imagen: 'url_samsung' },
        { id: '2', nombre: 'iPhone 14', precio: 1500, stock: 5, imagen: 'url_iphone' },
        { id: '3', nombre: 'Google Pixel 7', precio: 1100, stock: 8, imagen: 'url_pixel' },
    ];
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Inicializar facturas vacías
if (!localStorage.getItem('facturas')) {
    const facturas = [];
    localStorage.setItem('facturas', JSON.stringify(facturas));
}
