const containerCards= document.getElementById("productContainer");

function crearCardsInicio(){


    fetch("./data.json").then(response=>response.json())
// .then((data)=>console.log(data))
.then((data)=>{
    data.forEach((vinilo)=>{
        
        const cardElement=document.createElement("div");
        cardElement.classList="tarjeta-producto"
        cardElement.innerHTML=`
        
        <img id="img" src="${vinilo.image}">
            <div id="div">
                <h5>${vinilo.title}</h5>
                <h6>${vinilo.subtitle}</h6>
                <p>${vinilo.price}€</p>
                <button id="btn">Agregar <i class="bi bi-bag"></i></button>
            </div>
        
        `
        containerCards.append(cardElement)
        cardElement.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlcarrito(vinilo))
    })
})
}

crearCardsInicio();


