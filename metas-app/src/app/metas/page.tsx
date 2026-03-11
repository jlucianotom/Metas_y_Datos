"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MetaCard from "@/components/MetaCard";
import FiltrosCategorias from "@/components/FiltrosCategorias";
import { mockMetas } from "@/lib/mockData";
import { Category } from "@/lib/types";
import { Plus, Target } from "lucide-react";
import Link from "next/link";

export default function Metas() {
  const [filtro, setFiltro] = useState<Category | "todas">("todas");

  const metasFiltradas =
    filtro === "todas"
      ? mockMetas
      : mockMetas.filter((m) => m.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#111827]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-white">Mis Metas</h1>
            <p className="text-[#9CA3AF] mt-1">{mockMetas.length} metas registradas</p>
          </div>
          <Link
            href="/nueva-meta"
            className="flex items-center gap-2 bg-[#58CC02] hover:bg-[#46a302] text-white font-bold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nueva meta
          </Link>
        </div>

        <div className="mb-6">
          <FiltrosCategorias seleccionado={filtro} onChange={setFiltro} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metasFiltradas.map((meta) => (
            <MetaCard key={meta.id} meta={meta} />
          ))}
        </div>

        {metasFiltradas.length === 0 && (
          <div className="text-center py-16 text-[#9CA3AF]">
            <Target size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No hay metas en esta categoría</p>
            <Link
              href="/nueva-meta"
              className="inline-flex items-center gap-2 mt-4 bg-[#58CC02] text-white font-bold px-4 py-2 rounded-xl"
            >
              <Plus size={16} />
              Crear primera meta
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
