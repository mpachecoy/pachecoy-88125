const listaUsuarios = document.getElementById("listaUsuarios")
const editarUsuarioContainer = document.getElementById("editarUsuarioContainer")
const formEditarUsuario = document.getElementById("formEditarUsuario")
const editarNombre = document.getElementById("editarNombre")
const editarApellido = document.getElementById("editarApellido")
const editarEdad = document.getElementById("editarEdad")
const editarEmail = document.getElementById("editarEmail")
const editarObraSocial = document.getElementById("editarObraSocial")
const cancelarEdicion = document.getElementById("cancelarEdicion")

const URL = "../db/usuarios.json"
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

let usuarioEnEdicion = null

function obtenerUsuarios() {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const emailLocalStorage = usuarios.map(usuario => usuario.email.toLowerCase())
            const nuevosUsuariosDB = data.filter(usuarioDB => !emailLocalStorage.includes(usuarioDB.email.toLowerCase()))
            if (nuevosUsuariosDB.length > 0) {
                usuarios.push(...nuevosUsuariosDB)
                localStorage.setItem("usuarios", JSON.stringify(usuarios))
                console.log(`${nuevosUsuariosDB.length} usuarios cargados`)
            } else {
                console.log("No hay usuarios nuevos en DB")
            }
        })
        .catch(err => console.log("Error en la peticion", err))
        .finally(() => console.log("Peticion finalizada"))
}
obtenerUsuarios()

function mostrarUsuarios() {
    listaUsuarios.innerHTML = ""

    usuarios.forEach((usuario, index) => {
        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
            <strong>${usuario.apellido}, ${usuario.nombre}</strong>
            <br>
            Edad: ${usuario.edad} años 
            <br>
            Obra Social: ${usuario.obraSocial} 
            <br>
            <hr>
            <a href="./crear-turnos.html" class="btn"> Sacar Turno</a>
        `
        const buttonEditar = document.createElement("button")
        buttonEditar.innerText = "Editar usuario"
        buttonEditar.addEventListener("click", () => editarUsuario(usuario, index))

        const buttonEliminar = document.createElement("button")
        buttonEliminar.innerText = "Eliminar"
        buttonEliminar.addEventListener("click", () => eliminarUsuario(index))

        div.appendChild(buttonEditar)
        div.appendChild(buttonEliminar)
        listaUsuarios.appendChild(div)
    })
}

function editarUsuario(usuario, index) {
    usuarioEnEdicion = index
    editarUsuarioContainer.style.display = "block"

    editarNombre.value = usuario.nombre
    editarApellido.value = usuario.apellido
    editarEdad.value = usuario.edad
    editarEmail.value = usuario.email
    editarObraSocial.value = usuario.obraSocial || ""
}


formEditarUsuario.addEventListener("submit", (e) => {
    e.preventDefault()

    if (usuarioEnEdicion === null) return

    usuarios[usuarioEnEdicion] = {
        ...usuarios[usuarioEnEdicion],
        nombre: editarNombre.value,
        apellido: editarApellido.value,
        edad: parseInt(editarEdad.value),
        email: editarEmail.value,
        obraSocial: editarObraSocial.value || "Particular"
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    mostrarUsuarios()

    Swal.fire({
        icon: "success",
        title: "Usuario Editado",
        text: "Editado correctamente.",
        showConfirmButton: false,
        timer: 2000
    })
    formEditarUsuario.reset()
    editarUsuarioContainer.style.display = "none"
    usuarioEnEdicion = null
})

cancelarEdicion.addEventListener("click", () => {
    formEditarUsuario.reset()
    editarUsuarioContainer.style.display = "none"
    usuarioEnEdicion = null
})

function eliminarUsuario(index) {
    usuarios.splice(index, 1)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    mostrarUsuarios()

    Swal.fire({
        icon: "success",
        title: "Usuario Eliminado",
        text: "Eliminado correctamente.",
        showConfirmButton: false,
        timer: 2000
    })
}

mostrarUsuarios()
obtenerUsuarios()