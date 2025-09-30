const pacientes = [];

let menu = parseInt(prompt("1- Usuario nuevo | 2- Pedir Turno | 3- Control Turnos | 4- Salir"))

function crearUsuario(nombre, edad, obraSocial) {
    if (nombre != " " && edad != " " && obraSocial != " ") {
        console.log(nombre)
        console.log(edad)
        console.log(obraSocial)
        let paciente = {
            nombre: nombre,
            edad: edad,
            obraSocial: obraSocial,
            turnos: []
        }
        pacientes.push(paciente)
        console.log(pacientes)
        alert("Bienvenido " + nombre);
    } else {
        alert("Ingrese los datos requeridos");
    }
}

function existeUsuario(nombre) {
    let paciente = pacientes.find(p => p.nombre.toLowerCase() === nombre.toLocaleLowerCase())

    if (paciente) {
        return paciente
    } else {
        alert("El paciente no existe")
        return null
    }
}

function pedirTurno(nombre, doctor, fecha) {
    let paciente = existeUsuario(nombre)
    if (!paciente) return


    if (doctor != "" && fecha != "") {
        let turnos = {
            doctor: doctor,
            fecha: fecha
        }
        paciente.turnos.push(turnos)

        alert("Su turno fue agendado correctamente");
    } else {
        alert("Ingrese los datos requeridos");
    }
}

function turnosSacados(nombre) {
    let paciente = existeUsuario(nombre)
    if (!paciente) return

    if (paciente.turnos.length !== 0) {
        let mensaje = "Turnos de: " + paciente.nombre + "\n\n"
        for (const turno of paciente.turnos) {
            mensaje += "Doctor: " + turno.doctor + " | Fecha: " + turno.fecha + "\n"
        }
        alert(mensaje)   
    } else {
        alert("No hay turnos actualmente")
    }
}

while (menu !== 4) {
    switch (menu) {
        case 1:
            let nombre = prompt("Ingrese nombre");
            let edad = parseInt(prompt("Ingrese la edad"));
            let obraSocial = prompt("Ingrese su obra social");

            crearUsuario(nombre, edad, obraSocial)
            break
        case 2:
            let nombreTurno = prompt("Ingrese nombre");
            let doctor = prompt("Ingreste con quien quiere el turno");
            let fecha = prompt("Ingrese la fecha");

            pedirTurno(nombreTurno, doctor, fecha)
            break
        case 3:
            let nombreConsulta = prompt("Ingrese nombre")
            turnosSacados(nombreConsulta)
            break
        default:
            alert("Elija una opcion valida")
    }
    menu = parseInt(prompt("1- Usuario nuevo | 2- Pedir Turno | 3- Control Turnos | 4- Salir"))
}

