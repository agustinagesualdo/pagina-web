let listaPedidos = [];
let pedido = JSON.parse(localStorage.getItem('carrito')) || [];

const botonEnviar = document.getElementById ('botonEnviar').addEventListener ('click', function (event){
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value.trim();
    const medio = document.getElementById('medio').value;

    let valido = validarEntrada (nombre, telefono, medio);
    if (valido) {
        enviarOrden (nombre, telefono, medio);
        pagoRealizado();
        document.getElementById('botonCerrarPago').addEventListener('click', function (){ // CUANDO CIERRE EL TOAST QUIERO REDIRIGIR EL USUARIO A LA PAGINA CON SUS DATOS
                document.getElementById('nombre').value = '';
                document.getElementById('telefono').value = '';
                document.getElementById('medio').value = '';

                localStorage.removeItem('carrito');
                document.getElementById('listaCarrito').innerHTML = '';
                mostrarCarrito();
                window.location.href = "index.html";
        })
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
    let orden = {nombre: nombre, telefono:telefono, medio:medio, carrito:pedido};
    listaPedidos.push (orden);
    console.log (listaPedidos);
}

// MUESTRO AL USUARIO QUE SE MANDO BIEN EL PEDIDO
function pagoRealizado(){
    const mensajeExito = document.getElementById('pagoHecho');
    const toast = new bootstrap.Toast(mensajeExito); 
    toast.show();
}

