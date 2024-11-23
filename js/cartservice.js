function agregarAlcarrito(producto){

    const memoria=JSON.parse(localStorage.getItem("vinilos")) || [];// aqui parseamos(para que no nos devuelva un string) y leemos en la memoria si hay algun item que se llame vinilos
    console.log(memoria);

    let cuenta=0;

    if(!memoria){ //aqui validamos si memoria en null 
        const nuevoProducto=getNuevoProductoParaMemoria(producto);
        
        localStorage.setItem("vinilos",JSON.stringify([nuevoProducto]));//entramos en el local y seteamos el nuevo producto y el array convertido en string para que lo lea (saltamos a la creacion de la tarjeta)
        cuenta=1;
    }else{
        const indiceProducto= memoria.findIndex(vinilo=>vinilo.id===producto.id);
        // console.log(indiceProducto); 

        const nuevaMemoria=memoria;

        Toastify({

            text: `${producto.title} ${producto.subtitle} Agregado al carrito `,
            
            duration: 1500,

            

            
        }).showToast();

        if(indiceProducto=== -1) { // si el elemento no existe, devuelve -1, si existe nos dvuelve elarray y su posicion
            
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
            cuenta=1;
        }else{
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta=nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("vinilos",JSON.stringify(nuevaMemoria));
        

        
    };
    actualizarNumeroCarrito();
    return cuenta;




};


function restarAlcarrito(producto) {

    const memoria=JSON.parse(localStorage.getItem("vinilos")) || [];

    const indiceProducto= memoria.findIndex(vinilo=>vinilo.id===producto.id);

    if(memoria[indiceProducto].cantidad===1) {

        memoria.splice(indiceProducto,1);
        
        } else {

        memoria[indiceProducto].cantidad--;

        }

    localStorage.setItem("vinilos",JSON.stringify(memoria));
    actualizarNumeroCarrito()


}


//toma un produucto, le agrega cantidad 1 y lo devuelve//
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto=producto;  
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
};

const cuentaCarritoElement= document.getElementById("cuenta-carrito");


function actualizarNumeroCarrito(){
    let cuenta = 0;
    const memoria = JSON.parse(localStorage.getItem("vinilos"));
    if(memoria && memoria.length > 0){
      cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
      return cuentaCarritoElement.innerText = cuenta;
    }
    
};

actualizarNumeroCarrito()





