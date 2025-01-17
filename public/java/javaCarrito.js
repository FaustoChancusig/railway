document.addEventListener('DOMContentLoaded', () => {
    // Al cargar la página, reconstruir el carrito desde localStorage
    actualizarCarrito();
});

const carrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const comprarCarritoBtn = document.createElement('a');
comprarCarritoBtn.href = '#';
comprarCarritoBtn.id = 'comprar-carrito';
comprarCarritoBtn.className = 'btn-2';
comprarCarritoBtn.textContent = 'Comprar';
document.querySelector('#carrito').appendChild(comprarCarritoBtn);

let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el HTML del carrito y guardar en localStorage
function actualizarCarrito() {
    carrito.innerHTML = ''; // Limpiar el HTML del carrito
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
        `;
        carrito.appendChild(row);
    });
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

// Función para agregar un producto
function agregarProducto(producto) {
    const existe = productosCarrito.some(item => item.id === producto.id);
    if (existe) {
        productosCarrito = productosCarrito.map(item => {
            if (item.id === producto.id) {
                item.cantidad++;
            }
            return item;
        });
    } else {
        productosCarrito.push(producto);
    }
    actualizarCarrito();
}

// Función para eliminar producto del carrito
function eliminarProducto(productoId) {
    productosCarrito = productosCarrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', e => {
    e.preventDefault();
    productosCarrito = [];
    actualizarCarrito();
});

// Detectar clic en botones "Agregar al carrito"
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        // Obtener información del producto desde el botón y sus elementos padre
        const producto = {
            id: e.target.getAttribute('data-id'),
            nombre: e.target.parentElement.querySelector('h3').textContent,
            precio: parseFloat(e.target.parentElement.querySelector('.precio').textContent.replace('$', '')),
            imagen: e.target.parentElement.parentElement.querySelector('img').src,
            cantidad: 1
        };

        agregarProducto(producto); // Añadir al carrito
    });
});

// Detectar clic en "borrar producto"
carrito.addEventListener('click', e => {
    if (e.target.classList.contains('borrar')) {
        const productoId = e.target.getAttribute('data-id');
        eliminarProducto(productoId);
    }
});

// Procesar la compra y generar factura
comprarCarritoBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Verificar si hay un usuario logueado
    const sesionActiva = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!sesionActiva) {
        alert('Debes iniciar sesión para completar la compra.');
        window.location.href = 'registro.html';
        return;
    }

    if (productosCarrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Verificar y actualizar stock
    let productos = JSON.parse(localStorage.getItem('productos'));
    let compraValida = true;

    productosCarrito.forEach((productoCarrito) => {
        const producto = productos.find(p => p.id === productoCarrito.id);
        if (producto.stock < productoCarrito.cantidad) {
            alert(`El producto "${producto.nombre}" no tiene suficiente stock.`);
            compraValida = false;
        }
    });

    if (!compraValida) return;

    // Actualizar stock
    productosCarrito.forEach((productoCarrito) => {
        const producto = productos.find(p => p.id === productoCarrito.id);
        producto.stock -= productoCarrito.cantidad;
    });
    localStorage.setItem('productos', JSON.stringify(productos));

    // Generar factura
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const nuevaFactura = {
        idFactura: `FAC${facturas.length + 1}`,
        cliente: sesionActiva.nombre,
        email: sesionActiva.email,
        productos: productosCarrito,
        total: productosCarrito.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0),
        fecha: new Date().toLocaleString(),
    };
    facturas.push(nuevaFactura);
    localStorage.setItem('facturas', JSON.stringify(facturas));

    alert('Compra realizada. Factura generada.');
    productosCarrito = [];
    actualizarCarrito();
});
