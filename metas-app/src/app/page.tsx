"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MetaCard from "@/components/MetaCard";
import FiltrosCategorias from "@/components/FiltrosCategorias";
import { mockMetas } from "@/lib/mockData";
import { Category } from "@/lib/types";
import { calcularProgreso } from "@/lib/utils";
import { Target, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [filtro, setFiltro] = useState<Category | "todas">("todas");

  const metasFiltradas =
    filtro === "todas"
      ? mockMetas
      : mockMetas.filter((m) => m.categoria === filtro);

  const totalMetas = mockMetas.length;
  const completadas = mockMetas.filter((m) => calcularProgreso(m) === 100).length;
  const enRiesgo = mockMetas.filter((m) => calcularProgreso(m) < 30).length;
  const promedioGeneral = Math.round(
    mockMetas.reduce((sum, m) => sum + calcularProgreso(m), 0) / totalMetas
  );

  return (
    <div className="min-h-screen bg-[#111827]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">
            Hola, <span className="text-[#58CC02]">sigue así</span> 🎯
          </h1>
          <p className="text-[#9CA3AF] mt-1">
            Tienes {totalMetas} metas activas — progreso general: {promedioGeneral}%
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total metas", value: totalMetas, icon: Target, color: "#58CC02" },
            { label: "Progreso promedio", value: `${promedioGeneral}%`, icon: TrendingUp, color: "#1CB0F6" },
            { label: "Completadas", value: completadas, icon: CheckCircle, color: "#10b981" },
            { label: "En riesgo", value: enRiesgo, icon: AlertTriangle, color: "#FF9600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-[#9CA3AF]">{label}</p>
              </div>
            </div>
          ))}
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
          </div>
        )}
      </main>
    </div>
  );
}
