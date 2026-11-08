import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Navy duotone image (server component).
 *
 * Any photo is mapped to the brand ramp, `--ink` in the shadows to `--sky`
 * in the highlights, by the `#duotone-ink` SVG filter (feColorMatrix) that
 * <DuotoneFilter /> defines once in the root layout.
 *
 * Until the file exists in /public, a solid `--ink` block of the same aspect
 * ratio is rendered instead (checked at build time; the site is static).
 *
 * The static export cannot resize images, so a phone-sized copy can sit next
 * to the original: `paris-960.webp` (or `.jpg`) beside `paris.jpg`. When it exists, the
 * browser picks between the two through srcset.
 */
const SMALL_WIDTH = 960;

function publicFile(src: string): boolean {
  return existsSync(path.join(process.cwd(), 'public', src));
}

function smallVariant(src: string): string | null {
  const base = src.replace(/\.[a-z0-9]+$/i, `-${SMALL_WIDTH}`);
  if (base === src) return null;
  return ['.webp', '.jpg'].map((ext) => base + ext).find(publicFile) ?? null;
}
interface DuotoneImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  /** Cover the parent (parent must be positioned) instead of keeping the ratio. */
  fill?: boolean;
  className?: string;
  sizes?: string;
}

export function DuotoneImage({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  className = '',
  sizes = '100vw',
}: DuotoneImageProps) {
  const exists = publicFile(src);
  const frame = fill ? 'absolute inset-0' : 'relative w-full';
  const ratio = fill ? undefined : { aspectRatio: `${width} / ${height}` };

  if (!exists) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${frame} bg-ink ${className}`}
        style={ratio}
        data-placeholder={src}
      />
    );
  }

  const small = smallVariant(src);
  return (
    <div className={`${frame} overflow-hidden bg-ink ${className}`} style={ratio}>
      {/* A plain <img>: next/image cannot take a custom srcset in a static export. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={small ? `${small} ${SMALL_WIDTH}w, ${src} ${width}w` : undefined}
        sizes={small ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ filter: 'url(#duotone-ink)' }}
      />
    </div>
  );
}

/** The SVG filter used by every DuotoneImage. Render once, in the root layout. */
export function DuotoneFilter() {
  // Luminance → ramp from --ink #0B2545 (shadows) to --sky #8DB0EC (highlights).
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <filter id="duotone-ink" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0      0      0      1 0"
        />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.043 0.553" />
          <feFuncG type="table" tableValues="0.145 0.690" />
          <feFuncB type="table" tableValues="0.271 0.925" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

export default DuotoneImage;
