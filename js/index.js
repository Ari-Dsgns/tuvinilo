const containerCards= document.getElementById("productContainer");

function crearCardsInicio(productos){

    console.log(productos)
    

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
                <button>Agregar</button>
            </div>
        
        `
        

        containerCards.appendChild(nuevoVinilo);
        nuevoVinilo.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlcarrito(vinilo))

    })
}

crearCardsInicio(vinilos);


