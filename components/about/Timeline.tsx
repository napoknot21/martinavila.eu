import type { TimelineEntry } from '@/content/types';
import { fractionOf, monthIndex } from '@/lib/time';

interface TimelineProps {
  label: string;
  from: string;
  to: string;
  entries: TimelineEntry[];
}

const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

/**
 * Horizontal 2020 → 2027 axis with two honest lanes (overlaps shown as
 * overlaps), bars placed from ISO months. Used inside the pinned journey;
 * its travelling dot reads the CSS variable --tl set by the timeline.
 * Decorative copy of the accessible list below (TimelineList).
 */
export function TimelineAxis({ from, to, entries }: TimelineProps) {
  const startYear = Number(from.slice(0, 4));
  const endYear = Number(to.slice(0, 4));
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="timeline-h" aria-hidden="true">
      {entries.map((e) => {
        const left = fractionOf(e.start, from, to);
        const width = Math.max(
          (monthIndex(e.end) - monthIndex(e.start)) / (monthIndex(to) - monthIndex(from)),
          0.004,
        );
        return (
          <div
            key={e.label}
            data-ch={e.chapter}
            className="tl-item"
            style={{ left: pct(left), width: pct(width), top: e.lane === 1 ? 0 : 28 }}
          >
            <span className="tl-label">{e.short ?? e.label}</span>
            <span className="tl-bar" />
          </div>
        );
      })}
      <div className="tl-axis" />
      {years.map((y) => (
        <span key={y} className="tl-tick" style={{ left: pct(fractionOf(`${y}-01`, from, to)) }}>
          {y}
        </span>
      ))}
      <span className="tl-dot" />
    </div>
  );
}

/** The same six entries as a plain list: the mobile / reduced-motion timeline. */
export function TimelineList({ label, entries }: TimelineProps) {
  const sorted = [...entries].sort((a, b) => monthIndex(a.start) - monthIndex(b.start));
  return (
    <div className="timeline-v">
      <h2 className="label text-sky">{label}</h2>
      <ol className="hairlines mt-6 border-y border-line">
        {sorted.map((e) => (
          <li key={e.label} className="flex items-baseline justify-between gap-6 py-4">
            <span className="text-white">{e.label}</span>
            <span className="label shrink-0 text-sky">{e.years}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
