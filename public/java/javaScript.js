
// Alternar el menú en dispositivos móviles
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}

/* JS del model */
let productoActual = '';
let descripcionActual = '';
let imagenesActuales = [];
let imagenPrincipal = '';

function abrirModal(nombreProducto, descripcion, imagenes) {
    productoActual = nombreProducto;
    descripcionActual = descripcion;
    imagenesActuales = imagenes;

    // Mostrar el modal
    document.getElementById("modal").style.display = "flex";
    
    // Establecer la primera imagen como principal
    imagenPrincipal = imagenes[0];
    document.getElementById("main-img").src = imagenPrincipal;

    // Mostrar la descripción
    document.getElementById("modal-desc").textContent = descripcion;

    // Generar las imágenes en miniatura
    const contenedorMiniaturas = document.getElementById("modal-img-container");
    contenedorMiniaturas.innerHTML = '';
    imagenes.forEach((imgSrc, index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.className = "modal-img" + (index === 0 ? " active" : "");
        img.onclick = function() {
            seleccionarImagenPrincipal(imgSrc);
        };
        contenedorMiniaturas.appendChild(img);
    });
}

function seleccionarImagenPrincipal(src) {
    imagenPrincipal = src;
    document.getElementById("main-img").src = src;

    // Actualizar la clase activa en las miniaturas
    const miniaturas = document.querySelectorAll(".modal-img");
    miniaturas.forEach(img => img.classList.remove("active"));
    
    // Marca la imagen seleccionada como activa
    document.querySelector(`.modal-img[src="${src}"]`).classList.add("active");
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

function comprarProducto() {
    const cantidad = document.getElementById("cantidad").value;
    alert("Has comprado " + cantidad + " unidad(es) de " + productoActual);
}




/* Codigo de reproductor de video*/

// Selección de elementos
const video = document.getElementById('video');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const muteUnmuteBtn = document.getElementById('mute-unmute');
const volumeBar = document.getElementById('volume-bar');

// Reproducir o pausar video
playPauseBtn.addEventListener('click', () => {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = '⏸'; // Cambiar ícono a pausa
    } else {
        video.pause();
        playPauseBtn.textContent = '▶'; // Cambiar ícono a reproducir
    }
});

// Actualizar barra de progreso
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
});

// Cambiar tiempo del video al mover la barra de progreso
progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * video.duration;
    video.currentTime = time;
});

// Silenciar o activar sonido
muteUnmuteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteUnmuteBtn.textContent = video.muted ? '🔇' : '🔊'; // Cambiar ícono
});

// Controlar volumen
volumeBar.addEventListener('input', () => {
    video.volume = volumeBar.value;
});





