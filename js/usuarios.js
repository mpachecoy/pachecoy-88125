// Elementos del DOM
const nombreUsuario = document.getElementById("nombreUsuario")
const edadUsuario = document.getElementById("edadUsuario")
const obraSocial = document.getElementById("obraSocial")
const listaUsuarios = document.getElementById("listaUsuarios")

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

function mostrarUsuarios() {
    listaUsuarios.innerHTML = ""

    usuarios.forEach((usuario) => {
        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
            <strong>${usuario.nombre}</strong> <br>
            Edad: ${usuario.edad} años <br>
            Obra Social: ${usuario.obraSocial} <br>
            <a href="./turnos.html" class="btn"> Sacar Turno</a>
        `
        listaUsuarios.appendChild(div)
    })
}

function guardarUsuario(e) {
    e.preventDefault()
    const nombre = nombreUsuario.value
    const edad = edadUsuario.value
    const obra = obraSocial.value

    if (nombre === "" || edad === "" || obra === "") {
        alert("Complete todos los campos")
        return
    }

    const existe = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase())
    if (existe) {
        alert("Ya existe un usuario con ese nombre")
        return
    }

    usuarios.push({ nombre, edad, obraSocial: obra })
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    mostrarUsuarios()

    nombreUsuario.value = ""
    edadUsuario.value = ""
    obraSocial.value = ""
}

document.getElementById("formUsuario").addEventListener("submit", guardarUsuario)

mostrarUsuarios()