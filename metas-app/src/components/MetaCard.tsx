"use client";
import { Meta, CATEGORIAS } from "@/lib/types";
import { calcularProgreso, calcularTotalAvance, diasRestantes } from "@/lib/utils";
import { Calendar, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  meta: Meta;
}

export default function MetaCard({ meta }: Props) {
  const progreso = calcularProgreso(meta);
  const totalAvance = calcularTotalAvance(meta);
  const diasLeft = diasRestantes(meta.fechaFin);
  const cat = CATEGORIAS[meta.categoria];

  const colorBarra =
    progreso >= 75 ? "#58CC02" : progreso >= 40 ? "#1CB0F6" : "#FF9600";

  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-4 hover:border-[#58CC02] transition-colors"
      style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ color: cat.color, backgroundColor: cat.bg }}
          >
            {cat.label}
          </span>
        </div>
        <span className="text-2xl font-black" style={{ color: colorBarra }}>
          {progreso}%
        </span>
      </div>

      <div>
        <h3 className="font-bold text-white text-lg">{meta.nombre}</h3>
        {meta.descripcion && (
          <p className="text-[#9CA3AF] text-sm mt-1">{meta.descripcion}</p>
        )}
      </div>

      {/* Barra de progreso */}
      <div>
        <div className="w-full h-3 bg-[#374151] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progreso}%`, backgroundColor: colorBarra }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#9CA3AF] mt-1">
          <span>
            {totalAvance} {meta.unidad}
          </span>
          <span>
            Meta: {meta.total} {meta.unidad}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
          <Calendar size={12} />
          <span>{diasLeft} días restantes</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/metas/${meta.id}`}
            className="flex items-center gap-1 text-xs text-[#1CB0F6] hover:text-white transition-colors"
          >
            <TrendingUp size={12} />
            Ver progreso
          </Link>
          <Link
            href={`/metas/${meta.id}/registrar`}
            className="flex items-center gap-1 text-xs bg-[#58CC02] text-white px-2 py-1 rounded-lg hover:bg-[#46a302] transition-colors"
          >
            <Plus size={12} />
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
}
