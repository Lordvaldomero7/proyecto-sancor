// src/components/SmartSLAs.jsx
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Scale,
  Award,
  CheckCircle2,
  Wrench,
  Zap,
  UserCheck,
  FileCheck2,
  ArrowLeft,
} from 'lucide-react';

const COMPENSATORY_COSTS = [
  {
    id: 'amortizacion',
    concepto: 'Amortización de desgaste de maquinaria tambera',
    detalle: 'Uso de Línea 2 de Fraccionamiento (Turno Jueves 08:30 - 14:00)',
    monto: 42500,
    montoFormateado: '$42.500',
    icon: Wrench,
  },
  {
    id: 'energia',
    concepto: 'Consumo energético medido (kWh)',
    detalle: 'Telemetría de tablero industrial + Ciclo térmico CIP 75°C',
    monto: 18300,
    montoFormateado: '$18.300',
    icon: Zap,
  },
  {
    id: 'operario',
    concepto: 'Honorarios operario de apoyo',
    detalle: 'Supervisión técnica de planta y control de calidad inter-lote',
    monto: 35000,
    montoFormateado: '$35.000',
    icon: UserCheck,
  },
  {
    id: 'fondo-solidario',
    concepto: 'Fondo Solidario de Mantenimiento y Roturas',
    detalle: 'Reserva mutualizada con respaldo paramétrico de Sancor Seguros',
    monto: 12000,
    montoFormateado: '$12.000',
    icon: ShieldCheck,
    destacado: true,
  },
];

export default function SmartSLAs({
  onNavigateToPassport,
  demoMode = false,
}) {
  const [liquidated, setLiquidated] = useState(false);

  // Formalización automática cuando entra al Paso 4 del Demo Video Pitch
  useEffect(() => {
    if (demoMode) {
      setLiquidated(true);
    }
  }, [demoMode]);

  const totalMonto = COMPENSATORY_COSTS.reduce(
    (acc, item) => acc + item.monto,
    0
  ); // $107.800

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  LOTE-RL-2026-B89
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Gobernanza & Clearing Intercooperativo
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                Smart SLAs & Liquidación Solidaria de Costos Compensatorios
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Scale className="w-3.5 h-3.5" />
              Acto Cooperativo (Ley 20.337)
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Concepto Compensatorio Auditado</th>
                  <th className="py-3 px-4 hidden sm:table-cell">
                    Base de Cálculo / SLA
                  </th>
                  <th className="py-3 px-4 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {COMPENSATORY_COSTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr
                      key={item.id}
                      className={
                        item.destacado
                          ? 'bg-amber-50/50 hover:bg-amber-50 transition-colors'
                          : 'bg-white hover:bg-slate-50 transition-colors'
                      }
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              item.destacado
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {item.concepto}
                            </span>
                            <span className="text-xs text-slate-500 sm:hidden block">
                              {item.detalle}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 hidden sm:table-cell">
                        {item.detalle}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        {item.montoFormateado}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-emerald-50/80 border-t-2 border-emerald-200">
                  <td colSpan={2} className="py-4 px-4">
                    <span className="text-xs sm:text-sm font-bold text-emerald-950 block">
                      Total liquidado bajo la figura de &ldquo;Acto Cooperativo
                      (Ley 20.337)&rdquo;
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Compensación interna al costo estricto sin fin de lucro
                      mercantil ni intermediación
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-base sm:text-lg font-extrabold text-emerald-800">
                    ${totalMonto.toLocaleString('es-AR')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            {onNavigateToPassport ? (
              <button
                type="button"
                onClick={onNavigateToPassport}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Pasaporte Digital LOTE-RL-2026-B89</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                Oráculo IoT verificado: CIP 75°C OK · KWh medidos OK
              </span>
            )}

            <button
              type="button"
              onClick={() => setLiquidated(true)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                liquidated
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>
                {liquidated
                  ? '✓ Liquidación Solidaria Formalizada ($107.800)'
                  : 'Ejecutar Liquidación Solidaria ($107.800)'}
              </span>
            </button>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-4">
          <div className="bg-white border-2 border-emerald-500/70 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Sello de Gobernanza ACI / INAES
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                  Principio Cooperativo N° 6: Cooperación entre Cooperativas
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              Las cooperativas sirven a sus asociados más eficazmente y
              fortalecen el movimiento cooperativo trabajando de manera conjunta
              por medio de estructuras locales, regionales y nacionales.
            </p>

            <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>Encuadre: Acto Cooperativo (Ley 20.337)</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Art. 4° Ley 20.337: Los vínculos de maquila compartida y
                logística simbiótica entre Raíces del Litoral, Coop. Tambera La
                Unión y Cootrans configuran actos cooperativos internos, no
                operaciones comerciales de mercado.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Garantía Sancor Seguros
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                Fondo $12.000
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              El aporte de <strong>$12.000</strong> al{' '}
              <strong>Fondo Solidario de Mantenimiento y Roturas</strong> se
              articula con una póliza paramétrica de{' '}
              <strong>Sancor Seguros</strong> que cubre roturas imprevistas de
              maquinaria durante el turno compartido.
            </p>
            {liquidated && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Liquidación solidaria formalizada (#LEY20337-B89 · Caso Miel
                  Silvestre Súper Cadena Nacional).
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
