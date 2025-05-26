let listaReclamos = [];

const botonEnviar = document.getElementById ('botonEnviar').addEventListener ('click', function (event){
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const mail = document.getElementById('mail').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value;
    
    let valido = validarEntrada (nombre, mail, telefono, asunto);
    if (valido) {
        enviarReclamo (nombre, mail, telefono, asunto);
        mostrarMensaje();
    }else{
        alert ('⚠️ Chequea bien los campos! ')
    }
})

function validarEntrada (nom, mail, tel, asunto){
    if ((nom.trim() === '') || (mail === '') || (tel === '') || (asunto === '')){
        return false;
    }else{
        /*Chequeo el nombre*/
        for (let i = 0; i < nom.length; i++) {
            let letra = nom[i];
            if (!((letra >= 'a' && letra <= 'z') || (letra >= 'A' && letra <= 'Z') || letra === ' ')) {
                return false;
            }
        }
        /*Chequeo el telefono*/
        if (tel.length< 8){
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

function enviarReclamo(nombre, mail, telefono, asunto){
    let reclamo = {nombre: nombre, mail: mail, telefono:telefono, asunto:asunto};
    listaReclamos.push (reclamo);
    console.log (listaReclamos)
}


function mostrarMensaje(){
    const toastEl = document.getElementById('mensaje');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
