import Link from 'next/link';
import { Fragment } from 'react';
import { localePath, type Locale } from '@/lib/i18n';

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders copy that may contain `[label](href)` links. Internal paths are
 * localized; external URLs open in a new tab with an announced hint.
 */
export function RichText({
  text,
  locale,
  externalHint,
}: {
  text: string;
  locale: Locale;
  externalHint: string;
}) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, label = '', href = ''] = m;
    const at = m.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    parts.push(
      href.startsWith('/') ? (
        <Link key={at} href={localePath(locale, href)} className="link">
          {label}
        </Link>
      ) : (
        <a key={at} href={href} target="_blank" rel="noopener noreferrer" className="link">
          {label}
          <span className="sr-only"> {externalHint}</span>
        </a>
      ),
    );
    last = at + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
