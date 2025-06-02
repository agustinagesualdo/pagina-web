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
        reclamoEnviado();
    }else{
        alert ('Chequea bien todos los campos! ')
    }
})

function validarEntrada (nom, mail, tel, asunto){
    if ((nom.trim() === '') || (mail === '') || (tel === '') || (asunto === '')){
        return false;
    }else{
        // VALIDO QUE EL NOMBRE NO TENGA NUMEROS NI CARACTERES RAROS
        for (let i = 0; i < nom.length; i++) {
            let letra = nom[i];
            if (!((letra >= 'a' && letra <= 'z') || (letra >= 'A' && letra <= 'Z') || letra === ' ')) {
                return false;
            }
        }
        // VALIDO QUE EL TELEFONO TENGA MAS DE 8 DIGITOS
        if (tel.length< 8){
            return false;
        }
        // VALIDO QUE EL MAIL TENGA UN @ Y QUE DSP TENGA UN . 
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

// HAGO UNA LISTA CON LOS RECLAMOS 
function enviarReclamo(nombre, mail, telefono, asunto){
    let reclamo = {nombre: nombre, mail: mail, telefono:telefono, asunto:asunto};
    listaReclamos.push (reclamo);
    console.log (listaReclamos)
}

// MUESTRO AL USUARIO QUE SE MANDO BIEN EL RECLAMO
function reclamoEnviado(){
    const mensajeExito = document.getElementById('mensaje');
    const toast = new bootstrap.Toast(mensajeExito); 
    toast.show();
}

