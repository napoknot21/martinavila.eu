'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SURFACE_DEFAULTS, surfaceState, type SurfaceState } from '@/components/three/surfaceState';

const SignatureSurface = dynamic(() => import('@/components/three/SignatureSurface'), {
  ssr: false,
});

const controls: { key: keyof SurfaceState; min: number; max: number }[] = [
  { key: 'amp', min: 0, max: 1.5 },
  { key: 'opacity', min: 0, max: 1 },
  { key: 'contour', min: 0, max: 1 },
  { key: 'cameraProgress', min: 0, max: 1 },
  { key: 'tint', min: 0, max: 1 },
];

/** Development only (`next dev`): the surface full screen, with sliders for its state. */
export default function SurfaceLab() {
  const [values, setValues] = useState<SurfaceState>({ ...SURFACE_DEFAULTS });
  const [paper, setPaper] = useState(false);

  const update = (key: keyof SurfaceState, value: number) => {
    surfaceState[key] = value;
    setValues((v) => ({ ...v, [key]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{ background: paper ? 'var(--paper)' : 'var(--ink)' }}
    >
      <SignatureSurface animated className="absolute inset-0" />
      <form
        className="label absolute top-4 left-4 w-72 space-y-3 rounded-sm border border-rule bg-white/90 p-4 text-ink"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="font-medium">/dev/surface</p>
        {controls.map(({ key, min, max }) => (
          <label key={key} className="block">
            <span className="flex justify-between">
              {key}
              <span className="tabular-nums">{values[key].toFixed(2)}</span>
            </span>
            <input
              type="range"
              min={min}
              max={max}
              step={0.01}
              value={values[key]}
              onChange={(e) => update(key, Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </label>
        ))}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={paper} onChange={(e) => setPaper(e.target.checked)} />
          paper background
        </label>
      </form>
    </div>
  );
}
