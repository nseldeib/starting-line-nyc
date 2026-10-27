'use client';

// The choices behind a Save button: Interested, Considering, Signed up, and
// Remove once saved — or, when the browser blocks storage, a note saying so.
import { SAVE_STATUSES, SAVE_STATUS_LABELS, type SaveStatus } from '@/app/lib/savedRaces';

export default function SaveMenu({
  id,
  raceName,
  status,
  unavailable,
  onChoose = () => {},
}: {
  id?: string;
  raceName: string;
  status: SaveStatus | null;
  unavailable: boolean;
  // Optional so the menu can be rendered on its own, without a button.
  onChoose?: (status: SaveStatus | null) => void;
}) {
  return (
    <div className="save-menu" id={id} role="menu" aria-label={`Save ${raceName}`}>
      {unavailable ? (
        <p className="save-note">This browser isn’t letting us save (private browsing can block it).</p>
      ) : (
        <>
          {SAVE_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              role="menuitemradio"
              aria-checked={status === s}
              className={status === s ? 'is-current' : undefined}
              onClick={() => onChoose(s)}
            >
              {SAVE_STATUS_LABELS[s]}
            </button>
          ))}
          {status && (
            <button type="button" role="menuitem" className="save-remove" onClick={() => onChoose(null)}>
              Remove
            </button>
          )}
          <p className="save-note">Saved on this device only. Accounts aren’t live yet.</p>
        </>
      )}
    </div>
  );
}
