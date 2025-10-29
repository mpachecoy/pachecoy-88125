const listaMedicos = document.getElementById("listaMedicos")

const URL = "../db/medicos.json"
let medicos = JSON.parse(localStorage.getItem("medicos")) || []

function obtenerMedicos (){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        const emailLocalStorage = medicos.map(medico => medico.email.toLowerCase())
        const nuevosMedicoDB = data.filter(medicoDB => !emailLocalStorage.includes(medicoDB.email.toLowerCase()))
        if(nuevosMedicoDB.length > 0){
            medicos.push(...nuevosMedicoDB)
            localStorage.setItem("usuarios", JSON.stringify(medicos))
            console.log(`${nuevosMedicoDB.length} medicos cargados`)         
        } else {
            console.log("No hay medicos nuevos en DB")
        }
    })
    .catch(err => console.log("Error en la peticion",err))
    .finally( () => console.log("Peticion finalizada"))
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
        const buttonEliminar = document.createElement("button")
        buttonEliminar.innerText = "Eliminar"
        buttonEliminar.addEventListener("click", () => eliminarMedico(index))

        div.appendChild(buttonEliminar)
        listaMedicos.appendChild(div)
    })
}

function eliminarMedico(index) {
    medicos.splice(index, 1)
    localStorage.setItem("medicos", JSON.stringify(medicos))
    mostrarMedicos()
}

mostrarMedicos()
obtenerMedicos()