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
                <h3>${vinilo.title}</h3>
                <h4>${vinilo.subtitle}</h4>
                <div id="precio-boton">
                    <p id="precio" >${vinilo.price}€</p>
                    <button id="btn">Agregar</button>
                </div>
            </div>
        `
        containerCards.append(cardElement)
        cardElement.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlcarrito(vinilo))
    })
})
}

crearCardsInicio();


