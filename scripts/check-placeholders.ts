/**
 * prebuild: fails the production build while config/site.ts still contains
 * a {{PLACEHOLDER}}. npm runs it automatically before `npm run build`.
 * (`npm run build:preview` calls `next build` directly and skips it.)
 *
 * Runs with Node's built-in TypeScript type stripping (Node ≥ 22.18).
 */
import { site } from '../config/site.ts';

function collect(value: unknown, path: string, out: string[]): void {
  if (typeof value === 'string') {
    if (value.includes('{{')) out.push(`${path} = ${value}`);
  } else if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      collect(child, path ? `${path}.${key}` : key, out);
    }
  }
}

const found: string[] = [];
collect(site, '', found);

if (found.length > 0) {
  console.error(
    [
      '',
      '✖ config/site.ts still contains placeholders:',
      ...found.map((line) => `    ${line}`),
      '',
      '  Replace them before a production build,',
      '  or run `npm run build:preview` for a staging build.',
      '',
    ].join('\n'),
  );
  process.exit(1);
}

if (!site.formspreeId) {
  console.warn('⚠ NEXT_PUBLIC_FORMSPREE_ID is not set: the contact form will not send.');
}

console.log('✓ config/site.ts: no placeholders.');
