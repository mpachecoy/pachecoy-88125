const nombreUsuario = document.getElementById("nombreUsuario")
const apellidoUsuario = document.getElementById("apellidoUsuario")
const edadUsuario = document.getElementById("edadUsuario")
const emailUsuario = document.getElementById("emailUsuario")
const obraSocial = document.getElementById("obraSocial")
const listaUsuarios = document.getElementById("listaUsuarios")
const guardarFormulario = document.getElementById("formUsuario")


const URL = "../db/usuarios.json"
let usuarios = []

function obtenerUsuarios (){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        usuarios = data
        console.log("Usuarios cargados", usuarios)
    })
    .catch(err => console.log("Error en la peticion",err))
    .finally( () => console.log("Peticion finalizada"))
}
obtenerUsuarios()

function generarID() {
    return Math.floor(Math.random() * 1000);
}

function guardarUsuario(e) {
    e.preventDefault()
    const nombre = nombreUsuario.value
    const apellido = apellidoUsuario.value
    const edad = edadUsuario.value
    const email = emailUsuario.value
    const obra = obraSocial.value

    if (nombre === "" || apellido === "" || edad === "" || email === "") {
        alert("Complete todos los campos")
        return
    }

    const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (
        !soloTexto.test(nombre) ||
        !soloTexto.test(apellido) ||
        !soloTexto.test(obra)
    ) {
        alert("Solo se permiten letras");
        return;
    }

    if (edad <= 0) {
        alert("Edad no permitida")
        return
    }

    const existe = usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase())
    if (existe) {
        alert("Ya existe un usuario con ese nombre")
        return
    }

    const nuevoUsuario = {
        id: generarID(),
        nombre,
        apellido,
        edad,
        email,
        obraSocial: obra || Particular
    }

    usuarios.push(nuevoUsuario)
    console.log("Nuevo usuario", nuevoUsuario)

    nombreUsuario.value = ""
    apellidoUsuario.value = ""
    emailUsuario.value = ""
    edadUsuario.value = ""
    obraSocial.value = ""
}

guardarFormulario.addEventListener("submit", guardarUsuario)
console.log(usuarios)
