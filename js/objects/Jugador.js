class Jugador {
  nombre;
  cartas;
  puntuacion;

  constructor(nombre) {
    this.nombre = nombre;
    this.cartas = [];
    this.puntuacion = 0;
  }

  limpiarDatos() {
    this.cartas = [];
    this.puntuacion = 0;
  }

  async tirar() {
    let cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    let colores = ["P", "C", "D", "T"];
    let texto, templink;
    let indice = Math.floor(Math.random() * cartas.length);
    let color = Math.floor(Math.random() * colores.length);
    let link = `./images/${cartas[indice]}${colores[color]}.png`;
    this.cartas.push(link);
    let puntos = indice + 1;
    if (indice > 9) puntos = 11;
    this.puntuacion += puntos;
    if (this.cartas.length == 1 && this.nombre == "Banca") {
      texto = `${this.nombre} sacó esta carta`;
      templink = "./images/red.png";
    }
    let cards = document.querySelector(".cartas");
    if (this.nombre === "Banca") cards = document.querySelector(".cartasbanca");
    let element = document.createElement("img");
    element.src = link;
    element.classList.add("animate__animated", "animate__backInRight");
    if (this.cartas.length == 1 && this.nombre == "Banca") {
      element.src = "./images/red.png";
      element.classList.add("hidden");
    }

    cards.appendChild(element);
    texto = `${this.nombre} sacó esta carta`;
    await Swal.fire({
      text: texto,
      imageUrl: templink ? templink : link,
      imageWidth: 100,
      imageHeight: 150,
      imageAlt: "Carta",
      timer: 2000,
      background: "rgb(0 81 77)",
      color: "white",
      showConfirmButton: false,
    });
  }
}
