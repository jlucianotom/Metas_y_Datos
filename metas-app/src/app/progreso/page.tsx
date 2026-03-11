"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockMetas } from "@/lib/mockData";
import { Category, CATEGORIAS } from "@/lib/types";
import { calcularProgreso } from "@/lib/utils";
import FiltrosCategorias from "@/components/FiltrosCategorias";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

export default function Progreso() {
  const [filtro, setFiltro] = useState<Category | "todas">("todas");

  const metasFiltradas =
    filtro === "todas" ? mockMetas : mockMetas.filter((m) => m.categoria === filtro);

  const datosBarras = metasFiltradas.map((meta) => ({
    nombre: meta.nombre.length > 12 ? meta.nombre.slice(0, 12) + "…" : meta.nombre,
    progreso: calcularProgreso(meta),
    color: CATEGORIAS[meta.categoria].color,
  }));

  const datosRadial = metasFiltradas.map((meta, i) => ({
    nombre: meta.nombre,
    progreso: calcularProgreso(meta),
    fill: CATEGORIAS[meta.categoria].color,
  }));

  return (
    <div className="min-h-screen bg-[#111827]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-1">Progreso General</h1>
          <p className="text-[#9CA3AF]">Visualiza el avance de todas tus metas</p>
        </div>

        <div className="mb-6">
          <FiltrosCategorias seleccionado={filtro} onChange={setFiltro} />
        </div>

        {/* Gráfica de barras */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Progreso por meta (%)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={datosBarras} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="nombre" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={[0, 100]} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#58CC02" }}
                formatter={(value) => [`${value}%`, "Progreso"]}
              />
              <Bar dataKey="progreso" radius={[6, 6, 0, 0]}>
                {datosBarras.map((entry, index) => (
                  <rect key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lista detallada */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <h2 className="font-bold text-white mb-4">Detalle por meta</h2>
          <div className="flex flex-col gap-4">
            {metasFiltradas.map((meta) => {
              const progreso = calcularProgreso(meta);
              const cat = CATEGORIAS[meta.categoria];
              const colorBarra = progreso >= 75 ? "#58CC02" : progreso >= 40 ? "#1CB0F6" : "#FF9600";
              return (
                <div key={meta.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{meta.nombre}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ color: cat.color, backgroundColor: cat.bg }}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <span className="font-black" style={{ color: colorBarra }}>
                      {progreso}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#374151] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${progreso}%`, backgroundColor: colorBarra }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
