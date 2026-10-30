// src/components/DigitalPassport.jsx
import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Building2,
  FlaskConical,
  Leaf,
  Truck,
  X,
  ArrowRight,
} from 'lucide-react';

const AUDIT_CHAIN = [
  {
    id: 'origen',
    etiqueta: 'Origen',
    valor: 'Cooperativa Raíces del Litoral (Productores de Miel)',
    detalle: 'Miel Silvestre de Isla · pH 3.9 · Libre de TACC · RNE 21-049821',
    icon: Building2,
    sello: 'SENASA / RENAPA OK',
  },
  {
    id: 'fraccionamiento',
    etiqueta: 'Fraccionamiento',
    valor: 'Certificado en Planta Tambera (Turno CIP verificado)',
    detalle: 'Línea 2 de Fraccionamiento · Limpieza alcalina 75°C (90 min previos)',
    icon: FlaskConical,
    sello: 'Protocolo CIP 75°C Aprobado',
  },
  {
    id: 'empaque',
    etiqueta: 'Empaque',
    valor: 'Biopolímero biodegradable validado por Laboratorio UNLa (Cert. N° 4412)',
    detalle: 'Ensayo de migración específica aprobado según Código Alimentario Argentino',
    icon: Leaf,
    sello: 'Cert. UNLa N° 4412',
  },
  {
    id: 'logistica',
    etiqueta: 'Cadena Logística',
    valor: 'Monitoreada por Cootrans',
    detalle: 'Camión #04 · Temperatura controlada 16°C · Desvío PostGIS 7.4 km',
    icon: Truck,
    sello: 'Telemetría 16°C Continua',
  },
];

const QR_MATRIX = [
  [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0],
  [1,1,0,1,0,1,1,1,0,0,1,1,0,1,1],
  [0,1,1,0,1,0,0,1,1,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,0,1,1,1,0,1,1,0],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0],
  [1,1,1,1,1,1,1,0,1,1,0,1,1,1,1],
];

export default function DigitalPassport({
  onNavigateToSla,
  autoOpenModal = false,
}) {
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const loteUuid = 'LOTE-RL-2026-B89';

  // Apertura automática del modal cuando entra al Paso 3 de la Demo Video
  useEffect(() => {
    if (autoOpenModal) {
      setIsScannerModalOpen(true);
    }
  }, [autoOpenModal]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  UUID: {loteUuid}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Hash: 0xB89F...E404
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                Pasaporte Digital de Lote — Auditoría para Supermercado
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Apto Recepción en Góndola
            </span>
          </div>

          <div className="space-y-3">
            {AUDIT_CHAIN.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                          0{idx + 1}. {item.etiqueta}:
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.valor}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.detalle}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white text-emerald-700 border border-emerald-200 shrink-0 self-start sm:self-center">
                    ✓ {item.sello}
                  </span>
                </div>
              );
            })}
          </div>

          {onNavigateToSla && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Este lote se encuentra vinculado al régimen de liquidación por
                Acto Cooperativo (Ley 20.337).
              </span>
              <button
                type="button"
                onClick={onNavigateToSla}
                className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <span>Ver Liquidación Solidaria del Lote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>

        <section className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-5 text-center">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider">
                Etiqueta QR Dinámica
              </span>
              <span className="font-mono text-emerald-700 font-bold">
                {loteUuid}
              </span>
            </div>

            <div
              onClick={() => setIsScannerModalOpen(true)}
              title="Hacé clic para simular el escaneo del QR"
              className="w-48 h-48 mx-auto rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 p-4 flex items-center justify-center shadow-sm cursor-pointer group transition-all"
            >
              <svg
                viewBox="0 0 15 15"
                className="w-full h-full group-hover:scale-[1.03] transition-transform"
                shapeRendering="crispEdges"
                aria-label={`Código QR para ${loteUuid}`}
              >
                {QR_MATRIX.map((row, rIdx) =>
                  row.map((cell, cIdx) =>
                    cell === 1 ? (
                      <rect
                        key={`${rIdx}-${cIdx}`}
                        x={cIdx}
                        y={rIdx}
                        width="1"
                        height="1"
                        fill="#0f172a"
                      />
                    ) : null
                  )
                )}
                <rect
                  x="6"
                  y="6"
                  width="3"
                  height="3"
                  rx="0.4"
                  fill="#059669"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{loteUuid}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Miel Silvestre 500g · Envase Biopolímero UNLa Cert. N° 4412
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsScannerModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simular escaneo de consumidor/supermercado</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Abre la vista móvil del auditor de calidad en recepción de
              supermercado
            </p>
          </div>
        </section>
      </div>

      {/* MODAL DE VISTA MÓVIL: AUDITOR DE CALIDAD DEL SUPERMERCADO / CONSUMIDOR */}
      {isScannerModalOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsScannerModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-[2rem] border-4 border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold tracking-wide">
                  AUDITORÍA CALIDAD · SUPERMERCADO
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsScannerModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-600 text-white">
                  {loteUuid}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  QR Escaneado OK
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 pt-1">
                Miel Silvestre de Raíces del Litoral (500g)
              </h3>
              <p className="text-[11px] text-emerald-800">
                Destino: Súper Cadena Nacional · Red SYMBIOS COOP
              </p>
            </div>

            <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
              {AUDIT_CHAIN.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase text-emerald-700 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        {step.etiqueta}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                        ✓ {step.sello}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                      {step.valor}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {step.detalle}
                    </p>
                  </div>
                );
              })}

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-left flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-amber-950 block">
                    Respaldo Sancor Seguros
                  </span>
                  <span className="text-[11px] text-amber-800">
                    Póliza de Inocuidad CIP & Tránsito Vigente
                  </span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsScannerModalOpen(false)}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cerrar Vista de Escaneo Móvil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
