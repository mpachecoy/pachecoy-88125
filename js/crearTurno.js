const nombreIngresado = document.getElementById("nombreUsuario")
const apellidoIngresado = document.getElementById("apellidoUsuario")
const emailIngresado = document.getElementById("emailUsuario")
const buttonValidar = document.getElementById("validarUsuario")
const buttonGuardar = document.getElementById("guardarTurno")
const turnosSacados = document.getElementById("listaTurnos")
const calendario = document.getElementById("calendar")
const selectHorario = document.getElementById("horarioTurno")
const inputFecha = document.getElementById("fechaTurno")
const selectMedico = document.getElementById("medicoDisponible")
const selectEspecialidad = document.getElementById("especialidad")

let turnos = JSON.parse(localStorage.getItem("turnos")) || []
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let medicos = JSON.parse(localStorage.getItem("medicos")) || []

let usuarioValido = null
let fechaSeleccionada = null
const horariosDisponibles = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00"
]

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
  if (!soloTexto.test(nombre) || !soloTexto.test(apellido)) {
    Swal.fire({
      icon: "error",
      title: "Datos inválidos",
    })
    return
  }

  const existe = usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase())
  if (existe) {
    usuarioValido = existe
    mostrarCalendario()
    especialidadesDisponibles()
  } else {
    Swal.fire({
      title: "Usuario no encontrado",
      text: "¿Desea crear un nuevo usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.href = "./crear-usuarios.html"
      }
    })
  }
}

function mostrarCalendario() {
  calendario.style.display = "block"
  inputFecha.addEventListener("change", (e) => {
    fechaSeleccionada = e.target.value
  })

  selectHorario.innerHTML = ""
  horariosDisponibles.forEach(h => {
    const option = document.createElement("option")
    option.value = h
    option.textContent = h
    selectHorario.appendChild(option)
  })
}

function especialidadesDisponibles() {
  const especialidades = [...new Set(medicos.map(m => m.especialidad))]

  selectEspecialidad.innerHTML = ""
  especialidades.forEach(esp => {
    const option = document.createElement("option")
    option.value = esp
    option.textContent = esp
    selectEspecialidad.appendChild(option)
  })
}

function medicosDisponibles() {
  selectMedico.innerHTML = ""
  const especialidadSelecionada = selectEspecialidad.value
  const medicosFiltrados = medicos.filter(m => m.especialidad === especialidadSelecionada)
  medicosFiltrados.forEach(m => {
    const option = document.createElement("option")
    option.value = m.nombre
    option.textContent = m.nombre
    selectMedico.appendChild(option)
  })
  horarioActulizado()
}

function horarioActulizado() {
  if (!selectMedico.value || !fechaSeleccionada) return
  selectHorario.innerHTML = ""

  const horariosOcupados = turnos.filter(t => t.medico === selectMedico.value && t.fecha === fechaSeleccionada).map(t => t.horario)
  horariosDisponibles.forEach(h => {
    const option = document.createElement("option")
    option.value = h
    option.textContent = h
    option.disabled = horariosOcupados.includes(h)
    selectHorario.appendChild(option)
  })
}

function guardarTurno() {
  if (!usuarioValido) {
    Swal.fire("Error", "Debe validar un usuario antes", "error")
    return
  }

  const medico = selectMedico.value
  const horario = selectHorario.value
  if (!fechaSeleccionada || !horario || !medico) {
    Swal.fire("Complete fecha, horario y médico", "", "warning")
    return
  }

  const yaExiste = turnos.some(t => t.medico === medico && t.fecha === fechaSeleccionada && t.horario === horario)
  if (yaExiste) {
    Swal.fire("Ese turno no esta disponible", "", "error")
    return
  }

  const nuevoTurno = {
    nombre: usuarioValido.nombre,
    apellido: usuarioValido.apellido,
    email: usuarioValido.email,
    medico: medico,
    fecha: fechaSeleccionada,
    horario: horario
  }

  turnos.push(nuevoTurno)
  localStorage.setItem("turnos", JSON.stringify(turnos))

  Swal.fire("Turno guardado", `Para el ${nuevoTurno.fecha} a las ${nuevoTurno.horario}`, "success")
  mostrarTurnos()

  nombreUsuario.value = ""
  apellidoUsuario.value = ""
  emailUsuario.value = ""
  calendario.style.display = "none"
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
    }
  })
}

buttonValidar.addEventListener("click", validarUsuario)
selectEspecialidad.addEventListener("change", medicosDisponibles)
selectMedico.addEventListener("change", horarioActulizado)
buttonGuardar.addEventListener("click", guardarTurno)

mostrarTurnos()






