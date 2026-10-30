// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import BromatologicalEngine from './components/BromatologicalEngine';
import SymbioticLogistics from './components/SymbioticLogistics';
import DigitalPassport from './components/DigitalPassport';
import SmartSLAs from './components/SmartSLAs';
import {
  DEMO_CASE_INFO,
  DEMO_STEPS,
  formatDemoTimer,
  registerDemoKeyboardShortcuts,
} from './utils/demoController';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Timer,
  Sparkles,
  X,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('bromatologia');
  const [activeEntityId, setActiveEntityId] = useState('raices');

  // Estados del Controlador Demo Video Pitch (120s)
  const [demoActive, setDemoActive] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const currentDemoStep = DEMO_STEPS[demoStepIndex] || DEMO_STEPS[0];

  // Sincroniza pestaña y entidad al cambiar de paso en la Demo
  const applyDemoStep = useCallback((index) => {
    const target = DEMO_STEPS[index];
    if (!target) return;
    setDemoStepIndex(index);
    setActiveTab(target.tabId);
    setActiveEntityId(target.entityId);
  }, []);

  // Inicia el Demo Video Pitch (120s) precargando el caso "Miel Silvestre..."
  const handleStartDemo = () => {
    setDemoActive(true);
    setElapsedSeconds(0);
    setTimerRunning(true);
    applyDemoStep(0);
  };

  const handleExitDemo = useCallback(() => {
    setDemoActive(false);
    setTimerRunning(false);
  }, []);

  const handleNextStep = useCallback(() => {
    const nextIdx = (demoStepIndex + 1) % DEMO_STEPS.length;
    applyDemoStep(nextIdx);
  }, [demoStepIndex, applyDemoStep]);

  const handlePrevStep = useCallback(() => {
    const prevIdx =
      (demoStepIndex - 1 + DEMO_STEPS.length) % DEMO_STEPS.length;
    applyDemoStep(prevIdx);
  }, [demoStepIndex, applyDemoStep]);

  // Cronómetro de 00:00 a 02:00 (120 segundos)
  useEffect(() => {
    if (!demoActive || !timerRunning) return undefined;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= DEMO_CASE_INFO.duracionMaximaSeg) {
          setTimerRunning(false);
          return DEMO_CASE_INFO.duracionMaximaSeg;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [demoActive, timerRunning]);

  // Atajos de teclado (Flecha Derecha, Flecha Izquierda, 1-4, Escape)
  useEffect(() => {
    return registerDemoKeyboardShortcuts({
      enabled: demoActive,
      onNextStep: handleNextStep,
      onPrevStep: handlePrevStep,
      onGoToStep: applyDemoStep,
      onExitDemo: handleExitDemo,
    });
  }, [demoActive, handleNextStep, handlePrevStep, applyDemoStep, handleExitDemo]);

  return (
    <>
      {/* 1. BOTÓN FLOTANTE SUPERIOR DERECHO: "▶ Iniciar Demo Video (Pitch 120s)" */}
      <div className="fixed top-3 right-4 z-50">
        {!demoActive ? (
          <button
            type="button"
            onClick={handleStartDemo}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer border border-slate-700"
          >
            <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span>▶ Iniciar Demo Video (Pitch 120s)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleExitDemo}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Demo Activa · Paso {currentDemoStep.stepNumber}/4</span>
            <X className="w-3.5 h-3.5 ml-1" />
          </button>
        )}
      </div>

      {/* BANNER GUIADO DEL CASO DE ÉXITO PRECARGADO (Visible cuando el modo Demo está activo) */}
      {demoActive && (
        <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-3 sticky top-16 z-40 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[11px] font-bold">
                  CASO DE ÉXITO PRECARGADO
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-300">
                  {DEMO_CASE_INFO.titulo}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({ currentDemoStep.rangoTiempo })
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                {currentDemoStep.titulo}
              </p>
              <p className="text-xs text-slate-300 max-w-4xl">
                {currentDemoStep.guionGrabacion}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
              <button
                type="button"
                onClick={handlePrevStep}
                title="Atajo: Flecha Izquierda (<-)"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {DEMO_STEPS.map((st, idx) => (
                  <button
                    key={st.stepNumber}
                    type="button"
                    onClick={() => applyDemoStep(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      idx === demoStepIndex
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.stepNumber}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                title="Atajo: Flecha Derecha (->)"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                <span>Paso Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CRONÓMETRO FLOTANTE EN LA ESQUINA (00:00 a 02:00) */}
      {demoActive && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white border border-slate-700 rounded-2xl p-3.5 shadow-2xl w-72 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Timer className="w-4 h-4 text-emerald-400" />
              <span>Cronómetro Pitch (120s)</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">
              Bloque {currentDemoStep.rangoTiempo}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-mono text-2xl font-extrabold tracking-tight text-white">
              {formatDemoTimer(elapsedSeconds)}{' '}
              <span className="text-sm font-normal text-slate-400">
                / 02:00
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                title={timerRunning ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                {timerRunning ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setElapsedSeconds(0);
                  setTimerRunning(true);
                }}
                title="Reiniciar a 00:00"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Barra de progreso de 00:00 a 02:00 */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              style={{
                width: `${
                  (elapsedSeconds / DEMO_CASE_INFO.duracionMaximaSeg) * 100
                }%`,
              }}
              className="h-full bg-emerald-500 transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Atajos: [←/→] o [1-4]</span>
            <button
              type="button"
              onClick={handleNextStep}
              className="text-emerald-400 hover:underline font-bold cursor-pointer"
            >
              Paso Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* LAYOUT PRINCIPAL CON LAS 4 VISTAS CONECTADAS */}
      <Layout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeEntityId={activeEntityId}
        setActiveEntityId={setActiveEntityId}
      >
        {/* Paso 1: Vista Bromatológica con validación CIP en verde */}
        {activeTab === 'bromatologia' && (
          <BromatologicalEngine demoMode={demoActive} />
        )}

        {/* Paso 2: Vista Logística completando bodega al 92% y mapa de ruta */}
        {activeTab === 'logistica' && (
          <SymbioticLogistics demoMode={demoActive} />
        )}

        {/* Paso 3: Apertura automática del modal del Pasaporte Digital con el QR escaneado */}
        {activeTab === 'pasaporte' && (
          <DigitalPassport
            onNavigateToSla={() => setActiveTab('slas')}
            autoOpenModal={demoActive && activeTab === 'pasaporte'}
          />
        )}

        {/* Paso 4: Cierre en el panel de Gobernanza con la liquidación solidaria formalizada */}
        {activeTab === 'slas' && (
          <SmartSLAs
            onNavigateToPassport={() => setActiveTab('pasaporte')}
            demoMode={demoActive}
          />
        )}
      </Layout>
    </>
  );
}
