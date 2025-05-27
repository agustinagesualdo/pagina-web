document.getElementById('botonCrear').addEventListener ('click', function (e){
    e.preventDefault();
    const nombre = document.getElementById ('nombre').value;
    const mail = document.getElementById ('mail').value;
    const contrasena = document.getElementById ('contrasena').value;
    const fecha = document.getElementById ('fecha').value;

    let usuario = {mail:mail, contrasena:contrasena};

    let existe = verificarUsuario (usuario);
    let valido = validarIngreso(nombre, mail, contrasena, fecha);
    
    if (!valido){
        alert ('Chequear los campos!');
    }else{
        if (!existe){
            let nuevoUsuario = {nombre:nombre, mail:mail, contrasena:contrasena, fecha:fecha}
            localStorage.setItem("usuario_" + mail, JSON.stringify(nuevoUsuario)); // clave única por mail
            localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario)); // para login automático
            mostrarMensaje();
            document.getElementById('cerrarCrearCuenta').addEventListener('click', function(){
                window.location.href = "usuarioIngresado.html";
            })
        }else{
            alert('Ya se ha registrado ese mail')
        }
    }

})

function verificarUsuario(user) {
    let existe = false;
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if (clave.startsWith("usuario_")) {
            let dato = JSON.parse(localStorage.getItem(clave));
            if (dato.mail === user.mail) {
                existe = true;
                break;
            }
        }
    }
    return existe;
}

function validarIngreso (nombre, mail, contra, fecha){
    if ((nombre.trim() === '') || (mail === '') || (contra === '') || (fecha === '')){
        return false;
    }else{
        /*Chequeo el nombre*/
        for (let i = 0; i < nombre.length; i++) {
            let letra = nombre[i];
            if (!((letra >= 'a' && letra <= 'z') || (letra >= 'A' && letra <= 'Z') || letra === ' ')) {
                return false;
            }
        }
        /*Chequeo la contra*/
        if (contra.length< 8){
            return false;
        }
        /*Chequeo el mail*/
        let indiceArroba = mail.indexOf('@');
        if (indiceArroba === -1) {
            return false;
        }
        let indicePuntoDespues = mail.indexOf('.', indiceArroba);
        if (indicePuntoDespues === -1) {
            return false;
        }
        return true
    }

}

function mostrarMensaje(){
    const toastEl = document.getElementById('mensajeCrearCuenta');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
