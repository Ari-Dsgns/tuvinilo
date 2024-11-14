const containerCards= document.getElementById("productContainer");
const cantidadElement= document.getElementById("unidades");
const precioElement= document.getElementById("precio");
const cartVacioElement= document.getElementById("cart-vacio");
const totalesElement= document.getElementById("totales");
const payElement= document.getElementById("pay");



function crearCardsInicio(){

    

    containerCards.innerHTML="";

    const productos=JSON.parse(localStorage.getItem("vinilos"));
    console.log(productos);
    
    if(productos && productos.length > 0){

        productos.forEach ((vinilo=>{

        const nuevoVinilo=document.createElement("div");
        nuevoVinilo.classList= "tarjeta-producto";
        nuevoVinilo.innerHTML=`
            
                <img src="${vinilo.image}">
                <div>
                <h3>${vinilo.title}</h3>
                <h4>${vinilo.subtitle}</h4>
                <p>${vinilo.price}€</p>
                </div>
                <div>
                <button class="btn-add">-</button>
                <span class="cantidad">${vinilo.cantidad}</span>
                <button class="btn-add">+</button>
                </div>
            
        
        `
        containerCards.appendChild(nuevoVinilo);

        nuevoVinilo.getElementsByTagName("button")[1].addEventListener("click",(e)=>{

            const cuentaElement=e.target.parentElement.getElementsByTagName("span")[0];
            cuentaElement.innerHTML=agregarAlcarrito(vinilo);

            actualizarTotales()
        });

        nuevoVinilo.getElementsByTagName("button")[0].addEventListener("click",(e)=>{
            restarAlcarrito(vinilo);

            Toastify({

                text: "Producto eliminado del carrito",
                
                duration: 1500,

                
                }).showToast();
              
            crearCardsInicio();
            actualizarTotales();
        
        });
    }));
    };

    revisarMensajeVacio();
    actualizarTotales()
    actualizarNumeroCarrito()
};

crearCardsInicio();




function actualizarTotales(){
    const productos=JSON.parse(localStorage.getItem("vinilos"));
    let cantidad=0;
    let precio=0;
    if(productos && productos.length>0){
        productos.forEach(producto=>{
            cantidad+=producto.cantidad;
            precio+=producto.price * producto.cantidad;
        });
    }
    cantidadElement.innerText=cantidad;
    precioElement.innerText=precio;

    
    
};

function revisarMensajeVacio(){
    const productos=JSON.parse(localStorage.getItem("vinilos")) || [];
    
    cartVacioElement.classList.toggle("escondido",productos && productos.length>0);
    totalesElement.classList.toggle("escondido",!(productos && productos.length>0));

};


    const productos=JSON.parse(localStorage.getItem("vinilos")) || [];
    if(productos && productos.length >0){
        localStorage.removeItem("vinilos");
        

        payElement.addEventListener("click",(e)=>actualizarTotales());
        console.log("has hecho click " ,payElement)

        


    }







