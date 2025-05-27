document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        document.getElementById('saludo').innerHTML = `Hola ${usuario.nombre}!`;
        document.getElementById ('mail').innerHTML = `Mail: ${usuario.mail}`;
        document.getElementById('fecha').innerHTML = `Fecha de nacimiento: ${usuario.fecha}`;
        document.getElementById ('contrasena').innerHTML = `Contrasena: ${usuario.contrasena}`;
    }
});

document.getElementById('cerrarSesion').addEventListener('click', function () {
    localStorage.removeItem('usuarioActual');
    alert ('Se cerró la sesión');
    window.location.href = 'index.html'; 
});