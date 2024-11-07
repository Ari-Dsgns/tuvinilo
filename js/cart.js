const containerCards= document.getElementById("productContainer");

function crearCardsInicio(){

    containerCards.innerHTML="";

    const productos=JSON.parse(localStorage.getItem("vinilos"));
    console.log(productos);
    
    if(productos && productos.length > 0){
        productos.forEach (vinilo=>{

        const nuevoVinilo=document.createElement("div");
        console.log(nuevoVinilo)

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
                <span class="cantidad">0</span>
                <button class="btn-add">+</button>
                </div>
            
        
        `
        containerCards.appendChild(nuevoVinilo);

        nuevoVinilo.getElementsByTagName("button")[1].addEventListener("click",()=>agregarAlcarrito(vinilo));
        // agregarAlcarrito(vinilo);

        nuevoVinilo.getElementsByTagName("button")[0].addEventListener("click",()=>restarAlcarrito(vinilo));

        // restarAlcarrito(vinilo);
        // crearCardsInicio();
    });
    };
};

crearCardsInicio();