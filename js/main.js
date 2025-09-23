const usuario = [];
const turnos = [];

let condicion = confirm("Bienvenido!, dale aceptar si no sos usuario");

while (condicion) {
  function createUser() {
    let nombre = prompt("Ingrese nombre");
    let age = parseInt(prompt("Ingrese la edad"));
    let obraSocial = prompt("Ingrese su obra social");

    if (nombre != "" && age != "" && obraSocial != "") {
      usuario.push(nombre, age, obraSocial);
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
    turnos.push(doctor, fecha);
    console.log(turnos);
    alert(`Su turno fue agendado correctamente`);
  } else {
    alert("Ingrese los datos requeridos");
  }
}

pedirTurno();