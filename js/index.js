const containerCards = document.getElementById("productContainer");
const containerCart = document.getElementById("productContainerCart");
const cantidadElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const cartVacioElement = document.getElementById("cart-vacio");
const totalesElement = document.getElementById("totales");
const closeBtn = document.querySelector(".sideCart #close-x");


const desplegable=document.querySelector("#prod")

desplegable.addEventListener("click", ()=>{
    bodyElement.classList.toggle("desplegableActive")
})




closeBtn.addEventListener("click", () => {
  bodyElement.classList.toggle("activeSideCart");
});

const btnComprar = document.getElementById("pagar");
btnComprar.addEventListener("click", reiniciarCart);

const iconCart = document
  .querySelector("#carrito")
  .addEventListener("click", () => {
    bodyElement.classList.toggle("activeSideCart");
  });

const bodyElement = document.querySelector("body");

const btnCompra = document.querySelectorAll("#btn2");

btnCompra.forEach((btn2) => {
  btn2.addEventListener("click", () => {
    Swal.fire({
      title: "Producto no disponible",
      text: "Te avisaremos cuando vuelva a estar en stock",
      confirmButtonColor: "#FF622D",
    });
  });
});

let ubiPrincipal = window.scrollY;

let $nav = document.querySelector("#nav");

window.addEventListener("scroll", function () {
  let ubiActual = window.scrollY;
  console.log(ubiActual);

  if (ubiPrincipal >= ubiActual) {
    $nav.style.top = "0px";
  } else {
    $nav.style.top = "-50px";
  }

  ubiPrincipal = ubiActual;
});

function crearCardsInicio() {
  fetch("./data.json")
    .then((response) => response.json())
    // .then((data)=>console.log(data))
    .then((data) => {
      data.forEach((vinilo) => {
        const cardElement = document.createElement("div");
        cardElement.classList = "tarjeta-producto";
        cardElement.innerHTML = `
        
        <img id="img" src="${vinilo.image}">
            <div id="div">
                <h5>${vinilo.title}</h5>
                <div id="sub2">
                  <h6>${vinilo.subtitle}</h6>
                  <p>${vinilo.price}€</p>
                </div>
                <button id="add-to-cart">Agregar <i id="bag"class="bi bi-bag"></i></button>
            </div>
        
        `;
        containerCards.append(cardElement);
        cardElement
          .getElementsByTagName("button")[0]
          .addEventListener("click", () => agregarAlcarrito(vinilo));
      });
    });
}

function cardsCart() {
  containerCart.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("vinilos"));
  //   console.log(productos);

  if (productos && productos.length > 0) {
    productos.forEach((vinilo) => {
      const nuevoVinilo = document.createElement("div");
      nuevoVinilo.classList = "tarjeta-cart";
      nuevoVinilo.innerHTML = `
              
                  <img src="${vinilo.image}">
                  <div id="tit-sub-pr">
                  <h3>${vinilo.title}</h3>
                  <h4>${vinilo.subtitle}</h4>
                  <p>${vinilo.price}€</p>
                  </div>
                  <div id="counters">
                  <button class="btn-add-sideCart">-</button>
                  <span class="cantidad">${vinilo.cantidad}</span>
                  <button class="btn-add-sideCart">+</button>
                  </div>
              
          
          `;
      containerCart.appendChild(nuevoVinilo);

      nuevoVinilo
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerHTML = agregarAlcarrito(vinilo);
          console.log(cuentaElement);

          actualizarTotales();
          actualizarNumeroCarrito();
        });

      nuevoVinilo
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlcarrito(vinilo);

          Toastify({
            text: "Producto eliminado del carrito",

            duration: 1500,

            style: {
              background:
                "linear-gradient(to right,rgb(255, 55, 44),rgb(255, 206, 157))",
            },

            offset: {
              x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
              y: 50, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();

          cardsCart();
          actualizarTotales();
        });
    });
  }

  revisarMensajeVacio();
  actualizarTotales();
}

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("vinilos"));
  let cantidad = 0;
  let precio = Math.round(0);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.price * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
}

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("vinilos")) || [];

  cartVacioElement.classList.toggle(
    "escondido",
    productos && productos.length > 0
  );
  totalesElement.classList.toggle(
    "escondido",
    !(productos && productos.length > 0)
  );
}

function reiniciarCart() {
  const nuevoStorage = localStorage.removeItem("vinilos") || [];

  actualizarNumeroCarrito();
  cardsCart();
  Swal.fire({
    title: "Compra finalizada",
    text: "Gracias por tu compra!",
    icon: "success",
    confirmButtonColor: "#FF622D",
  });

  bodyElement.classList.toggle("activeSideCart");

  actualizarTotales();
}

crearCardsInicio();

cardsCart();
