/* =====================================
   XINO STORE - SCRIPT FINAL PRO
===================================== */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosAdmin =
JSON.parse(localStorage.getItem("productosAdmin")) || [];

let startX = 0;
let moveX = 0;

/* =========================
   INICIO
========================= */

document.addEventListener("DOMContentLoaded", () => {

mostrarProductosAdmin();
mostrarCarrito();
actualizarContador();
activarBuscador();
activarSwipeCarrito();

});

/* =========================
   BUSCADOR
========================= */

function activarBuscador(){
const buscador = document.getElementById("buscador");

if(buscador){
buscador.addEventListener("input", buscarProductos);
}
}

function buscarProductos(){

let texto =
document.getElementById("buscador").value.toLowerCase();

let productos =
document.querySelectorAll(".producto-item");

productos.forEach(producto=>{

let contenido =
producto.innerText.toLowerCase();

producto.style.display =
contenido.includes(texto)
? "block"
: "none";

});

}

/* =========================
   CARRITO
========================= */

function agregarCarrito(nombre, precio){

let existe =
carrito.find(p=>p.nombre===nombre);

if(existe){
existe.cantidad++;
}else{
carrito.push({
nombre:nombre,
precio:precio,
cantidad:1
});
}

guardarCarrito();
mostrarCarrito();
actualizarContador();

toast("Producto agregado 🛒");

}

function eliminarProducto(index){

carrito.splice(index,1);

guardarCarrito();
mostrarCarrito();
actualizarContador();

toast("Producto eliminado");

}

function guardarCarrito(){
localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);
}

function mostrarCarrito(){

const lista =
document.getElementById("carrito");

const totalBox =
document.getElementById("total");

if(!lista || !totalBox) return;

lista.innerHTML = "";

let total = 0;

carrito.forEach((p,index)=>{

const li =
document.createElement("li");

li.className =
"list-group-item d-flex justify-content-between align-items-center";

li.innerHTML = `
<div>
<strong>${p.nombre}</strong><br>
<small>Cantidad: ${p.cantidad}</small>
</div>

<div>
$${p.precio * p.cantidad}

<button
class="btn btn-sm btn-danger ms-2"
onclick="eliminarProducto(${index})">
X
</button>
</div>
`;

lista.appendChild(li);

total += p.precio * p.cantidad;

});

totalBox.textContent = total;

}

function actualizarContador(){

let total = 0;

carrito.forEach(p=>{
total += p.cantidad;
});

const contador =
document.getElementById("contador");

const contador2 =
document.getElementById("contador2");

if(contador) contador.textContent = total;
if(contador2) contador2.textContent = total;

}

/* =========================
   PANEL CARRITO PRO
========================= */

function toggleCarrito(){

document.getElementById("panel-carrito")
.classList.add("activo");

document.getElementById("overlay")
.classList.add("activo");

/* ✅ NUEVO: bloquear scroll fondo */
document.body.classList.add("carrito-abierto");

}

function cerrarCarrito(){

document.getElementById("panel-carrito")
.classList.remove("activo");

document.getElementById("overlay")
.classList.remove("activo");

/* ✅ NUEVO: desbloquear scroll */
document.body.classList.remove("carrito-abierto");

}

/* =========================
   SWIPE CERRAR MOVIL
========================= */

function activarSwipeCarrito(){

const panel =
document.getElementById("panel-carrito");

if(!panel) return;

panel.addEventListener("touchstart", e=>{
startX = e.touches[0].clientX;
moveX = startX; /* ✅ NUEVO reset */
});

panel.addEventListener("touchmove", e=>{
moveX = e.touches[0].clientX;
});

panel.addEventListener("touchend", ()=>{

let diferencia = moveX - startX;

if(diferencia > 90){
cerrarCarrito();
}

/* ✅ NUEVO reset valores */
startX = 0;
moveX = 0;

});

}

/* =========================
   WHATSAPP PEDIDO
========================= */

function enviarWhatsApp(){

if(carrito.length===0){
alert("Tu carrito está vacío");
return;
}

let mensaje =
"Hola, quiero comprar:%0A";

let total = 0;

carrito.forEach(p=>{

mensaje +=
`- ${p.nombre} x${p.cantidad} = $${p.precio*p.cantidad}%0A`;

total += p.precio*p.cantidad;

});

mensaje += `%0ATotal: $${total}`;

window.open(
"https://wa.me/56978603436?text="+mensaje,
"_blank"
);

}

/* =========================
   PAGOS
========================= */

function abrirPago(){
document.getElementById("modalPago")
.classList.add("activo");
}

function cerrarPago(){
document.getElementById("modalPago")
.classList.remove("activo");
}

/* TRANSFERENCIA */

function transferenciaBancaria(){

if(carrito.length===0){
alert("Agrega productos primero");
return;
}

let opcion = prompt(
"1 = BancoEstado\n2 = Otro banco"
);

if(opcion==="1"){

toast("Pedido en espera ⏳");

window.open(
"https://wa.me/56978603436?text=Hola,%20voy%20a%20transferir%20desde%20BancoEstado",
"_blank"
);

}
else if(opcion==="2"){

toast("Pedido en espera ⏳");

window.open(
"https://wa.me/56978603436?text=Hola,%20tengo%20otro%20banco%20para%20transferir",
"_blank"
);

}
else{
alert("Opción inválida");
}

}

/* =========================
   ADMIN LOGIN
========================= */

function abrirLoginAdmin(){
document.getElementById("loginAdmin")
.classList.add("activo");
}

function cerrarLoginAdmin(){
document.getElementById("loginAdmin")
.classList.remove("activo");
}

function loginAdmin(){

let clave =
document.getElementById("claveAdmin").value;

if(clave==="xinoadmin"){

cerrarLoginAdmin();

document.getElementById("adminPanel")
.classList.add("activo");

toast("Bienvenido Admin");

}else{
alert("Contraseña incorrecta");
}

}

function cerrarAdmin(){
document.getElementById("adminPanel")
.classList.remove("activo");
}

/* =========================
   PRODUCTOS ADMIN
========================= */

function agregarProductoAdmin(){

let nombre =
document.getElementById("nuevoNombre").value;

let precio =
document.getElementById("nuevoPrecio").value;

let desc =
document.getElementById("nuevoDesc").value;

let img =
document.getElementById("nuevoImg").value;

if(nombre==="" || precio===""){
alert("Completa campos");
return;
}

productosAdmin.push({
nombre:nombre,
precio:Number(precio),
desc:desc,
img:img
});

localStorage.setItem(
"productosAdmin",
JSON.stringify(productosAdmin)
);

location.reload();

}

function mostrarProductosAdmin(){

const contenedor =
document.getElementById("productos-container");

if(!contenedor) return;

productosAdmin.forEach((p,index)=>{

const div =
document.createElement("div");

div.className =
"col-md-4 producto-item";

div.innerHTML = `
<div class="card producto-card h-100">

<img src="${p.img || 'producto1.jpg'}"
class="producto-img">

<div class="card-body text-center">

<h5>${p.nombre}</h5>

<p class="precio">$${p.precio}</p>

<p>${p.desc}</p>

<button
class="btn btn-dark w-100 mb-2"
onclick="agregarCarrito('${p.nombre}',${p.precio})">
Agregar
</button>

<button
class="btn btn-danger w-100"
onclick="eliminarProductoAdmin(${index})">
Eliminar
</button>

</div>
</div>
`;

contenedor.appendChild(div);

});

}

function eliminarProductoAdmin(index){

productosAdmin.splice(index,1);

localStorage.setItem(
"productosAdmin",
JSON.stringify(productosAdmin)
);

location.reload();

}

/* =========================
   TOAST
========================= */

function toast(texto){

const div =
document.createElement("div");

div.innerText = texto;

div.style.position="fixed";
div.style.bottom="20px";
div.style.left="50%";
div.style.transform="translateX(-50%)";
div.style.background="#111827";
div.style.color="white";
div.style.padding="12px 20px";
div.style.borderRadius="12px";
div.style.zIndex="99999";
div.style.boxShadow="0 12px 25px rgba(0,0,0,.2)";

document.body.appendChild(div);

setTimeout(()=>{
div.remove();
},2200);

}

/* =========================
   ESC CERRAR TODO
========================= */

document.addEventListener("keydown", e=>{

if(e.key==="Escape"){

cerrarCarrito();
cerrarPago();
cerrarLoginAdmin();
cerrarAdmin();

}

});