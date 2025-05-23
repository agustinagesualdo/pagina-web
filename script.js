// CAMBIAR EL ESTILO DEL MENU CUANDO SE TOCA EL BOTON
const hamburguesa = document.getElementById("hamburguesa");
const cerrar = document.getElementById("botonCerrar");
hamburguesa.addEventListener('click', function(){
    hamburguesa.style.border = '0px';
    hamburguesa.style.outline = 'none';
    hamburguesa.style.boxShadow = 'none';
    botonCerrar.style.border = '0px';
    botonCerrar.style.outline = 'none';
    botonCerrar.style.boxShadow ='none';
})
