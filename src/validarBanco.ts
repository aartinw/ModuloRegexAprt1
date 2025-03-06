import { limpiarIBAN, extraerInformacion } from "./ibanUtils";
import { Informacion } from "./ui";

const inputIBAN = document.querySelector<HTMLInputElement>("#iban");
const botonBuscar = document.querySelector<HTMLButtonElement>("#buscar");
const resultadoDiv = document.querySelector<HTMLDivElement>("#resultado");

const crearElementoParrafo = (
  texto: string,
  etiqueta: string
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `<strong>${etiqueta}:</strong> ${texto}`;
  return parrafo;
};

const crearContenedorInformacion = (
  informacion: Informacion
): HTMLDivElement => {
  const elementoInformacion = document.createElement("div");
  elementoInformacion.classList.add("informacion-contenedor");

  const banco = crearElementoParrafo(informacion.banco, "Banco");
  elementoInformacion.appendChild(banco);

  const sucursal = crearElementoParrafo(informacion.sucursal, "Sucursal");
  elementoInformacion.appendChild(sucursal);

  const digitoDeControl = crearElementoParrafo(
    informacion.digitoDeControl,
    "Digito de Control"
  );
  elementoInformacion.appendChild(digitoDeControl);

  const cuenta = crearElementoParrafo(informacion.cuenta, "Número de Cuenta");
  elementoInformacion.appendChild(cuenta);

  return elementoInformacion;
};

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
      resultadoDiv.innerHTML += `<p class="success">El IBAN está bien formado</p>`;
      resultadoDiv.innerHTML += `<p class="success">El IBAN es válido</p>`;

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
