const nombreMedico = document.getElementById("nombreMedico")
const apellidoMedico = document.getElementById("apellidoMedico")
const especialidadMedico = document.getElementById("especialidadMedico")
const listaMedicos = document.getElementById("listaMedicos")
const guardarFormulario = document.getElementById("formMedico")

const URL = "../db/medicos.json"

function obtenerMedicos (){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        usuarios = data
        console.log("Medicoss cargados", usuarios)
    })
    .catch(err => console.log("Error en la peticion",err))
    .finally( () => console.log("Peticion finalizada"))
}
obtenerMedicos()


let medicos = JSON.parse(localStorage.getItem("medicos")) || []

function generarID() {
    return Math.floor(Math.random() * 1000);
}

function guardarMedico(e) {
    e.preventDefault()
    const nombre = nombreMedico.value
    const apellido = apellidoMedico.value
    const especialidad = especialidadMedico.value

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

    const nuevoMedico = ({ 
        id: generarID(),
        nombre, 
        apellido, 
        especialidad 
    })

    medicos.push(nuevoMedico)
    localStorage.setItem("medicos", JSON.stringify(medicos))

    nombreMedico.value = ""
    apellidoMedico.value = ""
    especialidadMedico.value = ""
}


guardarFormulario.addEventListener("submit", guardarMedico)
