const listaUsuarios = document.getElementById("listaUsuarios")

const URL = "../db/usuarios.json"
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

function obtenerUsuarios (){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        const emailLocalStorage = usuarios.map(usuario => usuario.email.toLowerCase())
        const nuevosUsuariosDB = data.filter(usuarioDB => !emailLocalStorage.includes(usuarioDB.email.toLowerCase()))
        if(nuevosUsuariosDB.length > 0){
            usuarios.push(...nuevosUsuariosDB)
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            console.log(`${nuevosUsuariosDB.length} usuarios cargados`)         
        } else {
            console.log("No hay usuarios nuevos en DB")
        }
    })
    .catch(err => console.log("Error en la peticion",err))
    .finally( () => console.log("Peticion finalizada"))
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
        buttonEditar.addEventListener("click", () => editarUsuario(data))

        const buttonEliminar = document.createElement("button")
        buttonEliminar.innerText = "Eliminar"
        buttonEliminar.addEventListener("click", () => eliminarUsuario(index))

        div.appendChild(buttonEliminar)
        listaUsuarios.appendChild(div)
    })
}

function eliminarUsuario(index) {
    usuarios.splice(index, 1)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    mostrarUsuarios()
}

mostrarUsuarios()
obtenerUsuarios()