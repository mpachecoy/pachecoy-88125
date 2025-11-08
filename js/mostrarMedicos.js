const listaMedicos = document.getElementById("listaMedicos")
const editarMedicoConteiner = document.getElementById("editarMedicoContainer")
const formEditarMedico = document.getElementById("formEditarMedico")
const editarNombre = document.getElementById("editarNombre")
const editarApellido = document.getElementById("editarApellido")
const editarEdad = document.getElementById("editarEdad")
const editarEmail = document.getElementById("editarEmail")
const editarEspecialidad = document.getElementById("editarEspecialidad")
const cancelarEdicion = document.getElementById("cancelarEdicion")

const URL = "../db/medicos.json"
let medicos = JSON.parse(localStorage.getItem("medicos")) || []

let medicoEnEdicion = null

function obtenerMedicos() {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const emailLocalStorage = medicos.map(medico => medico.email.toLowerCase())
            const nuevosMedicoDB = data.filter(medicoDB => !emailLocalStorage.includes(medicoDB.email.toLowerCase()))
            if (nuevosMedicoDB.length > 0) {
                medicos.push(...nuevosMedicoDB)
                localStorage.setItem("usuarios", JSON.stringify(medicos))
                console.log(`${nuevosMedicoDB.length} medicos cargados`)
            } else {
                console.log("No hay medicos nuevos en DB")
            }
        })
        .catch(err => console.log("Error en la peticion", err))
        .finally(() => console.log("Peticion finalizada"))
}

function mostrarMedicos() {
    listaMedicos.innerHTML = ""

    medicos.forEach((medico, index) => {
        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
            <strong>${medico.nombre}  ${medico.apellido}</strong>
            <br>
            ID: ${medico.id} Email: ${medico.email}
            <br>
            Especialidad: ${medico.especialidad}
            <br>
        `
        const buttonEditar = document.createElement("button")
        buttonEditar.innerText = "Editar medico"
        buttonEditar.addEventListener("click", () => editarMedico(medico, index))

        const buttonEliminar = document.createElement("button")
        buttonEliminar.innerText = "Eliminar"
        buttonEliminar.addEventListener("click", () => eliminarMedico(index))

        div.appendChild(buttonEditar)
        div.appendChild(buttonEliminar)
        listaMedicos.appendChild(div)
    })
}

function editarMedico(medico, index) {
    medicoEnEdicion = index
    editarMedicoConteiner.style.display = "block"

    editarNombre.value = medico.nombre
    editarApellido.value = medico.apellido
    editarEmail.value = medico.email
    editarEspecialidad.value = medico.especialidad
}

formEditarMedico.addEventListener("submit", (e) => {
    e.preventDefault()

    if (medicoEnEdicion === null) return

    medicos[medicoEnEdicion] = {
        ...medicos[medicoEnEdicion],
        nombre: editarNombre.value,
        apellido: editarApellido.value,
        email: editarEmail.value,
        especialidad: editarEspecialidad.value
    }

    localStorage.setItem("medicos", JSON.stringify(medicos))
    mostrarMedicos()

    Swal.fire({
        icon: "success",
        title: "Medico Editado",
        text: "Editado correctamente.",
        showConfirmButton: false,
        timer: 2000
    })

    formEditarMedico.reset()
    editarMedicoConteiner.style.display = "none"
    medicoEnEdicion = null
})

cancelarEdicion.addEventListener("click", () => {
    formEditarMedico.reset()
    editarMedicoConteiner.style.display = "none"
    medicoEnEdicion = null
})

function eliminarMedico(index) {
    medicos.splice(index, 1)
    localStorage.setItem("medicos", JSON.stringify(medicos))
    mostrarMedicos()

    Swal.fire({
        icon: "success",
        title: "Medico Eliminado",
        text: "Eliminado correctamente.",
        showConfirmButton: false,
        timer: 2000
    })
}

mostrarMedicos()
obtenerMedicos()