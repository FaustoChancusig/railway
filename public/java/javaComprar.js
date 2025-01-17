const comprarCarritoBtn = document.createElement('a');
comprarCarritoBtn.href = '#';
comprarCarritoBtn.id = 'comprar-carrito';
comprarCarritoBtn.className = 'btn-2';
comprarCarritoBtn.textContent = 'Comprar';
document.querySelector('#carrito').appendChild(comprarCarritoBtn);

// Detectar clic en "Comprar"
comprarCarritoBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Verificar si el usuario ha iniciado sesión
    const sesionActiva = JSON.parse(localStorage.getItem('usuario')) || null;

    if (!sesionActiva) {
        // Redirigir al registro si no hay sesión activa
        alert('Debes iniciar sesión para continuar con la compra.');
        window.location.href = 'registro.html';
    } else {
        // Realizar la compra
        alert(`¡Gracias por tu compra, ${sesionActiva.nombre}!`);
        productosCarrito = []; // Vaciar el carrito
        actualizarCarrito(); // Actualizar el carrito
    }
});

localStorage.setItem('usuario', JSON.stringify(usuario));
