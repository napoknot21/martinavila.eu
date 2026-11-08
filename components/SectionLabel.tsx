/** Section label in mono, e.g. "§ 01 — THE FIRM", like a research note. */
export function SectionLabel({
  number,
  label,
  className = '',
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`label text-fg-muted ${className}`}>
      <span className="text-fg">{number}</span> — {label}
    </p>
  );
}

export default SectionLabel;
