const nombreIngresado = document.getElementById("nombreUsuario")
const apellidoIngresado = document.getElementById("apellidoUsuario")
const emailIngresado = document.getElementById("emailUsuario")
const buttonValidar = document.getElementById("validarUsuario")
const buttonGuardar = document.getElementById("guardarTurno")
const turnosSacados = document.getElementById("listaTurnos")
const calendario = document.getElementById("calendar")

let turnos = JSON.parse(localStorage.getItem("turnos")) || []
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let medicos = JSON.parse(localStorage.getItem("medicos")) || []

function validarUsuario() {
  const nombre = nombreIngresado.value
  const apellido = apellidoIngresado.value
  const email = emailIngresado.value

  if (nombre === "" || apellido === "" || email === "") {
    alert("Complete todos los campos")
    return
  }
  const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (
    !soloTexto.test(nombre) ||
    !soloTexto.test(apellido)
  ) {
    alert("Solo se permiten letras");
    return;
  }

  const existe = usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase())

  if (existe) {
    console.log("Usuario validado")
    mostrarCalendario()
    guardarTurno()
  } else {
    alert("Debe crear un nuevo usuario")
    window.location.href = "./crear-usuarios.html"
    return
  }
}

function guardarTurno() {


  nombreIngresado.value = ""
  apellidoIngresado.value = ""
  emailIngresado.value = ""

}

function eliminarTurno(index) {
  turnos.splice(index, 1)
  localStorage.setItem("turnos", JSON.stringify(turnos))
  mostrarTurnos()
}

function mostrarCalendario() {
  calendario.innerHTML = ""
  const script = document.createElement("script")
  script.innerHTML = `
                  document.addEventListener('DOMContentLoaded', () => {
                    const { Calendar } = window.VanillaCalendarPro;
                    const calendar = new Calendar('#calendar');
                    calendar.init();
                });
  `
  calendario.appendChild(script)
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

buttonValidar.addEventListener("click", validarUsuario)
buttonGuardar.addEventListener("click", guardarTurno)

mostrarTurnos()
