"use client";
import { Target, LayoutDashboard, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/metas", label: "Mis Metas", icon: Target },
  { href: "/nueva-meta", label: "Nueva Meta", icon: Plus },
  { href: "/progreso", label: "Progreso", icon: TrendingUp },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1F2937] border-b border-[#374151] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center">
            <Target size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white">Metas y Datos</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-[#58CC02] text-white"
                  : "text-[#9CA3AF] hover:text-white hover:bg-[#374151]"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:block">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
