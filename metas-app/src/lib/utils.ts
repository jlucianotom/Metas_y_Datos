import { Meta } from "./types";

export function calcularProgreso(meta: Meta): number {
  const total = meta.avances.reduce((sum, a) => sum + a.cantidad, 0);
  return Math.min(Math.round((total / meta.total) * 100), 100);
}

export function calcularTotalAvance(meta: Meta): number {
  return meta.avances.reduce((sum, a) => sum + a.cantidad, 0);
}

export function diasRestantes(fechaFin: string): number {
  const hoy = new Date();
  const fin = new Date(fechaFin);
  const diff = fin.getTime() - hoy.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
