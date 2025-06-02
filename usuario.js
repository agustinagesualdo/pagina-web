// CARGO PARA VER SI HAY UN USUARIO LOGGEADO
document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        if (usuario) {
            window.location.href = "usuarioIngresado.html"; // QUE LO LLEVE A LA PAGINA DE SU USUARIO
        }
    }
});

document.getElementById('botonIniciar').addEventListener('click', function(e) {
    e.preventDefault(); 

    const mail = document.getElementById('mail').value.trim();
    const contrasena = document.getElementById('contrasena').value;

    // ARMO UNA CLAVE PARA QUE SEA MAS FACIL DE BUSCAR DESPUES
    let clave = "usuario_" + mail;
    let datos = localStorage.getItem(clave);

    // SI HAY UN USUARIO CON ESE MAIL
    if (datos) {
        let usuario = JSON.parse(datos);
        // CHEQUEO SI LA CONTRASENA Y EL USUARIO COINCIDEN
        if (usuario.contrasena === contrasena) {
            // LO GUARDO COMO EL USUARIO ACTUAL
            localStorage.setItem("usuarioActual", JSON.stringify(usuario)); 
            inicioSesion();
            const usuarioActual = localStorage.getItem("usuarioActual");
            window.location.href = "usuarioIngresado.html"; // QE LO REDIRECCIONE A LA PAGINA DE SU USUARIO

        } else {
            inicioIncorrecto();
        }
    } else {
        alert("Usuario no encontrado");
    }
});

// LE AVISO AL USUARIO QUE INICIO SESIÓN
function inicioSesion(){
    const toastEl = document.getElementById('mensajeIniciarSesion');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function inicioIncorrecto (){
    const toastEl = document.getElementById('contraIncorrecta');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
