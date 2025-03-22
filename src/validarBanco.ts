import { limpiarIBAN, extraerInformacion } from "./ibanUtils";
import { Informacion } from "./modelo";
import { crearContenedorInformacion } from "./ui";

const inputIBAN = document.querySelector<HTMLInputElement>("#iban");
const botonBuscar = document.querySelector<HTMLButtonElement>("#buscar");
const resultadoDiv = document.querySelector<HTMLDivElement>("#resultado");

const sacarInformacion = async (evento: Event) => {
  evento.preventDefault();
  if (!inputIBAN || !resultadoDiv) {
    console.log("Error: No se encontraron los elementos en el DOM.");
    return;
  }

  if (inputIBAN && inputIBAN instanceof HTMLInputElement) {
    const iban = limpiarIBAN(inputIBAN.value);
    const resultado = extraerInformacion(iban);

    resultadoDiv.innerHTML = "";

    if (resultado.error) {
      resultadoDiv.textContent = resultado.error;
      resultadoDiv.classList.add("error");
      resultadoDiv.classList.remove("success");
    } else {
      resultadoDiv.innerHTML = "";
      resultadoDiv.innerHTML += `<p class="success">El IBAN está bien formado, por lo tanto, está bien formado</p>`;

      resultadoDiv.appendChild(
        crearContenedorInformacion(resultado as Informacion)
      );
      resultadoDiv.classList.add("success");
      resultadoDiv.classList.remove("error");
    }
  }
};
document.addEventListener("DOMContentLoaded", () => {
  if (botonBuscar && botonBuscar instanceof HTMLButtonElement) {
    botonBuscar.addEventListener("click", sacarInformacion);
  }
});
