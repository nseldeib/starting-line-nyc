// Placeholder brand mark: design 04 "Deadline day" — a calendar with an ink
// header, binder rings, a grey day grid and one blue deadline day.
// The logo is due to be revisited, so it lives only here (and in app/icon.svg).
export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M5 18 V12 a4 4 0 0 1 4 -4 H39 a4 4 0 0 1 4 4 V18 Z" fill="var(--ink)" />
      <rect x="6.5" y="9.5" width="35" height="32" rx="2.5" fill="none" stroke="var(--ink)" strokeWidth="3" />
      <rect x="14" y="4" width="3.5" height="9" rx="1.5" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" />
      <rect x="30.5" y="4" width="3.5" height="9" rx="1.5" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" />
      <g fill="var(--ink)" opacity=".28">
        <rect x="11" y="22" width="6" height="6" />
        <rect x="21" y="22" width="6" height="6" />
        <rect x="31" y="22" width="6" height="6" />
        <rect x="11" y="31" width="6" height="6" />
        <rect x="21" y="31" width="6" height="6" />
      </g>
      <rect x="31" y="31" width="6" height="6" fill="var(--route)" />
    </svg>
  );
}
