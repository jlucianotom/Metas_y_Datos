"use client";
import { use } from "react";
import { mockMetas } from "@/lib/mockData";
import { CATEGORIAS } from "@/lib/types";
import { calcularProgreso, calcularTotalAvance, diasRestantes, formatFecha } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Target, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DetalleMeta({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const meta = mockMetas.find((m) => m.id === id);

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">
        Meta no encontrada
      </div>
    );
  }

  const cat = CATEGORIAS[meta.categoria];
  const progreso = calcularProgreso(meta);
  const totalAvance = calcularTotalAvance(meta);
  const diasLeft = diasRestantes(meta.fechaFin);
  const colorBarra = progreso >= 75 ? "#58CC02" : progreso >= 40 ? "#1CB0F6" : "#FF9600";

  // Datos acumulados para la gráfica
  let acumulado = 0;
  const datosGrafica = meta.avances.map((a) => {
    acumulado += a.cantidad;
    return {
      fecha: new Date(a.fecha).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
      avance: a.cantidad,
      acumulado,
    };
  });

  return (
    <div className="min-h-screen bg-[#111827]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al dashboard
        </Link>

        {/* Header */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full mb-3 inline-block"
                style={{ color: cat.color, backgroundColor: cat.bg }}
              >
                {cat.label}
              </span>
              <h1 className="text-2xl font-black text-white">{meta.nombre}</h1>
              {meta.descripcion && (
                <p className="text-[#9CA3AF] mt-1">{meta.descripcion}</p>
              )}
            </div>
            <Link
              href={`/metas/${meta.id}/registrar`}
              className="flex items-center gap-2 bg-[#58CC02] hover:bg-[#46a302] text-white font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <Plus size={16} />
              Registrar avance
            </Link>
          </div>

          {/* Barra de progreso */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#9CA3AF]">
                {totalAvance} / {meta.total} {meta.unidad}
              </span>
              <span className="font-black text-xl" style={{ color: colorBarra }}>
                {progreso}%
              </span>
            </div>
            <div className="w-full h-4 bg-[#374151] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progreso}%`, backgroundColor: colorBarra }}
              />
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Avance total", value: `${totalAvance} ${meta.unidad}` },
              { label: "Días restantes", value: diasLeft },
              { label: "Registros", value: meta.avances.length },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-black text-white">{value}</p>
                <p className="text-xs text-[#9CA3AF]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfica */}
        {datosGrafica.length > 0 && (
          <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              <Target size={16} className="text-[#58CC02]" />
              Progreso acumulado
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={datosGrafica}>
                <defs>
                  <linearGradient id="colorAvance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colorBarra} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colorBarra} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="fecha" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: colorBarra }}
                />
                <Area
                  type="monotone"
                  dataKey="acumulado"
                  stroke={colorBarra}
                  strokeWidth={2}
                  fill="url(#colorAvance)"
                  name="Acumulado"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Historial de avances */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-[#1CB0F6]" />
            Historial de registros
          </h2>
          <div className="flex flex-col gap-3">
            {[...meta.avances].reverse().map((avance) => (
              <div
                key={avance.id}
                className="flex items-center justify-between p-3 bg-[#111827] rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colorBarra }}
                  />
                  <span className="text-[#9CA3AF] text-sm">{formatFecha(avance.fecha)}</span>
                  {avance.nota && <span className="text-xs text-[#9CA3AF]">— {avance.nota}</span>}
                </div>
                <span className="font-bold text-white">
                  +{avance.cantidad} {meta.unidad}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
