export type Category = "ejercicio" | "ventas" | "salud" | "aprendizaje" | "finanzas";

export type Frecuencia = "diaria" | "semanal" | "mensual" | "anual";

export interface Meta {
  id: string;
  nombre: string;
  descripcion?: string;
  categoria: Category;
  total: number;
  unidad: string;
  frecuencia: Frecuencia;
  fechaInicio: string;
  fechaFin: string;
  avances: Avance[];
}

export interface Avance {
  id: string;
  metaId: string;
  fecha: string;
  cantidad: number;
  nota?: string;
}

export const CATEGORIAS: Record<Category, { label: string; color: string; bg: string }> = {
  ejercicio: { label: "Ejercicio", color: "#58CC02", bg: "#1a2e0a" },
  ventas: { label: "Ventas", color: "#1CB0F6", bg: "#0a1e2e" },
  salud: { label: "Salud", color: "#FF9600", bg: "#2e1e0a" },
  aprendizaje: { label: "Aprendizaje", color: "#a855f7", bg: "#1e0a2e" },
  finanzas: { label: "Finanzas", color: "#10b981", bg: "#0a2e1e" },
};
