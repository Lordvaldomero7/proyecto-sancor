// src/App.jsx
import React, { useState } from 'react';
import Layout from './components/Layout';
import {
  PRODUCTS_CATALOG,
  ACTIVE_ROUTES,
  DIGITAL_PASSPORTS,
  SMART_SLAS,
} from './data/mockData';
import {
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  Leaf,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('bromatologia');
  const [activeEntityId, setActiveEntityId] = useState('raices');
  const [videoMode, setVideoMode] = useState(false);
  const [pitchStepIndex, setPitchStepIndex] = useState(0);

  const [selectedProductId, setSelectedProductId] = useState(
    PRODUCTS_CATALOG[0].id
  );
  const [reservedCip, setReservedCip] = useState({});

  const [selectedRouteId, setSelectedRouteId] = useState(ACTIVE_ROUTES[0].id);
  const [reservedRoute, setReservedRoute] = useState({});

  const [selectedPassportId, setSelectedPassportId] = useState(
    DIGITAL_PASSPORTS[0].loteId
  );

  const [selectedSlaId, setSelectedSlaId] = useState(SMART_SLAS[0].id);
  const [settledSla, setSettledSla] = useState({});

  const selectedProduct =
    PRODUCTS_CATALOG.find((p) => p.id === selectedProductId) ||
    PRODUCTS_CATALOG[0];
  const selectedRoute =
    ACTIVE_ROUTES.find((r) => r.id === selectedRouteId) || ACTIVE_ROUTES[0];
  const selectedPassport =
    DIGITAL_PASSPORTS.find((d) => d.loteId === selectedPassportId) ||
    DIGITAL_PASSPORTS[0];
  const selectedSla =
    SMART_SLAS.find((s) => s.id === selectedSlaId) || SMART_SLAS[0];

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      activeEntityId={activeEntityId}
      setActiveEntityId={setActiveEntityId}
      videoMode={videoMode}
      setVideoMode={setVideoMode}
      pitchStepIndex={pitchStepIndex}
      setPitchStepIndex={setPitchStepIndex}
    >
      {/* =====================================================================
          1) MOTOR BROMATOLÓGICO & CIP
         ===================================================================== */}
      {activeTab === 'bromatologia' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lista simple de productos */}
          <div className="lg:col-span-4 space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
              Catálogo Raíces del Litoral
            </h2>
            {PRODUCTS_CATALOG.map((prod) => {
              const isSelected = prod.id === selectedProduct.id;
              const score = prod.compatibilidadIndustrial.scoreMatch;
              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-600 ring-1 ring-emerald-600 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {prod.nombre}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                        score >= 90
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {score}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    pH {prod.atributosBromatologicos.pH} ·{' '}
                    {prod.atributosBromatologicos.actividadAcuosa}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Ficha limpia de validación bromatológica */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-medium text-slate-500">
                  {selectedProduct.registrosSanitarios.senasa} ·{' '}
                  {selectedProduct.registrosSanitarios.anmat}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedProduct.nombre}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold self-start">
                {selectedProduct.compatibilidadIndustrial.estadoMatch}
              </span>
            </div>

            {/* 3 Atributos Bromatológicos Clave */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">
                  Acidez (pH) & Actividad Acuosa
                </span>
                <span className="text-base font-bold text-slate-900 mt-1 block">
                  pH {selectedProduct.atributosBromatologicos.pH} (
                  {selectedProduct.atributosBromatologicos.actividadAcuosa})
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Viscosidad</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {selectedProduct.atributosBromatologicos.viscosidad}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">
                  Alérgenos SENASA / ANMAT
                </span>
                <span className="text-xs font-semibold text-slate-800 mt-1 block">
                  {selectedProduct.atributosBromatologicos.alergenosSenasaAnmat.join(
                    ', '
                  )}
                </span>
              </div>
            </div>

            {/* Destino Industrial + Biopolímero UNL/UNLa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-emerald-700 block">
                  Maquila en Cooperativa Tambera La Unión
                </span>
                <p className="text-sm font-medium text-slate-900 mt-1">
                  {selectedProduct.compatibilidadIndustrial.lineaAsignada}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Turno ocioso: {selectedProduct.compatibilidadIndustrial.diaVentana}
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  Empaque Sostenible (UNL / UNLa)
                </span>
                <p className="text-sm font-medium text-slate-900 mt-1">
                  {selectedProduct.compatibilidadIndustrial.envaseBiopolimero}
                </p>
              </div>
            </div>

            {/* Protocolo CIP resumido */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Protocolo Limpieza: {selectedProduct.compatibilidadIndustrial.protocoloCIP.codigo}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedProduct.compatibilidadIndustrial.protocoloCIP.duracionMinutos} min
                </span>
              </div>

              <ul className="space-y-1 text-xs text-slate-600">
                {selectedProduct.compatibilidadIndustrial.protocoloCIP.etapas.map(
                  (etapa, idx) => (
                    <li key={idx}>{etapa}</li>
                  )
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Canon CIP solidario:{' '}
                <strong className="text-slate-800">
                  {selectedProduct.compatibilidadIndustrial.protocoloCIP.costoSolidarioCIP}
                </strong>
              </span>

              <button
                type="button"
                onClick={() =>
                  setReservedCip((prev) => ({
                    ...prev,
                    [selectedProduct.id]: true,
                  }))
                }
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                {reservedCip[selectedProduct.id]
                  ? '✓ Turno Martes/Jueves Reservado'
                  : 'Reservar Turno de Maquila'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2) LOGÍSTICA SIMBIÓTICA (BACKHAULING)
         ===================================================================== */}
      {activeTab === 'logistica' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lista de rutas viales */}
          <div className="lg:col-span-4 space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
              Rutas Activas Cootrans (Litoral)
            </h2>
            {ACTIVE_ROUTES.map((route) => {
              const isSelected = route.id === selectedRoute.id;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-600 ring-1 ring-emerald-600 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-emerald-700">
                      {route.patente}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
                      {route.bodegaVaciaRetornoPct}% Bodega Libre
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {route.corredor}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {route.palletsDisponiblesRetorno} pallets disponibles ·{' '}
                    {route.tarifaSimbioticaSolidaria}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detalle de Ruta y Bodega */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-500">
                  {selectedRoute.camion}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedRoute.corredor}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold self-start">
                -{selectedRoute.huellaCarbonoEvitada}
              </span>
            </div>

            {/* Barra simple de ocupación de bodega */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">
                  Aprovechamiento de Bodega en Retorno ({selectedRoute.bodegaTotalPallets} pallets)
                </span>
                <span className="text-emerald-700 font-semibold">
                  {selectedRoute.bodegaVaciaRetornoPct}% disponible ({selectedRoute.palletsDisponiblesRetorno} pallets)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  style={{
                    width: `${100 - selectedRoute.bodegaVaciaRetornoPct}%`,
                  }}
                  className="bg-slate-400"
                />
                <div
                  style={{ width: `${selectedRoute.bodegaVaciaRetornoPct}%` }}
                  className="bg-emerald-500"
                />
              </div>
            </div>

            {/* Temperaturas de Cámara */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">
                  Cámara Delantera (Refrigerados)
                </span>
                <span className="text-sm font-semibold text-slate-900 mt-1 block">
                  {selectedRoute.configuracionTermica.camaraDelantera}
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">
                  Cámara Trasera (Fresco Controlado)
                </span>
                <span className="text-sm font-semibold text-slate-900 mt-1 block">
                  {selectedRoute.configuracionTermica.camaraTrasera}
                </span>
              </div>
            </div>

            {/* Paradas del corredor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedRoute.coordenadasNodos.map((nodo, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {nodo.nombre}
                      </p>
                      <p className="text-[11px] text-slate-500">{nodo.estado}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {nodo.temp}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-slate-400 line-through block">
                  Flete tradicional: {selectedRoute.tarifaMercadoTradicional}
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  Tarifa Backhauling: {selectedRoute.tarifaSimbioticaSolidaria}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setReservedRoute((prev) => ({
                    ...prev,
                    [selectedRoute.id]: true,
                  }))
                }
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                {reservedRoute[selectedRoute.id]
                  ? '✓ Pallets Consolidados'
                  : 'Reservar Bodega de Retorno'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3) PASAPORTE DIGITAL & TRAZABILIDAD
         ===================================================================== */}
      {activeTab === 'pasaporte' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {DIGITAL_PASSPORTS.map((pass) => (
              <button
                key={pass.loteId}
                type="button"
                onClick={() => setSelectedPassportId(pass.loteId)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-colors ${
                  selectedPassport.loteId === pass.loteId
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Lote {pass.loteId}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Eslabones */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-xs text-emerald-700 font-semibold">
                  {selectedPassport.estado}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedPassport.producto}
                </h3>
              </div>

              <div className="space-y-3">
                {selectedPassport.eslabones.map((item) => (
                  <div
                    key={item.orden}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                          {item.orden}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {item.entidad}
                        </span>
                        <span className="text-xs text-slate-500">
                          · {item.rol}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 pl-7">
                        {item.detalleTecnico}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded self-start sm:self-center shrink-0">
                      ✓ {item.selloValidacion}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarjeta QR Simple */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4 text-center">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase text-slate-500 block">
                  Pasaporte Digital QR
                </span>
                <div className="w-32 h-32 mx-auto rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-800" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {selectedPassport.loteId}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {selectedPassport.hashInmutable}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-left">
                <div className="p-3 rounded-lg bg-slate-50">
                  <span className="text-[11px] text-slate-500 block">
                    CO₂e Evitado
                  </span>
                  <span className="text-sm font-bold text-emerald-700">
                    -{selectedPassport.impactoAmbientalYCooperativo.co2EvitadoKg} kg
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <span className="text-[11px] text-slate-500 block">
                    Bio-Empaque UNL
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    -{selectedPassport.impactoAmbientalYCooperativo.plasticoFosilEvitadoKg} kg plástico
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4) SMART SLAs & LIQUIDACIÓN SOLIDARIA
         ===================================================================== */}
      {activeTab === 'slas' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {SMART_SLAS.map((sla) => (
              <button
                key={sla.id}
                type="button"
                onClick={() => setSelectedSlaId(sla.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-colors ${
                  selectedSla.id === sla.id
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sla.id} · {sla.titulo.split('&')[0]}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {selectedSla.respaldoAsegurador}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedSla.titulo}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold self-start">
                {selectedSla.estado}
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900">Condición IoT:</strong>{' '}
              {selectedSla.condicionDisparo}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">
                  Distribución Solidaria ({selectedSla.montoTotalOperacion})
                </span>
                <span className="text-emerald-700 font-semibold">
                  Ahorro: {selectedSla.ahorroFrenteAMercado}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedSla.distribucionSolidaria.map((dist, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg border border-slate-200 space-y-2"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-800">
                        {dist.entidad}
                      </span>
                      <span className="font-bold text-slate-900">
                        {dist.monto} ({dist.porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        style={{ width: `${dist.porcentaje}%` }}
                        className="h-full bg-emerald-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-2">
                {Object.values(selectedSla.metricasTelemetria).map((val, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {val}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setSettledSla((prev) => ({
                    ...prev,
                    [selectedSla.id]: true,
                  }))
                }
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
              >
                {settledSla[selectedSla.id]
                  ? '✓ Liquidación Ejecutada'
                  : 'Liquidar Contrato Solidario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
