let listaPedidos = [];

const botonEnviar = document.getElementById ('botonEnviar').addEventListener ('click', function (event){
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value.trim();
    const medio = document.getElementById('medio').value;
    
    let valido = validarEntrada (nombre, telefono, medio);
    if (valido) {
        enviarOrden (nombre, telefono, medio);
        mostrarMensaje();
    }else{
        alert ('Chequea bien todos los campos! ')
    }
})

function validarEntrada (nom, tel, medio){
    if ((nom.trim() === '') || (tel === '') || (medio === '')){
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
        return true
    }
}

// HAGO UNA LISTA CON LOS PEDIDOS 
function enviarOrden(nombre, telefono, medio){
    let orden = {nombre: nombre, telefono:telefono, medio:medio};
    listaPedidos.push (orden);
    console.log (listaPedidos);
}

// MUESTRO AL USUARIO QUE SE MANDO BIEN EL PEDIDO
function mostrarMensaje(){
    const mensajeExito = document.getElementById('mensaje');
    const toast = new bootstrap.Toast(mensajeExito); 
    toast.show();
}

