const nombreMedico = document.getElementById("nombreMedico")
const apellidoMedico = document.getElementById("apellidoMedico")
const especialidadMedico = document.getElementById("especialidadMedico")
const listaMedicos = document.getElementById("listaMedicos")
const guardarFormulario = document.getElementById("formMedico")

let medicos = JSON.parse(localStorage.getItem("medicos")) || []

function guardarMedico(e) {
    e.preventDefault()
    const nombre = nombreMedico.value
    const apellido = apellidoMedico.value
    const especialidad = especialidadMedico.value
    console.log(nombre)

    if (nombre === "" || especialidad === "" || apellido === "") {
        alert("Complete todos los campos")
        return
    }

    const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (
        !soloTexto.test(nombre) ||
        !soloTexto.test(apellido) ||
        !soloTexto.test(especialidad)
    ) {
        alert("Solo se permiten letras en nombre, apellido y especialidad");
        return;
    }

    const existe = medicos.find(
        medico => medico.nombre.toLowerCase() === nombre.toLowerCase() && medico.apellido.toLowerCase() === apellido.toLowerCase());
    if (existe) {
        alert("Ya estas registrado")
        return
    }

    medicos.push({ nombre, apellido, especialidad })
    localStorage.setItem("medicos", JSON.stringify(medicos))
    mostrarMedicos()

    nombreMedico.value = ""
    apellidoMedico.value = ""
    especialidadMedico.value = ""
}

function eliminarMedico(index) {
    medicos.splice(index, 1)
    localStorage.setItem("medicos", JSON.stringify(medicos))
    mostrarMedicos()
}

function mostrarMedicos() {
    listaMedicos.innerHTML = ""

    medicos.forEach((medico, index) => {
        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
            <strong>${medico.nombre}  ${medico.apellido}</strong>
            <br>
            Especialidad: ${medico.especialidad}
            <br>
        `
        const buttonEliminar = document.createElement("button")
        buttonEliminar.innerText = "Eliminar"
        buttonEliminar.addEventListener("click", () => eliminarMedico(index))

        div.appendChild(buttonEliminar)
        listaMedicos.appendChild(div)
    })
}

guardarFormulario.addEventListener("submit", guardarMedico)

mostrarMedicos()