// Archivo: sesion.js

const fs = require('fs');
const usuariosFile = './usuarios.json';

// Leer archivo JSON de usuarios
function leerUsuarios() {
    if (!fs.existsSync(usuariosFile)) {
        fs.writeFileSync(usuariosFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(usuariosFile, 'utf-8'));
}

// Guardar usuarios en archivo JSON
function guardarUsuarios(usuarios) {
    fs.writeFileSync(usuariosFile, JSON.stringify(usuarios, null, 2));
}

// Registro de nuevo usuario
function registrarUsuario(username, password) {
    const usuarios = leerUsuarios();
    if (usuarios.some(usuario => usuario.username === username)) {
        return { success: false, message: 'El usuario ya existe.' };
    }
    usuarios.push({ username, password, role: 'cliente' });
    guardarUsuarios(usuarios);
    return { success: true, message: 'Usuario registrado exitosamente.' };
}

// Inicio de sesión
function iniciarSesion(username, password) {
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    if (!usuario) {
        return { success: false, message: 'Credenciales inválidas.' };
    }
    return { success: true, role: usuario.role, username: usuario.username, message: 'Inicio de sesión exitoso.' };
}

// Cerrar sesión (vacía sesión en cliente)
function cerrarSesion() {
    return { success: true, message: 'Sesión cerrada exitosamente.' };
}

module.exports = { registrarUsuario, iniciarSesion, cerrarSesion };
