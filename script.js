
// PRODUCTOS QUE PUEDE RECONOCER BASFE

const productosBASFE = [
  { nombre: "Arroz", descripcion: "Alimento no perecedero." },
  { nombre: "Fideos", descripcion: "Alimento no perecedero." },
  { nombre: "Leche en polvo", descripcion: "Producto alimenticio envasado." },
  { nombre: "Harina", descripcion: "Alimento no perecedero." },
  { nombre: "Aceite", descripcion: "Producto alimenticio envasado." },
  { nombre: "Azúcar", descripcion: "Alimento no perecedero." },
  { nombre: "Lentejas", descripcion: "Legumbre no perecedera." },
  { nombre: "Puré de tomate", descripcion: "Producto alimenticio envasado." },
  { nombre: "Yerba", descripcion: "Producto alimenticio envasado." },
  { nombre: "Polenta", descripcion: "Alimento no perecedero." }
];

// LISTA DE DONACIONES

let donacionesBASFE = [];

// BUSCAR UN PRODUCTO

function buscarNecesidad(nombre) {
  const producto = productosBASFE.find(
    item => item.nombre.toLowerCase() === nombre.toLowerCase()
  );

  const resultado = document.getElementById("resultado-reconocimiento");

  if (resultado) {
    resultado.textContent = producto
      ? producto.nombre + ": " + producto.descripcion
      : "No reconocimos este producto.";
  }

  return producto;
}

// AGREGAR UN PRODUCTO A LAS DONACIONES

function agregarADonaciones(nombre) {
  const producto = buscarNecesidad(nombre);

  if (!producto) return;

  if (donacionesBASFE.includes(producto.nombre)) {
    return;
  }

  donacionesBASFE.push(producto.nombre);
  mostrarDonaciones();
}

// MOSTRAR LA LISTA DE DONACIONES

function mostrarDonaciones() {
  const lista = document.getElementById("lista-donaciones");

  if (!lista) return;

  lista.replaceChildren();

  donacionesBASFE.forEach(nombre => {
    const elemento = document.createElement("li");
    elemento.textContent = nombre;
    lista.appendChild(elemento);
  });
}

// PERMITIR QUE IA.JS UTILICE ESTAS FUNCIONES

window.productosBASFE = productosBASFE;
window.buscarNecesidad = buscarNecesidad;
window.agregarADonaciones = agregarADonaciones;
