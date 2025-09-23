const usuario = [];
const turnos = [];

let condicion = confirm("Bienvenido!, dale aceptar si no sos usuario");

while (condicion) {
    function createUser() {
        let nombre = prompt("Ingrese nombre");
        let edad = parseInt(prompt("Ingrese la edad"));
        let obraSocial = prompt("Ingrese su obra social");

        if (nombre != "" && edad != "" && obraSocial != "") {
            let nuevoUsuario = {
                nombre: nombre,
                edad: edad,
                obraSocial: obraSocial
            }
            usuario.push(nuevoUsuario)
            console.log(usuario);
            alert(`Bienvenido ${nombre}`);
        } else {
            alert("Ingrese los datos requeridos");
        }
        condicion = false;
    }
    createUser();
}

function pedirTurno() {
    let doctor = prompt("Ingreste con quien quiere el turno");
    let fecha = prompt("Ingrese la fecha");

    if (doctor != "" && fecha != "") {
        let nuevoTurno = {
            doctor: doctor,
            fecha: fecha
        }
        turnos.push(nuevoTurno);
        console.log(turnos);
        alert(`Su turno fue agendado correctamente`);
    } else {
        alert("Ingrese los datos requeridos");
    }
}

pedirTurno();
