'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  Color,
  DoubleSide,
  PlaneGeometry,
  ShaderMaterial,
  setConsoleFunction,
  Vector3,
  type Group,
} from 'three';
import { CONTOUR_DENSITY, SURFACE_GLSL, SURFACE_SEGMENTS, SURFACE_SIZE } from '@/lib/surface';
import { surfaceState } from './surfaceState';

/*
 * @react-three/fiber 9.x still creates a THREE.Clock internally, which
 * three ≥ 0.186 reports as deprecated. We never use that clock (time comes
 * from performance.now below), so drop exactly that message and forward
 * everything else unchanged.
 */
setConsoleFunction((type: string, message: string, ...params: unknown[]) => {
  if (
    typeof message === 'string' &&
    message.startsWith('THREE.Clock: This module has been deprecated')
  ) {
    return;
  }
  const method = type === 'error' ? console.error : type === 'warn' ? console.warn : console.log;
  method(message, ...params);
});

const MAX_TILT = (3 * Math.PI) / 180;
const VIEW_34 = new Vector3(7, 5.5, 7);
const VIEW_TOP = new Vector3(0, 12, 0.001);
const ORIGIN = new Vector3(0, 0, 0);
const STILL_TIME = 7.5;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec2 vUv;
  varying vec2 vPos;
  varying float vRaw;
  varying float vHeight;
  ${SURFACE_GLSL}
  void main() {
    vec3 p = position;
    float raw = surfaceHeight(p.xz, uTime);
    p.y = raw * uAmp;
    vUv = uv;
    vPos = p.xz;
    vRaw = raw;
    vHeight = p.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uSky;
  uniform vec3 uRule;
  uniform float uOpacity;
  uniform float uContour;
  uniform float uTint;
  varying vec2 vUv;
  varying vec2 vPos;
  varying float vRaw;
  varying float vHeight;

  // Anti-aliased line mask: 1 on the line, 0 elsewhere, ~width pixels wide.
  float lineMask(vec2 coord, float width) {
    vec2 d = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - min(min(d.x, d.y) / width, 1.0);
  }
  float isoMask(float value, float width) {
    float d = abs(fract(value - 0.5) - 0.5) / fwidth(value);
    return 1.0 - min(d / width, 1.0);
  }

  void main() {
    // Grid: one line every 1/40 of the plane, every 5th line brighter.
    float minor = lineMask(vUv * 40.0, 0.9);
    float major = lineMask(vUv * 8.0, 1.1);
    float grid = max(minor * 0.55, major);

    // Iso-height contours of the un-amplified function, so the number of
    // contour lines stays constant while the surface flattens.
    float contour = isoMask(vRaw * ${CONTOUR_DENSITY.toFixed(1)}, 1.0);

    float line = mix(grid, contour, uContour);

    // Strong radial fade: the mesh dissolves into the background.
    float r = length(vPos) / ${(SURFACE_SIZE / 2).toFixed(1)};
    float fade = 1.0 - smoothstep(0.38, 0.96, r);

    // Sky on navy, lighter towards white on the crests; rule colour on paper.
    float crest = clamp(vHeight * 0.55, 0.0, 0.65);
    vec3 color = mix(mix(uSky, vec3(1.0), crest), uRule, uTint);

    float alpha = line * fade * uOpacity * 0.7;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(color * alpha, alpha); // premultiplied
  }
`;

function createGeometry(): PlaneGeometry {
  const geometry = new PlaneGeometry(
    SURFACE_SIZE,
    SURFACE_SIZE,
    SURFACE_SEGMENTS,
    SURFACE_SEGMENTS,
  );
  geometry.rotateX(-Math.PI / 2); // lie flat: positions in the x–z plane, uv kept
  return geometry;
}

function createMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
    side: DoubleSide,
    uniforms: {
      uTime: { value: STILL_TIME },
      uAmp: { value: 1 },
      uOpacity: { value: 1 },
      uContour: { value: 0 },
      uTint: { value: 0 },
      uSky: { value: new Color('#8DB0EC') },
      uRule: { value: new Color('#D5DCE8') },
    },
  });
}

function Surface({ animated }: { animated: boolean }) {
  const group = useRef<Group>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const geometry = useMemo(() => createGeometry(), []);
  const material = useMemo(() => createMaterial(), []);
  const tilt = useRef({ x: 0, z: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const start = useRef(0);
  const camTarget = useMemo(() => new Vector3(), []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  // Pointer tilt (desktop only), normalised to [-1, 1].
  useEffect(() => {
    if (!animated) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [animated]);

  useFrame(({ camera }) => {
    const u = materialRef.current?.uniforms;
    if (!u?.uTime || !u.uAmp || !u.uOpacity || !u.uContour || !u.uTint) return;

    if (animated) {
      if (start.current === 0) start.current = performance.now() - STILL_TIME * 1000;
      u.uTime.value = (performance.now() - start.current) / 1000;
    } else {
      u.uTime.value = STILL_TIME;
    }
    u.uAmp.value = surfaceState.amp;
    u.uOpacity.value = surfaceState.opacity;
    u.uContour.value = surfaceState.contour;
    u.uTint.value = surfaceState.tint;

    camTarget.copy(VIEW_34).lerp(VIEW_TOP, surfaceState.cameraProgress);
    camera.position.copy(camTarget);
    camera.lookAt(ORIGIN);

    const g = group.current;
    if (g && animated) {
      tilt.current.x += (pointer.current.y * MAX_TILT - tilt.current.x) * 0.05;
      tilt.current.z += (-pointer.current.x * MAX_TILT - tilt.current.z) * 0.05;
      g.rotation.x = tilt.current.x;
      g.rotation.z = tilt.current.z;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} frustumCulled={false}>
        <primitive object={material} ref={materialRef} attach="material" />
      </mesh>
    </group>
  );
}

export interface SignatureSurfaceProps {
  /** false: render one still frame (mobile, reduced motion), no tilt. */
  animated: boolean;
  /** Rendering stops while the canvas is off-screen. */
  visible?: boolean;
  onReady?: () => void;
  className?: string;
}

/** The hero's wireframe landscape. Load with next/dynamic and ssr: false. */
export default function SignatureSurface({
  animated,
  visible = true,
  onReady,
  className,
}: SignatureSurfaceProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={animated ? (visible ? 'always' : 'never') : 'demand'}
        camera={{ fov: 35, near: 0.1, far: 60, position: VIEW_34.toArray() }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        onCreated={() => onReady?.()}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Surface animated={animated} />
      </Canvas>
    </div>
  );
}
