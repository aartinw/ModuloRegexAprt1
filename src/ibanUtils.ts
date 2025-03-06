import { listadoBancos } from "./listadoBancos";
import { isValidIBAN } from "ibantools";

export function limpiarIBAN(iban: string): string {
  return iban.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

export function validarIBAN(iban: string): boolean {
  const ibanLimpio = limpiarIBAN(iban);

  const regexIBAN = /^ES\d{22}$/;
  if (!regexIBAN.test(ibanLimpio)) {
    console.log(`IBAN mal formado: ${ibanLimpio}`);
    return false;
  }

  const esValido = isValidIBAN(ibanLimpio);
  console.log(
    esValido ? `IBAN válido: ${ibanLimpio}` : `IBAN inválido: ${ibanLimpio}`
  );

  return esValido;
}

export function extraerInformacion(iban: string) {
  if (!validarIBAN(iban)) {
    return { error: "IBAN no válido" };
  }

  const banco = iban.slice(4, 8);
  const sucursal = iban.slice(8, 12);
  const digitoDeControl = iban.slice(12, 14);
  const cuenta = iban.slice(14);
  const nombreBanco = listadoBancos[banco] || "Banco Desconocido";

  return {
    banco,
    sucursal,
    digitoDeControl,
    cuenta,
    nombreBanco,
  };
}
