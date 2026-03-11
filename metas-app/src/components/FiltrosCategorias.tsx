"use client";
import { Category, CATEGORIAS } from "@/lib/types";

interface Props {
  seleccionado: Category | "todas";
  onChange: (cat: Category | "todas") => void;
}

export default function FiltrosCategorias({ seleccionado, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("todas")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          seleccionado === "todas"
            ? "bg-white text-[#111827]"
            : "bg-[#1F2937] text-[#9CA3AF] hover:text-white border border-[#374151]"
        }`}
      >
        Todas
      </button>
      {(Object.entries(CATEGORIAS) as [Category, (typeof CATEGORIAS)[Category]][]).map(
        ([key, cat]) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              seleccionado === key ? "text-white" : "text-[#9CA3AF] hover:text-white"
            }`}
            style={
              seleccionado === key
                ? { backgroundColor: cat.color, borderColor: cat.color }
                : { backgroundColor: "#1F2937", borderColor: "#374151" }
            }
          >
            {cat.label}
          </button>
        )
      )}
    </div>
  );
}
