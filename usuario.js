document.addEventListener('DOMContentLoaded', function () {
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        if (usuario) {
            window.location.href = "usuarioIngresado.html"; 
        }
    }
});


document.getElementById('botonIniciar').addEventListener('click', function(e) {
    e.preventDefault(); 

    const mail = document.getElementById('mail').value.trim();
    const contrasena = document.getElementById('contrasena').value;

    let clave = "usuario_" + mail;
    let datos = localStorage.getItem(clave);

    if (datos) {
        let usuario = JSON.parse(datos);
        if (usuario.contrasena === contrasena) {
            localStorage.setItem("usuarioActual", JSON.stringify(usuario)); 
            mostrarMensaje();
            const usuarioActual = localStorage.getItem("usuarioActual");
            if (usuarioActual) {
                const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
            if (usuario) {
                window.location.href = "usuarioIngresado.html"; 
            }
            }

        } else {
            alert("Contraseña incorrecta");
        }
    } else {
        alert("Usuario no encontrado");
    }
});
function mostrarMensaje(){
    const toastEl = document.getElementById('mensajeIniciarSesion');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

