'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Content } from '@/content/types';
import { localeLabels, localePath, locales, splitLocale } from '@/lib/i18n';
import { Logo } from './Logo';
import { AnchorLink } from './motion/AnchorLink';
import { useLenis } from './motion/SmoothScroll';

// Routes (without locale prefix) whose first section is navy.
const DARK_TOP_ROUTES = ['/', '/about'];

export interface HeaderCopy {
  nav: Content['nav'];
  a11y: Content['a11y'];
  location: string;
}

/**
 * Fixed header. Sections marked `data-header="dark"` (navy) switch the
 * header to its light-on-navy tone while they sit beneath it.
 */
export function Header({ copy: t }: { copy: HeaderCopy }) {
  const pathname = usePathname();
  const { locale, path } = splitLocale(pathname);
  const lp = (href: string) => localePath(locale, href);
  const links = [t.nav.services, t.nav.about];
  const [open, setOpen] = useState(false);
  // Pages that open on a navy section start dark, so the static HTML is right before JS runs.
  const [dark, setDark] = useState(DARK_TOP_ROUTES.includes(path));
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Tone + background follow the section under the header.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = 36; // vertical middle of the header
      const sections = document.querySelectorAll<HTMLElement>('[data-header="dark"]');
      let isDark = false;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          isDark = true;
          break;
        }
      }
      setDark(isDark);
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the menu on navigation (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Menu: lock scroll, focus first link, Escape closes, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    lenis?.stop();
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'Tab') {
        const items = [toggleRef.current, ...focusables()].filter(
          (el): el is HTMLElement => el !== null,
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = previous;
      lenis?.start();
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, lenis]);

  // Over a navy section the header keeps the same navy (dark-tone logo);
  // over paper it is paper. Once scrolled 8 px it gets a solid fill and a hairline.
  const onInk = open || dark;
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  // Same page in the other languages (plain links: each language has its own <html lang>).
  const languages = (
    <ul aria-label={t.a11y.languages} className="label flex items-center gap-3">
      {locales.map((l) => (
        <li key={l}>
          <a
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? 'true' : undefined}
            aria-label={localeLabels[l].name}
            className="py-2 text-fg opacity-60 transition-opacity hover:opacity-100 aria-[current=true]:underline aria-[current=true]:underline-offset-4 aria-[current=true]:opacity-100"
          >
            {localeLabels[l].short}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300 ${
        onInk ? 'on-ink' : ''
      } ${
        open
          ? 'border-transparent bg-ink'
          : scrolled
            ? dark
              ? 'border-line bg-ink'
              : 'border-rule bg-paper'
            : 'border-transparent bg-transparent'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <AnchorLink
          href={lp('/')}

          className="relative z-10 text-[19px] sm:text-[21px]"
        >
          <Logo variant="lockup" tone={onInk ? 'dark' : 'light'} />
        </AnchorLink>

        <nav aria-label={t.a11y.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <AnchorLink
                  href={lp(link.href)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="relative py-2 text-fg transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {link.label}
                </AnchorLink>
              </li>
            ))}
            <li>
              <AnchorLink
                href={lp(t.nav.contact.href)}
                aria-current={isActive(t.nav.contact.href) ? 'page' : undefined}
                className="btn btn-sm text-fg"
              >
                {t.nav.contact.label}
              </AnchorLink>
            </li>
            <li className="border-l border-line pl-6">{languages}</li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!open}
        className="on-ink fixed inset-0 z-0 overflow-y-auto pt-[var(--header-h)] md:hidden"
      >
        <nav aria-label={t.a11y.mainNav} className="wrap flex min-h-full flex-col pt-10 pb-12">
          <ul className="hairlines border-y border-line">
            {[...links, t.nav.contact].map((link, i) => (
              <li key={link.href} className="menu-rise" style={{ animationDelay: `${i * 60}ms` }}>
                <AnchorLink
                  href={lp(link.href)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="flex items-baseline gap-5 py-5 font-display text-[2.5rem] leading-[1.15] text-white"
                  onClick={() => setOpen(false)}
                >
                  <span className="label text-sky">0{i + 1}</span>
                  {link.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-6 pt-10">
            <p className="label text-sky">{t.location}</p>
            {languages}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
