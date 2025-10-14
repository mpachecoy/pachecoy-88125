const nombreIngresado = document.getElementById("nombre")
const fechaIngresada = document.getElementById("fecha")
const turnosSacados = document.getElementById("listaTurnos")
const buttonGuardar = document.getElementById("guardarTurno")

let turnos = JSON.parse(localStorage.getItem("turnos")) || []
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

function guardarTurno() {
  const nombre = nombreIngresado.value
  const fecha = fechaIngresada.value

  if (nombre === "" || fecha === "") {
    alert("Complete todos los campos")
    return
  }

  const existe = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase())

  if (existe) {
    turnos.push({ nombre, fecha })
    localStorage.setItem("turnos", JSON.stringify(turnos))
    mostrarTurnos()
  } else {
    alert("Debe crear un nuevo usuario")
    window.location.href = "./usuarios.html"
    return
  }

  nombreIngresado.value = ""
  fechaIngresada.value = ""
}

function eliminarTurno(index) {
  turnos.splice(index, 1)
  localStorage.setItem("turnos", JSON.stringify(turnos))
  mostrarTurnos()
}


function mostrarTurnos() {
  turnosSacados.innerHTML = ""
  turnos.forEach((turno, index) => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
      <strong>${turno.nombre}</strong><br>
      Fecha: ${turno.fecha}<br>
      <hr>
    `
    const buttonEliminar = document.createElement("button")
    buttonEliminar.innerText = "Eliminar"
    buttonEliminar.addEventListener("click", () => eliminarTurno(index))

    div.appendChild(buttonEliminar)
    turnosSacados.appendChild(div)
  })
}

buttonGuardar.addEventListener("click", guardarTurno)

mostrarTurnos()