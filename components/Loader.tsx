import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { LogoMark } from './Logo';

/**
 * Scene 0, home intro (about 1.5 s): navy screen, the mark fades in, its blue
 * line draws, the screen slides up. Pure CSS (globals.css): it can never get stuck.
 * Skipped on later page loads in the session (see `LOADER_SCRIPT`) and with
 * reduced motion.
 */
export function Loader({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <div className="loader" aria-hidden="true" title={t.home.loaderLabel}>
      <LogoMark tone="dark" className="loader-mark" lineClassName="loader-line" />
    </div>
  );
}

/**
 * Runs before first paint (inlined in the root layout). The first page load
 * of a session plays the loader; later loads and client navigations skip it.
 */
export const LOADER_SCRIPT = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('ma-intro')){d.dataset.loader='skip';}else{sessionStorage.setItem('ma-intro','1');setTimeout(function(){d.dataset.loader='skip';},2600);}}catch(e){d.dataset.loader='skip';}})();`;

export default Loader;
