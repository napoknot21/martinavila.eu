import type { SVGProps } from 'react';
import type { DiagramId } from '@/content/types';

/**
 * Line diagrams for the five services: 1.25 px strokes in --ink, one --accent
 * element each. Shapes carry class `draw` + pathLength="1" so they can stroke
 * themselves in (see globals.css).
 */
const INK = 'var(--ink)';
const ACCENT = 'var(--accent)';

const stroke = {
  fill: 'none',
  stroke: INK,
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  pathLength: 1,
  className: 'draw',
} as const satisfies SVGProps<SVGPathElement>;

const accent = { ...stroke, stroke: ACCENT } as const;

const labelStyle = {
  fontFamily: 'var(--stack-mono)',
  fontSize: 7,
  letterSpacing: '0.08em',
  fill: 'var(--muted)',
} as const;

function InternalTools() {
  return (
    <>
      {[12, 42, 72].map((y) => (
        <rect key={y} x="8" y={y} width="34" height="18" rx="1" {...stroke} />
      ))}
      <path d="M42 21 C 66 21, 66 44, 92 47" {...stroke} />
      <path d="M42 51 L92 51" {...stroke} />
      <path d="M42 81 C 66 81, 66 58, 92 55" {...stroke} />
      <rect x="92" y="32" width="60" height="38" rx="1" {...accent} />
      <path d="M100 43 H140 M100 51 H132 M100 59 H136" {...stroke} />
    </>
  );
}

function DataAutomation() {
  return (
    <>
      {/* source cylinder */}
      <path d="M8 44 v24 a12 4 0 0 0 24 0 v-24" {...stroke} />
      <ellipse cx="20" cy="44" rx="12" ry="4" {...stroke} />
      <path d="M32 56 H46" {...stroke} />
      <rect x="46" y="46" width="24" height="20" rx="1" {...stroke} />
      <path d="M70 56 H84" {...stroke} />
      <rect x="84" y="46" width="24" height="20" rx="1" {...stroke} />
      <path d="M108 56 H122" {...stroke} />
      <path d="M122 46 H150 V66 H122 Z M128 52 H144 M128 60 H140" {...stroke} />
      {/* clock */}
      <circle cx="96" cy="22" r="11" {...accent} />
      <path d="M96 15 V22 L101 25" {...accent} />
    </>
  );
}

function QuantSoftware() {
  // A smooth model curve, its confidence band and a few sample points.
  const curve = 'M10 72 C 34 70, 46 30, 70 34 S 108 66, 128 46 S 146 22, 152 20';
  const band =
    'M10 62 C 34 60, 46 20, 70 24 S 108 56, 128 36 S 146 12, 152 10 L152 30 C 146 32, 140 52, 128 56 S 92 44, 70 44 S 34 80, 10 82 Z';
  const samples: [number, number][] = [
    [22, 68],
    [44, 46],
    [62, 37],
    [86, 44],
    [104, 58],
    [124, 50],
    [144, 26],
  ];
  return (
    <>
      <path d="M10 8 V88 H152" {...stroke} />
      <path d={band} fill={ACCENT} fillOpacity="0.12" stroke="none" className="draw-fade" />
      <path d={curve} {...accent} />
      {samples.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="1.8" {...stroke} />
      ))}
    </>
  );
}

function AppliedAi() {
  return (
    <>
      <path d="M10 10 H44 L54 20 V86 H10 Z M44 10 V20 H54" {...stroke} />
      <path d="M18 32 H46 M18 44 H42 M18 56 H46 M18 68 H38" {...stroke} />
      <path d="M58 44 C 82 44, 84 20, 104 20" {...stroke} />
      <path d="M58 50 H104" {...stroke} />
      <path d="M58 56 C 82 56, 84 80, 104 80" {...stroke} />
      <rect x="104" y="11" width="46" height="18" rx="1" {...accent} />
      <rect x="104" y="41" width="46" height="18" rx="1" {...stroke} />
      <rect x="104" y="71" width="46" height="18" rx="1" {...stroke} />
      <g className="draw-fade" style={labelStyle}>
        <text x="127" y="22.5" textAnchor="middle">
          POS
        </text>
        <text x="127" y="52.5" textAnchor="middle">
          NEU
        </text>
        <text x="127" y="82.5" textAnchor="middle">
          NEG
        </text>
      </g>
    </>
  );
}

function Websites() {
  return (
    <>
      <rect x="10" y="10" width="140" height="80" rx="2" {...stroke} />
      <path d="M10 24 H150" {...stroke} />
      <circle cx="18" cy="17" r="1.6" {...stroke} />
      <circle cx="25" cy="17" r="1.6" {...stroke} />
      <circle cx="32" cy="17" r="1.6" {...stroke} />
      <rect x="20" y="32" width="120" height="16" {...accent} />
      <rect x="20" y="54" width="36" height="28" {...stroke} />
      <rect x="62" y="54" width="36" height="28" {...stroke} />
      <rect x="104" y="54" width="36" height="28" {...stroke} />
    </>
  );
}

const diagrams: Record<DiagramId, () => React.JSX.Element> = {
  platforms: InternalTools,
  data: DataAutomation,
  ai: AppliedAi,
  quant: QuantSoftware,
  web: Websites,
};

/**
 * `width` is the size the diagram is displayed at, in CSS px. The stroke is
 * set in user units from it so lines measure 1.25 px on screen. (We avoid
 * vector-effect: non-scaling-stroke: Chrome then ignores pathLength for
 * dashes, which breaks the stroke-dashoffset drawing.)
 */
export function ServiceDiagram({
  id,
  className,
  width = 144,
}: {
  id: DiagramId;
  className?: string;
  width?: number;
}) {
  const Diagram = diagrams[id];
  return (
    <svg
      viewBox="0 0 160 96"
      className={`diagram ${className ?? ''}`}
      style={{ ['--sw' as string]: ((1.25 * 160) / width).toFixed(3) }}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Diagram />
    </svg>
  );
}

export default ServiceDiagram;
