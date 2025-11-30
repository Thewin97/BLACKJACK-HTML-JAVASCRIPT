function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {
  let banca, player, nombre;
  while (!nombre) {
    nombre = await prompt("¿Cuál es tu nombre?");
  }
  banca = new Jugador("Banca");
  player = new Jugador(nombre);
  let msg = `Bienvenid@, ${player.nombre}, comienza jugando la banca`;
  await Swal.fire({
    text: msg,
    timer: 3000,
    showConfirmButton: false,
  });
  document.querySelector("h1").textContent = `${player.nombre}:`;
  let botonPedir = document.querySelector(".btn-success");
  let botonPlantar = document.querySelector(".btn-danger");

  while (banca.puntuacion < 17) {
    await banca.tirar();
  }

  document.querySelector("span").innerHTML = ""; // quita el texto "jugando"
  if (banca.puntuacion <= 21) {
    document
      .querySelectorAll("button")
      .forEach((btn) => btn.classList.remove("disabled"));
    document
      .querySelector("h1")
      .insertAdjacentHTML(
        "afterend",
        "<span class='badge rounded-pill text-bg-success btn-sm'>Jugando</span><br><br>"
      );

    await Swal.fire({
      text: "La banca se plantó. Es tu turno",
      icon: "success",
    });
  } else {
    VerGanador(banca, player);
  }

  botonPedir.addEventListener("click", async () => {
    await player.tirar();
    document.querySelector(
      "#jugadorTotal"
    ).textContent = `TOTAL: ${player.puntuacion}`;
    if (player.puntuacion > 21) {
      document
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.add("disabled"));
      VerGanador(banca, player);
    }
  });

  botonPlantar.addEventListener("click", () => {
    VerGanador(banca, player);
    document
      .querySelectorAll("button")
      .forEach((btn) => btn.classList.add("disabled"));
  });
}

async function VerGanador(totalBanca, totalJugador) {
  let msg, icon;

  if (totalJugador.puntuacion > 21) {
    msg = `Volaste (${totalJugador.puntuacion}). Gana la banca.`;
    icon = "error";
  } else if (totalBanca.puntuacion > 21) {
    msg = `La banca voló (${totalBanca.puntuacion}). ¡Ganaste!`;
    icon = "success";
  } else if (totalBanca.puntuacion > totalJugador.puntuacion) {
    msg = `Gana la banca con ${totalBanca.puntuacion}`;
    icon = "error";
  } else if (totalJugador.puntuacion > totalBanca.puntuacion) {
    msg = `¡Ganaste con ${totalJugador.puntuacion}!`;
    icon = "success";
  } else {
    msg = `Empate a ${totalJugador.puntuacion}`;
    icon = "warning";
  }
  let cartaOculta = document.querySelector(".hidden");
  cartaOculta.src = totalBanca.cartas[0];
  await Swal.fire({
    text: msg,
    icon: icon,
  });
  document.querySelector("span").innerHTML = ""; // quita el texto "jugando"
}
