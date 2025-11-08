const nombreIngresado = document.getElementById("nombreUsuario")
const apellidoIngresado = document.getElementById("apellidoUsuario")
const emailIngresado = document.getElementById("emailUsuario")
const buttonValidar = document.getElementById("validarUsuario")
const buttonGuardar = document.getElementById("guardarTurno")
const turnosSacados = document.getElementById("listaTurnos")
const calendario = document.getElementById("calendar")
const selectMedico = document.getElementById("medico")
const selectHorario = document.getElementById("horarioTurno")

let turnos = JSON.parse(localStorage.getItem("turnos")) || []
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let medicos = JSON.parse(localStorage.getItem("medicos")) || []

let usuarioValido = null
let fechaSeleccionada = null

function validarUsuario() {
  const nombre = nombreUsuario.value
  const apellido = apellidoUsuario.value
  const email = emailUsuario.value

  if (nombre === "" || apellido === "" || email === "") {
    Swal.fire({
      icon: "error",
      title: "Complete los datos",
    })
    return
  }

  const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (
    !soloTexto.test(nombre) ||
    !soloTexto.test(apellido)
  ) {
    Swal.fire({
      icon: "error",
      title: "Datos inválidos",
      text: "Solo se permiten letras."
    })
    return
  }

  const existe = usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase())

  if (existe) {
    usuarioValido = existe
    mostrarCalendario()

  } else {
    Swal.fire({
      title: "Usuario no encontrado",
      text: "¿Desea crear un nuevo usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, crear",
      cancelButtonText: "No"
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.href = "./crear-usuarios.html"
      }
    })
  }
}

function mostrarCalendario() {
  calendario.innerHTML = `
    <input type="date" id="fechaTurno" class="input-fecha">
  `
  const inputFecha = document.getElementById("fechaTurno")

  inputFecha.addEventListener("change", (e) => {
    fechaSeleccionada = e.target.value
    Swal.fire("Fecha seleccionada", fechaSeleccionada, "info")
  })

  const horariosDisponibles = [
    "08:00", "09:00", "10:00", "11:00",
    "14:00", "15:00", "16:00", "17:00"
  ]

  if (selectHorario) selectHorario.innerHTML = ""

  horariosDisponibles.forEach(h => {
    const option = document.createElement("option")
    option.value = h
    option.textContent = h
    selectHorario.appendChild(option)
  })
}

function guardarTurno() {
  if (!usuarioValido) {
    Swal.fire("Error", "Debe validar un usuario antes", "error")
    return
  }

  const horarioSeleccionado = selectHorario ? selectHorario.value : null

  if (!fechaSeleccionada || !horarioSeleccionado) {
    Swal.fire("Atención", "Debe seleccionar fecha y horario", "warning")
    return
  }

  const nuevoTurno = {
    nombre: usuarioValido.nombre || nombreIngresado.value,
    apellido: usuarioValido.apellido || apellidoIngresado.value,
    email: usuarioValido.email || emailIngresado.value,
    medico: selectMedico ? selectMedico.value : "Sin asignar",
    fecha: fechaSeleccionada,
    horario: horarioSeleccionado
  }

  turnos.push(nuevoTurno)
  localStorage.setItem("turnos", JSON.stringify(turnos))

  Swal.fire("Turno guardado", `Para el ${nuevoTurno.fecha} a las ${nuevoTurno.horario}`, "success")

  mostrarTurnos()

  nombreIngresado.value = ""
  apellidoIngresado.value = ""
  emailIngresado.value = ""
  fechaSeleccionada = null
}


function mostrarTurnos() {
  turnosSacados.innerHTML = ""
  if (turnos.length === 0) {
    turnosSacados.innerHTML = "<p>No hay turnos registrados</p>"
    return
  }

  turnos.forEach((turno, index) => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
      <strong>${turno.nombre} ${turno.apellido}</strong><br>
      Médico: ${turno.medico}<br>
      Fecha: ${turno.fecha}<br>
      Hora: ${turno.horario}<br>
      <hr>
    `
    const btnEliminar = document.createElement("button")
    btnEliminar.textContent = "Eliminar"
    btnEliminar.addEventListener("click", () => eliminarTurno(index))

    div.appendChild(btnEliminar)
    turnosSacados.appendChild(div)
  })
}

function eliminarTurno(index) {
  Swal.fire({
    title: "¿Eliminar turno?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      turnos.splice(index, 1)
      localStorage.setItem("turnos", JSON.stringify(turnos))
      mostrarTurnos()
      Swal.fire("Eliminado", "El turno fue eliminado", "success")
    }
  })
}


buttonValidar.addEventListener("click", validarUsuario)
buttonGuardar.addEventListener("click", guardarTurno)

mostrarTurnos()






