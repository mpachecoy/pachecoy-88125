const nombreMedico = document.getElementById("nombreMedico")
const apellidoMedico = document.getElementById("apellidoMedico")
const emailMedico = document.getElementById("emailMedico")
const especialidadMedico = document.getElementById("especialidadMedico")
const listaMedicos = document.getElementById("listaMedicos")
const guardarFormulario = document.getElementById("formMedico")

const URL = "../db/medicos.json"
let medicos = JSON.parse(localStorage.getItem("medicos")) || []

function obtenerMedicos() {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const emailLocalStorage = medicos.map(medico => medico.email.toLowerCase())
            const nuevosMedicoDB = data.filter(medicoDB => !emailLocalStorage.includes(medicoDB.email.toLowerCase()))
            if (nuevosMedicoDB.length > 0) {
                medicos.push(...nuevosMedicoDB)
                localStorage.setItem("medicos", JSON.stringify(medicos))
                console.log(`${nuevosMedicoDB.length} medicos cargados`)
            } else {
                console.log("No hay medicos nuevos en DB")
            }
        })
        .catch(err => console.log("Error en la peticion", err))
        .finally(() => console.log("Peticion finalizada"))
}
obtenerMedicos()

function generarID() {
    return Math.floor(Math.random() * 1000);
}

function guardarMedico(e) {
    e.preventDefault()
    const nombre = nombreMedico.value
    const apellido = apellidoMedico.value
    const email = emailMedico.value
    const especialidad = especialidadMedico.value

    if (nombre === "" || especialidad === "" || apellido === "" || email === "") {
        Swal.fire({
            icon: "error",
            title: "Complete los datos",
        })
        return
    }

    const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (
        !soloTexto.test(nombre) ||
        !soloTexto.test(apellido) ||
        !soloTexto.test(especialidad)
    ) {
        Swal.fire({
            icon: "error",
            title: "Datos inválidos",
            text: "Solo se permiten letras."
        })
        return
    }

    const existe = medicos.find(medico => medico.email.toLowerCase() === email.toLowerCase())
    if (existe) {
        Swal.fire({
            icon: "error",
            title: "Ya estas registrado",
        })
        return
    }

    const nuevoMedico = ({
        id: generarID(),
        nombre,
        apellido,
        email,
        especialidad
    })

    medicos.push(nuevoMedico)
    localStorage.setItem("medicos", JSON.stringify(medicos))

    nombreMedico.value = ""
    apellidoMedico.value = ""
    emailMedico.value = ""
    especialidadMedico.value = ""

    Swal.fire({
        icon: "success",
        title: "Médico guardado",
        text: "El médico se registró correctamente.",
        showConfirmButton: false,
        timer: 2000
    })
}

guardarFormulario.addEventListener("submit", guardarMedico)
