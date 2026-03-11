"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Category, CATEGORIAS, Frecuencia } from "@/lib/types";
import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";

const FRECUENCIAS: { value: Frecuencia; label: string }[] = [
  { value: "diaria", label: "Diaria" },
  { value: "semanal", label: "Semanal" },
  { value: "mensual", label: "Mensual" },
  { value: "anual", label: "Anual" },
];

export default function NuevaMeta() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoria: "ejercicio" as Category,
    total: "",
    unidad: "",
    frecuencia: "anual" as Frecuencia,
    fechaInicio: "",
    fechaFin: "",
  });
  const [guardado, setGuardado] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = () => {
    if (!form.nombre || !form.total || !form.unidad) return;
    // Aquí se conectará con Supabase
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const inputClass =
    "w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-[#4B5563] focus:outline-none focus:border-[#58CC02] transition-colors";

  return (
    <div className="min-h-screen bg-[#111827]">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center">
            <Target size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Nueva Meta</h1>
        </div>

        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Nombre de la meta *</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Ej: Ejercicio diario"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              placeholder="Describe tu meta..."
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Categoría *</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(CATEGORIAS) as [Category, (typeof CATEGORIAS)[Category]][]).map(
                ([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => handleChange("categoria", key)}
                    className="px-3 py-2 rounded-xl text-sm font-medium border transition-colors"
                    style={
                      form.categoria === key
                        ? { backgroundColor: cat.color, borderColor: cat.color, color: "#fff" }
                        : { backgroundColor: "#111827", borderColor: "#374151", color: "#9CA3AF" }
                    }
                  >
                    {cat.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Meta total *</label>
              <input
                type="number"
                value={form.total}
                onChange={(e) => handleChange("total", e.target.value)}
                placeholder="365"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Unidad *</label>
              <input
                type="text"
                value={form.unidad}
                onChange={(e) => handleChange("unidad", e.target.value)}
                placeholder="días, clientes..."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Frecuencia</label>
            <div className="flex gap-2 flex-wrap">
              {FRECUENCIAS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleChange("frecuencia", value)}
                  className="px-3 py-2 rounded-xl text-sm font-medium border transition-colors"
                  style={
                    form.frecuencia === value
                      ? { backgroundColor: "#1CB0F6", borderColor: "#1CB0F6", color: "#fff" }
                      : { backgroundColor: "#111827", borderColor: "#374151", color: "#9CA3AF" }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Fecha inicio</label>
              <input
                type="date"
                value={form.fechaInicio}
                onChange={(e) => handleChange("fechaInicio", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Fecha fin</label>
              <input
                type="date"
                value={form.fechaFin}
                onChange={(e) => handleChange("fechaFin", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {guardado && (
            <div className="text-[#58CC02] bg-[#1a2e0a] p-3 rounded-xl text-sm font-medium text-center">
              ¡Meta creada exitosamente!
            </div>
          )}

          <button
            onClick={handleGuardar}
            disabled={!form.nombre || !form.total || !form.unidad}
            className="w-full bg-[#58CC02] hover:bg-[#46a302] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
          >
            Crear meta
          </button>
        </div>
      </main>
    </div>
  );
}
