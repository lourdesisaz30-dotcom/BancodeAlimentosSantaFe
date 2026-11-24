
const URL_MODELO = "https://teachablemachine.withgoogle.com/models/nqk4tFGzQ/";

let modelo;
let camara;
let iniciada = false;

async function iniciarReconocimiento() {
  const resultado = document.getElementById("resultado-reconocimiento");

  try {
    if (!modelo) {
      modelo = await tmImage.load(
        URL_MODELO + "model.json",
        URL_MODELO + "metadata.json"
      );
    }

    if (!camara) {
      camara = new tmImage.Webcam(300, 300, true);
      await camara.setup();
      await camara.play();
    }

    iniciada = true;

    const contenedor = document.getElementById("camara-reconocimiento");
    contenedor.replaceChildren(camara.canvas);

    resultado.textContent = "¡Cámara activada! Mostrá un alimento.";

    reconocer();
  } catch (error) {
    resultado.textContent =
      "No pudimos iniciar la cámara. Revisá los permisos.";
    console.error(error);
  }
}

async function reconocer() {
  if (!iniciada) return;

  camara.update();

  const predicciones = await modelo.predict(camara.canvas);

  predicciones.sort((a, b) => b.probability - a.probability);

  const mejor = predicciones[0];

  document.getElementById("resultado-reconocimiento").textContent =
    mejor.probability > 0.70
      ? "Producto reconocido: " + mejor.className
      : "No pudimos reconocer el producto. Intentá nuevamente.";

  requestAnimationFrame(reconocer);
}

window.iniciarReconocimiento = iniciarReconocimiento;
