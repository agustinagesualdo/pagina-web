document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) {
        // TOMO LOS DATOS DLE USUARIO QUE SE LOGGEO
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        document.getElementById('saludo').innerHTML = `Hola ${usuario.nombre}!`;
        document.getElementById ('mail').innerHTML = `Mail: ${usuario.mail}`;
        document.getElementById('fecha').innerHTML = `Fecha de nacimiento: ${usuario.fecha}`;

        // ARMO UN BOTON PARA QUE PERMITA MOSTRAR U OCULTAR LA CONTRASENA PARA MAS PRIVACIDAD
        let contrasenaReal = document.getElementById ('contrasena');
        document.getElementById('botonMostrar').addEventListener('click', function (){
            document.getElementById('contrasena').innerHTML = `Contraseña: ${usuario.contrasena}`;
            botonMostrar.style.display = 'none';
            botonOcultar.style.display = 'inline-block';
        })
        document.getElementById('botonOcultar').addEventListener('click', function (){
            document.getElementById('contrasena').innerHTML = `Contraseña: ********`;
            botonOcultar.style.display = 'none';
            botonMostrar.style.display = 'inline-block';
        })
    }
});

// PARA CERRAR LA SESION BORRO AL USUARIO ACTUAL
document.getElementById('cerrarSesion').addEventListener('click', function () {
    localStorage.removeItem('usuarioActual');
    alert ('Se cerró la sesión');
    window.location.href = 'index.html'; // LO REDIRIGO A LA PAGINA DE INICIO
});
