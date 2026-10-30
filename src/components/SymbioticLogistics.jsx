// src/components/SymbioticLogistics.jsx
import React, { useState, useEffect } from 'react';
import {
  Truck,
  MapPin,
  Thermometer,
  Leaf,
  CheckCircle2,
  FileCheck2,
  Navigation,
  PackagePlus,
  QrCode,
  ShieldCheck,
} from 'lucide-react';

const GEO_NODES = [
  {
    id: 'rosario',
    nombre: '1. Origen Retorno: Rosario',
    subtitulo: 'Inicio tramo de regreso Camión #04 Cootrans',
    coordenadas: '32°56′S 60°39′W · Autopista AP-01 Km 0',
    ocupacionNodo: '55% (Carga tambera previa)',
    x: 90,
    y: 195,
    tipo: 'origen',
  },
  {
    id: 'tambera',
    nombre: '2. Planta de Fraccionamiento Tambera',
    subtitulo: 'Cooperativa Tambera La Unión (Lote envasado)',
    coordenadas: '31°27′S 60°55′W · Enlace RP 70 / AP-01',
    ocupacionNodo: '55% consolidado en cámara delantera',
    x: 260,
    y: 145,
    tipo: 'planta',
  },
  {
    id: 'raices',
    nombre: '3. Centro Productivo Raíces del Litoral',
    subtitulo: 'Carga Simbiótica: +1.200 frascos de miel/conservas',
    coordenadas: '31°38′S 60°43′W · Desvío PostGIS: solo 7.4 km',
    ocupacionNodo: '+37% bodega -> 92% Ocupación Total',
    x: 410,
    y: 78,
    tipo: 'desvio',
  },
  {
    id: 'supermercado',
    nombre: '4. Centro de Distribución del Supermercado',
    subtitulo: 'Nodo Final Santa Fe / Paraná (Súper Cadena Nacional)',
    coordenadas: '31°40′S 60°31′W · RN 168 Santa Fe - Paraná',
    ocupacionNodo: 'Descarga unificada 92% (Optimización óptima)',
    x: 590,
    y: 115,
    tipo: 'destino',
  },
];

export default function SymbioticLogistics({ demoMode = false }) {
  const [simulateRaicesLoad, setSimulateRaicesLoad] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState('raices');
  const [remitoGenerated, setRemitoGenerated] = useState(null);

  useEffect(() => {
    if (demoMode) {
      setSimulateRaicesLoad(true);
      setSelectedNodeId('raices');
      setRemitoGenerated({
        numero: 'REM-COOTRANS-0004-8921',
        cotAfip: 'COT-84920144-SF',
        unidad: 'Camión #04 de Cootrans (Scania R450 · Patente AF 404 SY)',
        chofer: 'Carlos M. Giordano (Legajo Cooperativo #114)',
        ruta: 'Retorno Rosario -> Santa Fe / Paraná (Desvío PostGIS +7.4 km)',
        cargaConsolidada:
          '+1.200 frascos de Miel Silvestre (Raíces del Litoral -> Súper Cadena Nacional)',
        ocupacionFinal: '92% (Optimización óptima)',
        seteoTermico: '16°C controlado (Carga seca / conservas y miel)',
        horaEmision: '14:15',
      });
    }
  }, [demoMode]);

  const baseOccupancyPct = 55;
  const remainingCapacityPct = 45;
  const raicesLoadPct = simulateRaicesLoad ? 37 : 0;
  const totalOccupancyPct = baseOccupancyPct + raicesLoadPct;

  const selectedNode =
    GEO_NODES.find((n) => n.id === selectedNodeId) || GEO_NODES[2];

  const handleGenerateRemito = () => {
    setSimulateRaicesLoad(true);
    setRemitoGenerated({
      numero: 'REM-COOTRANS-0004-8921',
      cotAfip: 'COT-84920144-SF',
      unidad: 'Camión #04 de Cootrans (Scania R450 · Patente AF 404 SY)',
      chofer: 'Carlos M. Giordano (Legajo Cooperativo #114)',
      ruta: 'Retorno Rosario -> Santa Fe / Paraná (Desvío PostGIS +7.4 km)',
      cargaConsolidada:
        '+1.200 frascos de miel/conservas (Raíces del Litoral Ltda.)',
      ocupacionFinal: '92% (Optimización óptima)',
      seteoTermico: '16°C controlado (Carga seca / conservas y miel)',
      horaEmision: new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Panel de Control de Cargas y Rutas */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Camión #04 de Cootrans
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Retorno Rosario {'->'} Santa Fe / Paraná
                  </h2>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                En Ruta Activa
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Ocupación de Bodega Térmica
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    simulateRaicesLoad
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {simulateRaicesLoad
                    ? `Nueva ocupación total: ${totalOccupancyPct}% (Optimización óptima)`
                    : `Ocupación actual: ${baseOccupancyPct}%`}
                </span>
              </div>

              <div className="w-full h-6 rounded-lg bg-slate-200 overflow-hidden flex border border-slate-300 text-[11px] font-bold">
                <div
                  style={{ width: `${baseOccupancyPct}%` }}
                  className="bg-slate-600 text-white flex items-center justify-center transition-all duration-500"
                >
                  55% Tambera
                </div>
                {simulateRaicesLoad && (
                  <div
                    style={{ width: `${raicesLoadPct}%` }}
                    className="bg-emerald-600 text-white flex items-center justify-center transition-all duration-500"
                  >
                    +37% Raíces (92%)
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">
                    Ocupación actual
                  </span>
                  <span className="font-bold text-slate-900">
                    55% (Carga tambera previa)
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">
                    Capacidad remanente
                  </span>
                  <span className="font-bold text-amber-700">
                    {remainingCapacityPct}% (3.200 kg libres)
                  </span>
                </div>
              </div>

              <div
                onClick={() => setSimulateRaicesLoad(!simulateRaicesLoad)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  simulateRaicesLoad
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <PackagePlus
                    className={`w-4 h-4 shrink-0 ${
                      simulateRaicesLoad ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      Simulación de carga Raíces del Litoral
                    </span>
                    <span className="text-slate-600">
                      +1.200 frascos de miel/conservas (2.640 kg consolidados)
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={simulateRaicesLoad}
                  onChange={() => setSimulateRaicesLoad(!simulateRaicesLoad)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <Thermometer className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-800">
                Check térmico: &ldquo;Carga seca / Temperatura controlada 16°C
                compatible&rdquo;
              </span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="font-bold">
                Ahorro logístico estimado: 48.5% frente a flete individual |
                Reducción de 62 kg CO2
              </span>
            </div>
          </div>
        </section>

        {/* 2. Representación Geoespacial (Mapa Vectorial SVG Interactivo + PostGIS) */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>
                  2. Traza Vial Simbiótica & Cálculo Espacial PostGIS
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Unión entre Planta Tambera, Centro Productivo Raíces del Litoral
                y CD Supermercado
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              Desvío de trayecto: solo 7.4 km (PostGIS)
            </span>
          </div>

          <div className="relative rounded-xl bg-slate-900 border border-slate-800 p-3 overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pb-1">
              <span>
                SISTEMA GEOESPACIAL POSTGIS · CORREDOR AP-01 / RN 11 / RN 168
              </span>
              <span className="text-emerald-400 font-mono">
                Seleccioná un nodo en el mapa
              </span>
            </div>

            <svg
              viewBox="0 0 680 245"
              className="w-full h-52 sm:h-60 select-none"
              role="img"
              aria-label="Mapa vectorial de ruta Rosario a Santa Fe y Paraná"
            >
              <defs>
                <pattern
                  id="postgis-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="680" height="245" fill="url(#postgis-grid)" />

              <path
                d="M 70 235 Q 250 205, 430 165 T 660 95"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="8"
                strokeOpacity="0.15"
              />

              <path
                d="M 90 195 L 260 145 L 590 115"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              <path
                d="M 90 195 L 260 145 L 410 78 L 590 115"
                fill="none"
                stroke={simulateRaicesLoad ? '#10b981' : '#f59e0b'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g transform="translate(310, 32)">
                <rect
                  x="0"
                  y="0"
                  width="195"
                  height="26"
                  rx="6"
                  fill="#064e3b"
                  stroke="#10b981"
                  strokeWidth="1.2"
                />
                <text
                  x="97"
                  y="17"
                  textAnchor="middle"
                  fill="#a7f3d0"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Desvío de trayecto: solo 7.4 km
                </text>
              </g>

              {GEO_NODES.map((node) => {
                const isSelected = node.id === selectedNode.id;
                const isRaices = node.id === 'raices';
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <circle
                        r="18"
                        fill={isRaices ? '#10b981' : '#38bdf8'}
                        fillOpacity="0.25"
                      />
                    )}
                    <circle
                      r="9"
                      fill={
                        isRaices
                          ? '#10b981'
                          : isSelected
                          ? '#38bdf8'
                          : '#f8fafc'
                      }
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />
                    <text
                      x="0"
                      y={isRaices ? -15 : 24}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {node.nombre.split(':')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-2 p-3 rounded-lg bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-white block">
                  {selectedNode.nombre} — {selectedNode.subtitulo}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {selectedNode.coordenadas}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0 self-start sm:self-center">
                {selectedNode.ocupacionNodo}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Consolidación respaldada por{' '}
              <strong className="text-slate-800">
                Póliza de Tránsito Sancor Seguros
              </strong>
              .
            </div>

            <button
              type="button"
              onClick={handleGenerateRemito}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Generar Remito Digital y Consolidar</span>
            </button>
          </div>
        </section>
      </div>

      {remitoGenerated && (
        <section className="bg-white border-2 border-emerald-500/80 rounded-xl p-5 shadow-md space-y-4 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {remitoGenerated.numero}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Listo para el Chofer · {remitoGenerated.cotAfip}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Remito Intercooperativo de Backhauling Consolidado
                </h3>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold self-start sm:self-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Cobertura Sancor Seguros Activa ({remitoGenerated.horaEmision} hs)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Unidad y Chofer</span>
              <span className="font-bold text-slate-900 block mt-0.5">
                {remitoGenerated.unidad}
              </span>
              <span className="text-slate-600 block mt-0.5">
                {remitoGenerated.chofer}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Ruta y Desvío PostGIS</span>
              <span className="font-bold text-slate-900 block mt-0.5">
                {remitoGenerated.ruta}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">
                Carga Consolidada & Ocupación
              </span>
              <span className="font-bold text-emerald-700 block mt-0.5">
                {remitoGenerated.cargaConsolidada}
              </span>
              <span className="text-slate-700 font-semibold block mt-0.5">
                Bodega: {remitoGenerated.ocupacionFinal}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-slate-500 block">Condición Térmica</span>
                <span className="font-bold text-slate-900 block mt-0.5">
                  {remitoGenerated.seteoTermico}
                </span>
                <span className="text-emerald-700 font-semibold block mt-0.5">
                  Ahorro 48.5% · -62 kg CO₂
                </span>
              </div>
              <QrCode className="w-10 h-10 text-slate-800 shrink-0" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
