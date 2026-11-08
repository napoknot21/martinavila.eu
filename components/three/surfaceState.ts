/**
 * Mutable state of the signature surface. GSAP (and the /dev/surface
 * sliders) write to it; the render loop reads it every frame. No React
 * re-renders are involved.
 */
export interface SurfaceState {
  /** Height multiplier: 1 = full relief, 0.15 = nearly flat. */
  amp: number;
  /** Overall line opacity multiplier (0–1). */
  opacity: number;
  /** 0 = UV grid, 1 = iso-height contour lines. */
  contour: number;
  /** 0 = three-quarter view [7, 5.5, 7], 1 = top-down view [0, 12, 0.001]. */
  cameraProgress: number;
  /** 0 = sky lines for navy, 1 = rule-coloured lines (#D5DCE8) for paper. */
  tint: number;
}

export const SURFACE_DEFAULTS: Readonly<SurfaceState> = {
  amp: 1,
  opacity: 1,
  contour: 0,
  cameraProgress: 0,
  tint: 0,
};

export const surfaceState: SurfaceState = { ...SURFACE_DEFAULTS };

export function resetSurfaceState(): void {
  Object.assign(surfaceState, SURFACE_DEFAULTS);
}
