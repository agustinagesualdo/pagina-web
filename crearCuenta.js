document.getElementById('botonCrear').addEventListener ('click', function (e){
    e.preventDefault();
    const nombre = document.getElementById ('nombre').value;
    const mail = document.getElementById ('mail').value;
    const contrasena = document.getElementById ('contrasena').value;
    const fecha = document.getElementById ('fecha').value;

    let usuario = {mail:mail, contrasena:contrasena};

    let existe = verificarUsuario (usuario);
    let valido = validarIngreso(nombre, mail, contrasena, fecha);

    // AVISO SI FALTAN COMPLETAR DATOS
    if (!valido){
        alert ('Chequear los campos!');
    }else{
        if (!existe){ // VERIFICO QUE NO HAYA UN USUARIO REGISTRADO CON ESE MAIL 
            let nuevoUsuario = {nombre:nombre, mail:mail, contrasena:contrasena, fecha:fecha}
            localStorage.setItem("usuario_" + mail, JSON.stringify(nuevoUsuario));
            localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario)); 
            // AVISO QUE SE CREO EL USUARIO
            mostrarMensaje();
            // CUANDO CIERRE EL TOAST QUIERO QUE LO REDIRIGA A LA PAGINA DEL USUARIO INGRESADO 
            document.getElementById('cerrarCrearCuenta').addEventListener('click', function(){
                window.location.href = "usuarioIngresado.html";
            })
        }else{
            alert('Ya se ha registrado ese mail')
        }
    }

})

// VALIDO QUE NO HAYA UN USUARIO CON ESE MAIL YA  
function obtenerUsuariosGuardados() {
    let usuarios = [];

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);

        // GUARDO CADA MAIL DEL USUARIO (LOS HABIA GUARDADO EN FORMATO usuario_mail)
        if (clave.slice(0, 8) === "usuario_") {
            let datos = JSON.parse(localStorage.getItem(clave));
            usuarios.push(datos);
        }
    }

    return usuarios;
}

function verificarUsuario(mailBuscado) {
    // ME FIJO SI YA HAY UN USUARIO EN LA LISTA DE LOS USUARIOS GUARDADOS CON ESE MAIL
    const usuarios = obtenerUsuariosGuardados();

    return usuarios.some(usuario => usuario.mail === mailBuscado);
}

// VALIDO LOS INGRESOS
function validarIngreso (nombre, mail, contra, fecha){
    // CHEQUEO QUE NADA ESTE VACIO
    if ((nombre.trim() === '') || (mail === '') || (contra === '') || (fecha === '')){
        return false;
    }else{
        // CHEQUEO QUE EL NOMBRE NO TENGA NÚMEROS NI OTROS CARACTERES
        for (let i = 0; i < nombre.length; i++) {
            let letra = nombre[i];
            if (!((letra >= 'a' && letra <= 'z') || (letra >= 'A' && letra <= 'Z') || letra === ' ')) {
                return false;
            }
        }
        // CHEQUEO QUE LA CONTRASENA TENGA MAS DE 8 DIGITOS
        if (contra.length< 8){
            return false;
        }
        // CHEQUEO QUE EL MAIL TENGA UN @ Y UN .
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

// AVISO AL USUARIO QUE YA SE CREO EL USUARIO
function mostrarMensaje(){
    const toastEl = document.getElementById('mensajeCrearCuenta');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
