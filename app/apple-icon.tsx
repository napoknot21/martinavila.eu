import { ImageResponse } from 'next/og';
import { MA_PATH } from '@/components/brand/ma-path';

export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon, generated from the logo mark (letters as outlines). */
export default function AppleIcon() {
  return new ImageResponse(
    <svg width="180" height="180" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" fill="#0B2545" />
      <path d={MA_PATH} fill="#FFFFFF" />
      <rect x="40" y="86" width="40" height="3" fill="#1F4FA3" />
    </svg>,
    size,
  );
}
