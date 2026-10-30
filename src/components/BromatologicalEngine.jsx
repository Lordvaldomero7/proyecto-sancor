// src/components/BromatologicalEngine.jsx
import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  ShieldCheck,
  Thermometer,
  Droplets,
  Gauge,
  FileSignature,
  Sparkles,
  Lock,
} from 'lucide-react';

const BROMATOLOGICAL_PRODUCTS = [
  {
    id: 'miel-isla',
    nombre: 'Miel de Isla en Frasco (500g)',
    casoDemoNombre:
      'Miel Silvestre de Raíces del Litoral para Súper Cadena Nacional (500g)',
    loteSugerido: 'LOTE-RL-2026-B89',
    registroSenasa: 'SENASA S-E-01942 · ANMAT RNPA 21-118402',
    ph: '3.9',
    phDetalle: 'Ácido natural (Inhibición microbiana)',
    alergenos: 'Libre de TACC, sin trazas lácteas',
    requierePurgaLactea: true,
    viscosidad: '4.850 cP (20°C) / 1.400 cP (Atemperado 38°C)',
    compatibilidadPct: 98,
    estadoProtocolo: 'COMPATIBILIDAD APROBADA CON PROTOCOLO PREVIO',
    resumenCip:
      'El sistema bloquea automáticamente 90 minutos previos (07:00 a 08:30 hs) en el cronograma para limpieza alcalina térmica a 75°C, neutralizando trazas proteicas y grasas lácteas antes del fraccionamiento.',
  },
  {
    id: 'queso-sardo',
    nombre: 'Queso Sardo Artesanal',
    loteSugerido: 'LOTE-RDL-2026-091',
    registroSenasa: 'SENASA S-I-03812 · ANMAT RNPA 21-094310',
    ph: '5.25',
    phDetalle: 'Pasta prensada madurada 90 días',
    alergenos: 'Libre de TACC · Contiene derivados lácteos (Homólogo a planta)',
    requierePurgaLactea: false,
    viscosidad: 'Sólido pasta compacta (35.5% Humedad / aw 0.91)',
    compatibilidadPct: 99,
    estadoProtocolo: 'COMPATIBILIDAD APROBADA CON PROTOCOLO PREVIO',
    resumenCip:
      'El sistema bloquea automáticamente 90 minutos previos (07:00 a 08:30 hs) para limpieza alcalina térmica a 75°C y sanitización de cuchillas ultrasónicas de corte y campana de vacío.',
  },
  {
    id: 'dulces-regionales',
    nombre: 'Dulces Regionales',
    loteSugerido: 'LOTE-RDL-2026-105',
    registroSenasa: 'SENASA RNE 21-049821 · ANMAT RNPA 21-120411',
    ph: '3.65',
    phDetalle: 'Alta acidez frutal · 65° Brix',
    alergenos: 'Libre de TACC, sin trazas lácteas',
    requierePurgaLactea: true,
    viscosidad: '3.200 cP (Gel pectina cítrica a 25°C)',
    compatibilidadPct: 94,
    estadoProtocolo: 'COMPATIBILIDAD APROBADA CON PROTOCOLO PREVIO',
    resumenCip:
      'El sistema bloquea automáticamente 90 minutos previos (07:00 a 08:30 hs) en el cronograma para limpieza alcalina térmica a 75°C (NaOH 2%) + neutralización ácida para eliminar trazas lácteas.',
  },
];

const MACHINERY_OPTIONS = [
  {
    id: 'linea-2-fraccionamiento',
    nombre: 'Línea 2 de Fraccionamiento (Coop. Tambera)',
    detalle: 'Dosificadora rotativa de viscosos y sólidos · AISI 316L · 2.500 env/h',
  },
  {
    id: 'linea-1-tetrabrik',
    nombre: 'Línea 1 Envasado Aséptico Tetrabrik (Coop. Tambera)',
    detalle: 'Envasadora UHT / Recart alta capacidad · 6.000 env/h',
  },
];

const WEEKLY_SCHEDULE = [
  {
    dia: 'Lunes',
    fecha: '02 Nov',
    disponible: false,
    estado: 'Producción Propia',
    detalle: 'Lotes lácteos Coop. Tambera (06:00 - 22:00)',
  },
  {
    dia: 'Martes',
    fecha: '03 Nov',
    disponible: true,
    estado: 'Capacidad Ociosa Disponible',
    detalle: 'Ventana intercooperativa habilitada (07:00 - 18:00)',
    horarioTurno: 'Martes 08:30 - 14:00',
  },
  {
    dia: 'Miércoles',
    fecha: '04 Nov',
    disponible: false,
    estado: 'Producción Propia',
    detalle: 'Fluido UHT & Crema Coop. Tambera (06:00 - 22:00)',
  },
  {
    dia: 'Jueves',
    fecha: '05 Nov',
    disponible: true,
    estado: 'Capacidad Ociosa Disponible',
    detalle: 'CIP 07:00-08:30 + Fraccionamiento 08:30-14:00',
    horarioTurno: 'Jueves 08:30 - 14:00',
    destacado: true,
  },
  {
    dia: 'Viernes',
    fecha: '06 Nov',
    disponible: false,
    estado: 'Producción Propia',
    detalle: 'Cierre semanal lácteo & auditoría interna',
  },
];

const INITIAL_CHECKLIST = [
  {
    id: 'chk-cuchillas',
    label: 'Estado de cuchillas, picos dosificadores y sellos sanitarios EPDM verificado',
    norma: 'POES-CT-04',
    checked: true,
  },
  {
    id: 'chk-sanitizacion',
    label: 'Sanitización alcalina térmica a 75°C (90 min previos) validada por conductímetro (< 1.5 µS/cm)',
    norma: 'CIP-75C-OK',
    checked: true,
  },
  {
    id: 'chk-alergenos',
    label: 'Ausencia de trazas lácteas confirmada mediante hisopado rápido ATP / Test ELISA (< 2 ppm)',
    norma: 'SENASA / ANMAT',
    checked: true,
  },
  {
    id: 'chk-envases',
    label: 'Lote de frascos / bio-empaques UNL esterilizados en ingreso a sala limpia',
    norma: 'CAA Cap. IV',
    checked: false,
  },
];

export default function BromatologicalEngine({ demoMode = false }) {
  const [selectedProductId, setSelectedProductId] = useState('miel-isla');
  const [selectedMachineId, setSelectedMachineId] = useState(
    'linea-2-fraccionamiento'
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [digitalSignature, setDigitalSignature] = useState(null);

  // Precarga instantánea cuando se activa el Demo Video Pitch (Paso 1)
  useEffect(() => {
    if (demoMode) {
      setSelectedProductId('miel-isla');
      setSelectedMachineId('linea-2-fraccionamiento');
      setSelectedSlot('Jueves 08:30 - 14:00');
      setChecklist((prev) => prev.map((item) => ({ ...item, checked: true })));
      setDigitalSignature({
        hash: '0xE404-CIP-B89VERDE',
        timestamp: '08:28 hs',
        responsable: 'Ing. Alim. M. Valenti (Mat. SENASA #4091)',
      });
    }
  }, [demoMode]);

  const currentProduct =
    BROMATOLOGICAL_PRODUCTS.find((p) => p.id === selectedProductId) ||
    BROMATOLOGICAL_PRODUCTS[0];

  const currentMachine =
    MACHINERY_OPTIONS.find((m) => m.id === selectedMachineId) ||
    MACHINERY_OPTIONS[0];

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    setDigitalSignature(null);
  };

  const handleToggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const allChecked = checklist.every((item) => item.checked);

  const handleReserveThursday = () => {
    setSelectedSlot('Jueves 08:30 - 14:00');
    setDigitalSignature(null);
  };

  const handleDigitalSign = () => {
    const hash =
      '0xE404-CIP-' +
      Math.random().toString(16).substring(2, 8).toUpperCase();
    setDigitalSignature({
      hash,
      timestamp: new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      responsable: 'Ing. Alim. M. Valenti (Mat. SENASA #4091)',
    });
  };

  return (
    <div className="space-y-6">
      {demoMode && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Caso Precargado: Miel Silvestre de Raíces del Litoral para Súper
              Cadena Nacional
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
            VALIDACIÓN CIP 75°C EN VERDE
          </span>
        </div>
      )}

      {/* FILA SUPERIOR: 1) FORMULARIO DE SOLICITUD + 2) MOTOR DE VALIDACIÓN SANITARIA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Formulario de Solicitud de Turno + Ficha Técnica SENASA/ANMAT */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  1. Solicitud de Turno de Maquila
                </h2>
                <p className="text-xs text-slate-500">
                  Parámetros bromatológicos de origen
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              SENASA / ANMAT
            </span>
          </div>

          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="product-select"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Producto a elaborar / fraccionar (Raíces del Litoral)
              </label>
              <select
                id="product-select"
                value={selectedProductId}
                onChange={handleProductChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                {BROMATOLOGICAL_PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {demoMode && prod.id === 'miel-isla'
                      ? prod.casoDemoNombre
                      : prod.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="machine-select"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Maquinaria Ociosa de Destino
              </label>
              <select
                id="machine-select"
                value={selectedMachineId}
                onChange={(e) => setSelectedMachineId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                {MACHINERY_OPTIONS.map((mach) => (
                  <option key={mach.id} value={mach.id}>
                    {mach.nombre}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                {currentMachine.detalle}
              </p>
            </div>
          </div>

          {/* Ficha Técnica Automática SENASA/ANMAT */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Ficha Técnica SENASA / ANMAT
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">
                {currentProduct.loteSugerido}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Acidez (pH)</span>
                </div>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  pH {currentProduct.ph}
                </p>
                <span className="text-[11px] text-slate-500 block">
                  {currentProduct.phDetalle}
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Viscosidad</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                  {currentProduct.viscosidad}
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200/80 flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] text-slate-500 block">
                  Perfil de Alérgenos Declarados
                </span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {currentProduct.alergenos}
                </p>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {currentProduct.registroSenasa}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                Verificado
              </span>
            </div>
          </div>
        </section>

        {/* 2. Motor de Validación Sanitaria (Algoritmo Visual + Bloqueo CIP 90 min) */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  2. Motor de Validación Sanitaria & Bioseguridad
                </h2>
                <p className="text-xs text-slate-500">
                  Cruza matriz del producto con historial lácteo de{' '}
                  {currentMachine.nombre}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                {currentProduct.estadoProtocolo}
              </span>
            </div>

            {/* Barra de Progreso de Compatibilidad */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Índice de Compatibilidad Fisicoquímica & Sanitaria
                </span>
                <span className="font-bold text-emerald-700 text-sm">
                  {currentProduct.compatibilidadPct}% Aprobado
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  style={{ width: `${currentProduct.compatibilidadPct}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                <span>
                  ✓ Acero Inox AISI 316L compatible con pH {currentProduct.ph}
                </span>
                <span>✓ Caudal regulado para viscosidad del lote</span>
              </div>
            </div>

            {/* Bloque Automático: Ciclo CIP Obligatorio (En verde si está validado en Demo Mode) */}
            <div
              className={`rounded-xl border p-4 space-y-3 transition-colors ${
                demoMode || digitalSignature
                  ? 'bg-emerald-50/80 border-emerald-300'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg ${
                      demoMode || digitalSignature
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {demoMode || digitalSignature ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </span>
                  <div>
                    <h3
                      className={`text-xs sm:text-sm font-bold ${
                        demoMode || digitalSignature
                          ? 'text-emerald-950'
                          : 'text-amber-950'
                      }`}
                    >
                      Ciclo CIP (Cleaning-In-Place) Obligatorio Pre-Turno
                    </h3>
                    <span
                      className={`text-[11px] font-medium ${
                        demoMode || digitalSignature
                          ? 'text-emerald-800'
                          : 'text-amber-800'
                      }`}
                    >
                      {demoMode || digitalSignature
                        ? 'Validación CIP en verde completada (75°C · 90 min verificados)'
                        : `Bloqueo automático de seguridad antes de ingresar ${currentProduct.nombre}`}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                    demoMode || digitalSignature
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-amber-200/80 text-amber-950 border-amber-300'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  {demoMode || digitalSignature
                    ? 'CIP 90 min (75°C) VALIDADO'
                    : 'Bloqueo: 90 min previos (75°C)'}
                </span>
              </div>

              <p
                className={`text-xs leading-relaxed ${
                  demoMode || digitalSignature
                    ? 'text-emerald-950'
                    : 'text-amber-900'
                }`}
              >
                {currentProduct.resumenCip}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="bg-white/90 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      Ventana Bloqueada
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      90 min (07:00 - 08:30)
                    </span>
                  </div>
                </div>

                <div className="bg-white/90 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      Lavado Alcalino Térmico
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      75°C · NaOH 2.0%
                    </span>
                  </div>
                </div>

                <div className="bg-white/90 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      Neutralización Trazas
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      ELISA Caseína 0 ppm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Póliza Paramétrica{' '}
              <strong className="text-slate-800">Sancor Seguros</strong> activa
              al validar el ciclo CIP.
            </div>
            <button
              type="button"
              onClick={handleReserveThursday}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Turno Jueves 08:30 - 14:00</span>
            </button>
          </div>
        </section>
      </div>

      {/* 3. CALENDARIO SEMANAL / TIME-SHARING DE LÍNEA */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>3. Calendario Time-Sharing — {currentMachine.nombre}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Días Martes y Jueves habilitados como Capacidad Ociosa Disponible
              para cooperativas asociadas
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              Uso Propio Tambera
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Capacidad Ociosa Disponible
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {WEEKLY_SCHEDULE.map((item) => {
            const isSelected = selectedSlot === item.horarioTurno;
            if (!item.disponible) {
              return (
                <div
                  key={item.dia}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">
                      {item.dia}
                    </span>
                    <span className="text-[11px]">{item.fecha}</span>
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-600">
                      {item.estado}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      {item.detalle}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.dia}
                onClick={() => {
                  setSelectedSlot(item.horarioTurno);
                  setDigitalSignature(null);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-white border-emerald-300 hover:border-emerald-500 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {item.dia}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {item.fecha}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <Sparkles className="w-3 h-3" />
                    {item.estado}
                  </span>
                  <p className="text-[11px] text-slate-600">{item.detalle}</p>
                  <div className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
                    ✓ 07:00-08:30 CIP 75°C (90m)
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSlot(item.horarioTurno);
                    setDigitalSignature(null);
                  }}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isSelected
                    ? `✓ ${item.horarioTurno}`
                    : `Reservar Turno ${item.horarioTurno}`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CHECKLIST DIGITAL DE RECEPCIÓN Y FIRMA DIGITAL */}
      {selectedSlot && (
        <section className="bg-white border-2 border-emerald-500/80 rounded-xl p-5 shadow-md space-y-4 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Turno Seleccionado: {selectedSlot}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  CIP Previo 07:00 - 08:30 hs (75°C Validado)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Checklist Digital de Recepción de Línea & Conformidad Sanitaria
              </h3>
              <p className="text-xs text-slate-500">
                Producto: <strong>{currentProduct.nombre}</strong> · Planta:{' '}
                <strong>{currentMachine.nombre}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="text-xs text-slate-400 hover:text-slate-700 self-start"
            >
              Cerrar checklist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklist.map((item) => (
              <label
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  item.checked
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleCheck(item.id)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      {item.label}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-600 shrink-0">
                      {item.norma}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {digitalSignature ? (
              <div className="w-full p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-emerald-950">
                      Recepción de Línea Firmada Digitalmente · Turno{' '}
                      {selectedSlot} Confirmado
                    </p>
                    <p className="text-emerald-800">
                      Responsable: {digitalSignature.responsable} · Hora:{' '}
                      {digitalSignature.timestamp} · Hash:{' '}
                      <span className="font-mono font-bold">
                        {digitalSignature.hash}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-300 text-xs font-bold shrink-0">
                  Póliza Sancor Seguros Activa
                </span>
              </div>
            ) : (
              <>
                <span className="text-xs text-slate-500">
                  {allChecked
                    ? '✓ Todos los puntos críticos de control están verificados para firmar.'
                    : 'Marcá los 4 puntos de verificación sanitaria para habilitar la firma digital.'}
                </span>

                <button
                  type="button"
                  disabled={!allChecked}
                  onClick={handleDigitalSign}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    allChecked
                      ? 'bg-slate-900 hover:bg-emerald-700 text-white shadow-sm cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Firmar Digitalmente Recepción de Línea</span>
                </button>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
