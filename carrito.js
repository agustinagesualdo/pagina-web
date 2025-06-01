let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let productos = [
    { id: 1, nombre: 'Reloj Italy', precio: 50000 },
    { id: 2, nombre: 'Reloj Lana', precio: 48000 },
    { id: 3, nombre: 'Collar colors', precio: 30000 },
    { id: 4, nombre: 'Collar Beach', precio: 25000 },
    { id: 5, nombre: 'Esclava All Golden', precio: 28000 },
    { id: 6, nombre: 'Esclava Taylor', precio: 22000 },
    { id: 7, nombre: 'Mix Pulseras Boho Chic', precio: 20000 },
    { id: 8, nombre: 'Esclava Olivia', precio: 25000 },
    { id: 9, nombre: 'Pack Anillos Trendy', precio: 50000 },
    { id: 10, nombre: 'Pack Anillos Lover', precio: 30000 },
    { id: 11, nombre: 'Anillo Flower', precio: 18000 },
    { id: 12, nombre: 'Pack Anillos Soft', precio: 22000 },
];

document.addEventListener('DOMContentLoaded', function () {
    const botonesAgregar = document.querySelectorAll('.botonAgregar');

    botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function (e) {
        e.preventDefault();
        const id = parseInt(this.getAttribute('data-id'));
        agregarAlCarrito(id);
    });
    });

  // CUANDO TOCO EL CARRITO QUIERO QUE ME MUESTRE LO QUE AGREGO EL USUARIO
    document.getElementById("carritoOffcanvas").addEventListener("show.bs.offcanvas", function () {
    mostrarCarrito();
    });
});

function agregarAlCarrito(indice) {
    const producto = productos.find(p => p.id === indice);
    if (!producto) return;

    const itemEnCarrito = carrito.find(p => p.id === indice);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1});
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Se agregó "${producto.nombre}" con éxito`);
}

function mostrarCarrito() {
    const contenedor = document.getElementById('listaCarrito');
    contenedor.innerHTML = ''; 

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p> No hay productos en el carrito todavía.</p>`;
        return;
    }else{
        carrito.forEach(item => {
        const nuevoProducto = `
        <div class="productoCarrito">
            <p><strong>${item.nombre}</strong></p>
            <p>Precio: $${item.precio}</p>
            <div class='botonesProducto'>
                <p>Cantidad: ${item.cantidad}</p>
                <button class='botonDisminuir' data-id='${item.id}'> - </button>
                <button class='botonAumentar' data-id='${item.id}'> + </button>
            </div>
            <hr>
        </div>
        `;
        contenedor.innerHTML += nuevoProducto;
    });

        if (!document.getElementById('botonEliminarTodos')){
            const contenedorBotonesEdicion = document.createElement ('div');
            contenedorBotonesEdicion.id = `contenedorBotonesEdicion`;
            const botonEliminarTodos = document.createElement('button');
            botonEliminarTodos.innerHTML = `Vaciar carrito`;
            botonEliminarTodos.id = `botonEliminarTodos`;

            const botonPagar = document.createElement('button');
            botonPagar.innerHTML = `Ir a pagar`;
            botonPagar.id = `botonPagar`;
            
            contenedorBotonesEdicion.appendChild (botonEliminarTodos);
            contenedorBotonesEdicion.appendChild(botonPagar);
            contenedor.appendChild(contenedorBotonesEdicion);

            botonEliminarTodos.addEventListener('click', () => {
                carrito = [];
                localStorage.setItem('carrito', JSON.stringify(carrito));
                mostrarCarrito();
            });
        }

    // SI EL USUARIO TOCA PAGAR QUE LO LLEVE A OTRA PAGINA
    document.getElementById('botonPagar').addEventListener('click', function(){
        window.location.href = "pago.html";
    })
        
    // AGREGO FUNCIONALIDADES PARA AUMENTAR/DISMINUIR CANTIDADES DE PRODUCTOS
    const botonesAumentar = document.querySelectorAll('.botonAumentar');
    const botonesDisminuir = document.querySelectorAll('.botonDisminuir');

    botonesAumentar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.getAttribute('data-id'));
            const item = carrito.find(p => p.id === id);
            item.cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        });
    });

    botonesDisminuir.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.getAttribute('data-id'));
            const item = carrito.find(p => p.id === id);
            if (item.cantidad > 1) {
                item.cantidad -= 1;
            } else {
                carrito = carrito.filter(p => p.id !== id); // SACO AL PRODUCTO DIRECTO SI DISMINUYE -1 (PARA QUE NO QUEDE EN 0)
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        });
    });
    }
}


