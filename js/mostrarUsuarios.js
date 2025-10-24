const URL = "./db/usuarios.json"

function obtenerUsuarios (){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        const usuarios = data
    })
    .catch(err => console.log("Error en la peticion",err))
    .finally( () => console.log("Peticion finalizada"))
}

function mostrarUsuarios() {
    listaUsuarios.innerHTML = ""

    usuarios.forEach((usuario, index) => {
        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
            <strong>${usuario.nombre}</strong>
            <br>
            Edad: ${usuario.edad} años 
            <br>
            Obra Social: ${usuario.obraSocial} 
            <br>
            <hr>
            <a href="./turnos.html" class="btn"> Sacar Turno</a>
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