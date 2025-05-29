let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos = [
    {id: 1, nombre: 'Reloj Italy', precio: 50000},
    {id: 2, nombre: 'Reloj Lana', precio: 48000},
    {id: 3, nombre: 'Collar colors', precio: 30000},
    {id: 4, nombre: 'Collar Beach', precio: 25000},

    {id: 5, nombre: 'Esclava All Golden', precio: 28000},
    {id: 6, nombre: 'Esclava Taylor', precio: 22000},
    {id: 7, nombre: 'Mix Pulseras Boho Chic', precio: 20000},
    {id: 8, nombre: 'Esclava Olivia', precio: 25000},

    {id: 9, nombre: 'Pack Anillos Trendy', precio: 50000},
    {id: 10, nombre: 'Pack Anillos Lover', precio: 30000},
    {id: 11, nombre: 'Anillo Flower', precio: 18000},
    {id: 12, nombre: 'Pack Anillos Soft', precio: 22000},
]

//
document.addEventListener('DOMContentLoaded', function () {
    const botonesAgregar = document.querySelectorAll('.botonAgregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault(); 
            const id = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    });
});

function agregarAlCarrito(indice) {
    for (let i=0; i<productos.length; i++){
        let producto = productos[i];
        if (indice === producto.id){
            const productoAgregar = {id: indice, nombre: producto.nombre, precio: producto.precio}
        }
    }

    const itemEnCarrito = carrito.find(producto => producto.id === id);
    if (itemEnCarrito){
        itemEnCarrito.cantidad = itemEnCarrito.cantidad + 1

    }else{
        carrito.push(productoAgregar);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Se agrego ${itemEnCarrito} con éxito`);
    //actualizarCarrito ();
}



