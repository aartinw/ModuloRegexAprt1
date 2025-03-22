import { Informacion } from "./modelo";

export const crearElementoParrafo = (
  texto: string,
  etiqueta: string
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `<strong>${etiqueta}:</strong> ${texto}`;
  return parrafo;
};

export const crearContenedorInformacion = (
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
