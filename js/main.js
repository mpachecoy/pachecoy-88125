const usuario = [];
const turnos = [];

let condicion = true;

while (condicion) {
  function createUser() {
    let nombre = prompt("Ingrese nombre");
    let age = parseInt(prompt("Ingrese la edad"));
    let obraSocial = prompt("Ingrese su obra social");

    if (nombre != "" && age != "" && obraSocial != "") {
      usuario.push(nombre, age, obraSocial);
      console.log(usuario);
      alert(`Bienvenido ${nombre}`)
      condicion = false
    } else {
      alert("Ingrese los datos requeridos");
    }
  }
  createUser();
}
