// src/components/Layout.jsx
import React from 'react';
import {
  FlaskConical,
  Truck,
  QrCode,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { ENTITIES } from '../data/mockData';

export const NAV_ITEMS = [
  {
    id: 'bromatologia',
    label: '1. Motor Bromatológico & CIP',
    icon: FlaskConical,
  },
  {
    id: 'logistica',
    label: '2. Logística Simbiótica (Backhauling)',
    icon: Truck,
  },
  {
    id: 'pasaporte',
    label: '3. Pasaporte Digital & Trazabilidad',
    icon: QrCode,
  },
  {
    id: 'slas',
    label: '4. Smart SLAs & Liquidación Solidaria',
    icon: ShieldCheck,
  },
];

export default function Layout({
  activeTab,
  setActiveTab,
  activeEntityId,
  setActiveEntityId,
  children,
}) {
  const currentEntity =
    ENTITIES.find((item) => item.id === activeEntityId) || ENTITIES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* BARRA SUPERIOR SIMPLE Y LIMPIA */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo + Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
              SC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight">
                  SYMBIOS COOP
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Red Intercooperativa Activa
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Equipo E-404 · Coopathon Sancor Seguros
              </p>
            </div>
          </div>

          {/* Selector de Entidad Activa (El botón flotante de Demo Video se ubica en la esquina superior derecha) */}
          <div className="flex items-center gap-2.5 pr-44 sm:pr-64">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                aria-label="Entidad activa"
                value={activeEntityId}
                onChange={(e) => setActiveEntityId(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {ENTITIES.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN POR TABS (4 VISTAS) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t border-slate-100 overflow-x-auto">
          <nav className="flex items-center gap-1 -mb-px min-w-max">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'border-emerald-600 text-emerald-700 font-semibold'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-28">
        {/* Resumen limpio de la entidad seleccionada */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {currentEntity.role}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                {currentEntity.location}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {currentEntity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {currentEntity.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:justify-end shrink-0">
            {currentEntity.specialties.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Vista Activa */}
        {children}
      </main>
    </div>
  );
}
