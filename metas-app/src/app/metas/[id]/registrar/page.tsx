"use client";
import { use, useState } from "react";
import { mockMetas } from "@/lib/mockData";
import { CATEGORIAS } from "@/lib/types";
import { calcularProgreso } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegistrarAvance({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const meta = mockMetas.find((m) => m.id === id);
  const [cantidad, setCantidad] = useState("");
  const [nota, setNota] = useState("");
  const [guardado, setGuardado] = useState(false);

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">
        Meta no encontrada
      </div>
    );
  }

  const cat = CATEGORIAS[meta.categoria];
  const progreso = calcularProgreso(meta);

  const handleGuardar = () => {
    if (!cantidad || isNaN(Number(cantidad))) return;
    // Aquí se conectará con Supabase
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
    setCantidad("");
    setNota("");
  };

  return (
    <div className="min-h-screen bg-[#111827]">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-8">
        <Link
          href={`/metas/${id}`}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver a la meta
        </Link>

        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <span
            className="text-xs font-bold px-2 py-1 rounded-full mb-4 inline-block"
            style={{ color: cat.color, backgroundColor: cat.bg }}
          >
            {cat.label}
          </span>
          <h1 className="text-2xl font-black text-white mb-1">{meta.nombre}</h1>
          <p className="text-[#9CA3AF] text-sm mb-6">Progreso actual: {progreso}%</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Cantidad ({meta.unidad})
              </label>
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder={`Ej: 1 ${meta.unidad}`}
                className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-[#4B5563] focus:outline-none focus:border-[#58CC02] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Nota (opcional)
              </label>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="¿Algo destacable de hoy?"
                rows={3}
                className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-[#4B5563] focus:outline-none focus:border-[#58CC02] transition-colors resize-none"
              />
            </div>

            {guardado && (
              <div className="flex items-center gap-2 text-[#58CC02] bg-[#1a2e0a] p-3 rounded-xl">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">¡Avance registrado exitosamente!</span>
              </div>
            )}

            <button
              onClick={handleGuardar}
              disabled={!cantidad}
              className="w-full bg-[#58CC02] hover:bg-[#46a302] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
            >
              Guardar avance
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
