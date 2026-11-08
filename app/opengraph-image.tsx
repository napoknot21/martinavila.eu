import { ImageResponse } from 'next/og';
import { MA_PATH } from '@/components/brand/ma-path';
import { getContent } from '@/content';

const t = getContent('en');

export const dynamic = 'force-static';
export const alt = 'Martin Avila Technologies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Open Graph / Twitter card: the logo on navy. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0B2545',
        padding: '72px 80px',
        color: '#FFFFFF',
      }}
    >
      <svg width="132" height="132" viewBox="0 0 120 120">
        <rect width="120" height="120" fill="#FFFFFF" />
        <path d={MA_PATH} fill="#0B2545" />
        <rect x="40" y="86" width="40" height="3" fill="#8DB0EC" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 64, letterSpacing: -1, lineHeight: 1.1 }}>{t.meta.siteName}</div>
        <div style={{ marginTop: 20, fontSize: 30, color: '#8DB0EC' }}>{t.meta.tagline}</div>
      </div>
      <div style={{ display: 'flex', height: 3, width: 160, background: '#1F4FA3' }} />
    </div>,
    size,
  );
}
