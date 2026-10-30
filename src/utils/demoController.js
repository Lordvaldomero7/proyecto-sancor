// src/utils/demoController.js
// Controlador de Automatización para el Video Pitch (120 segundos / 00:00 a 02:00)
// Caso de Éxito: "Miel Silvestre de Raíces del Litoral para Súper Cadena Nacional"

export const DEMO_CASE_INFO = {
  id: 'CASO-E404-MIEL-NACIONAL',
  titulo: 'Miel Silvestre de Raíces del Litoral para Súper Cadena Nacional',
  loteUuid: 'LOTE-RL-2026-B89',
  volumen: '1.200 Frascos x 500g (Envase Biopolímero UNLa Cert. N° 4412)',
  duracionMaximaSeg: 120,
};

export const DEMO_STEPS = [
  {
    stepIndex: 0,
    stepNumber: 1,
    tabId: 'bromatologia',
    entityId: 'raices',
    rangoTiempo: '00:00 - 00:30',
    inicioSeg: 0,
    finSeg: 30,
    titulo: 'Paso 1: Validación Bromatológica & Ciclo CIP en Verde',
    accionAutomatica:
      'Caso precargado: Miel Silvestre (pH 3.9, Sin TACC) asignada a Línea 2 de Coop. Tambera con validación CIP 75°C aprobada en verde y turno Jueves firmado.',
    guionGrabacion:
      '“Raíces del Litoral recibe una orden de 1.200 frascos de Miel Silvestre para una Súper Cadena Nacional. El Motor Bromatológico valida pH 3.9, bloquea 90 minutos previos de limpieza CIP a 75°C y aprueba la compatibilidad en verde.”',
  },
  {
    stepIndex: 1,
    stepNumber: 2,
    tabId: 'logistica',
    entityId: 'transporte',
    rangoTiempo: '00:30 - 01:00',
    inicioSeg: 30,
    finSeg: 60,
    titulo: 'Paso 2: Backhauling Cootrans (Bodega al 92% & Mapa PostGIS)',
    accionAutomatica:
      'Camión #04 de Cootrans completa bodega del 55% al 92% con desvío PostGIS de solo 7.4 km y remito digital consolidado.',
    guionGrabacion:
      '“Para distribuir sin falso flete, el Camión #04 de Cootrans aprovecha su retorno Rosario-Santa Fe, sumando los 1.200 frascos para completar el 92% de bodega con un desvío PostGIS de apenas 7.4 km y 48.5% de ahorro.”',
  },
  {
    stepIndex: 2,
    stepNumber: 3,
    tabId: 'pasaporte',
    entityId: 'universidad',
    rangoTiempo: '01:00 - 01:30',
    inicioSeg: 60,
    finSeg: 90,
    titulo: 'Paso 3: Escaneo Automático del Pasaporte Digital QR',
    accionAutomatica:
      'Apertura automática del modal móvil de auditoría del supermercado con trazabilidad de origen, CIP, biopolímero UNLa Cert. N° 4412 y logística.',
    guionGrabacion:
      '“Al llegar al Centro de Distribución del Supermercado, el auditor escanea el QR del Lote B89 y verifica en su móvil el origen cooperativo, el turno CIP en planta tambera y el envase biodegradable validado por UNLa.”',
  },
  {
    stepIndex: 3,
    stepNumber: 4,
    tabId: 'slas',
    entityId: 'tambera',
    rangoTiempo: '01:30 - 02:00',
    inicioSeg: 90,
    finSeg: 120,
    titulo: 'Paso 4: Gobernanza & Liquidación Solidaria Formalizada',
    accionAutomatica:
      'Formalización automática de la liquidación compensatoria de $107.800 bajo Acto Cooperativo (Ley 20.337) y Principio Cooperativo N° 6.',
    guionGrabacion:
      '“Finalmente, el Smart SLA liquida automáticamente los $107.800 de costos compensatorios y el Fondo Solidario respaldado por Sancor Seguros bajo la figura de Acto Cooperativo (Ley 20.337).”',
  },
];

/**
 * Formatea segundos (0 a 120) en formato MM:SS (00:00 a 02:00)
 */
export function formatDemoTimer(seconds) {
  const clamped = Math.max(0, Math.min(DEMO_CASE_INFO.duracionMaximaSeg, seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Registra atajos de teclado para avanzar/retroceder en el Demo Video Pitch:
 * - Flecha Derecha (ArrowRight) o Barra Espaciadora: Paso Siguiente
 * - Flecha Izquierda (ArrowLeft): Paso Anterior
 * - Teclas 1, 2, 3, 4: Salto directo al paso correspondiente
 * - Escape: Salir del modo demo
 */
export function registerDemoKeyboardShortcuts({
  enabled,
  onNextStep,
  onPrevStep,
  onGoToStep,
  onExitDemo,
}) {
  if (!enabled) return () => {};

  const handleKeyDown = (event) => {
    const tag = event.target?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      onNextStep();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onPrevStep();
    } else if (event.key === '1') {
      onGoToStep(0);
    } else if (event.key === '2') {
      onGoToStep(1);
    } else if (event.key === '3') {
      onGoToStep(2);
    } else if (event.key === '4') {
      onGoToStep(3);
    } else if (event.key === 'Escape') {
      onExitDemo();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
