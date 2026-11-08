import type { CSSProperties } from 'react';
import { MA_PATH } from './brand/ma-path';

type Tone = 'light' | 'dark';

interface MarkProps {
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
  /** Animate the blue line (used by the loader). */
  lineClassName?: string;
  title?: string;
}

const palette: Record<Tone, { square: string; letters: string; line: string }> = {
  // On paper: navy square, white letters, royal-blue line.
  light: { square: '#0B2545', letters: '#FFFFFF', line: '#1F4FA3' },
  // On navy: white square, navy letters, sky-blue line.
  dark: { square: '#FFFFFF', letters: '#0B2545', line: '#8DB0EC' },
};

export function LogoMark({ tone = 'light', className, style, lineClassName, title }: MarkProps) {
  const c = palette[tone];
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <rect width="120" height="120" fill={c.square} />
      <path d={MA_PATH} fill={c.letters} />
      <rect x="40" y="86" width="40" height="3" fill={c.line} className={lineClassName} />
    </svg>
  );
}

interface LogoProps {
  variant?: 'mark' | 'lockup';
  tone?: Tone;
  className?: string;
  /** Accessible name; omit when the logo sits inside a labelled link. */
  title?: string;
}

/**
 * Brand logo. The lockup scales with `font-size` on its container:
 * "Martin Avila" is 1em, "TECHNOLOGIES" 0.328em (32 px → 10.5 px).
 */
export function Logo({ variant = 'lockup', tone = 'light', className = '', title }: LogoProps) {
  if (variant === 'mark') {
    return <LogoMark tone={tone} className={className} title={title} />;
  }

  return (
    <span
      className={`inline-flex items-center gap-[0.42em] leading-none ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title}
    >
      <LogoMark tone={tone} className="h-[1.62em] w-[1.62em] shrink-0" />
      <span className="flex flex-col gap-[0.2em]" aria-hidden={title ? true : undefined}>
        <span
          className="font-display whitespace-nowrap"
          style={{ color: tone === 'light' ? 'var(--ink)' : 'var(--white)' }}
        >
          Martin Avila
        </span>{' '}
        <span
          className="font-body font-medium whitespace-nowrap uppercase"
          style={{
            fontSize: '0.328em',
            letterSpacing: '0.36em',
            color: tone === 'light' ? 'var(--accent)' : 'var(--sky)',
          }}
        >
          Technologies
        </span>
      </span>
    </span>
  );
}

export default Logo;
