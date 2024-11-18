const containerCards = document.getElementById("productContainer");
const cantidadElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const cartVacioElement = document.getElementById("cart-vacio");
const totalesElement = document.getElementById("totales");

function crearCardsInicio() {
  containerCards.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("vinilos"));
  //   console.log(productos);

  if (productos && productos.length > 0) {
    productos.forEach((vinilo) => {
      const nuevoVinilo = document.createElement("div");
      nuevoVinilo.classList = "tarjeta-producto";
      nuevoVinilo.innerHTML = `
            
                <img src="${vinilo.image}">
                <div id="tit-sub-pr">
                <h3>${vinilo.title}</h3>
                <h4>${vinilo.subtitle}</h4>
                <p>${vinilo.price}€</p>
                </div>
                <div id="counters">
                <button class="btn-add">-</button>
                <span class="cantidad">${vinilo.cantidad}</span>
                <button class="btn-add">+</button>
                </div>
            
        
        `;
      containerCards.appendChild(nuevoVinilo);

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
          }).showToast();

          crearCardsInicio();
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

const btnComprar = document.getElementById("pagar");
btnComprar.addEventListener("click", reiniciarCart);

function reiniciarCart() {
  const nuevoStorage = localStorage.removeItem("vinilos") || [];

  actualizarNumeroCarrito();
  crearCardsInicio();
  Swal.fire({
    title: "Compra finalizada",
    text: "Gracias por tu compra!",
    icon: "success",
  });

  actualizarTotales();
}

crearCardsInicio();
