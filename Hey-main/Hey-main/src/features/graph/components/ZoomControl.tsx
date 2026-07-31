import type { ZoomLevel } from '../types';

const LEVELS: ZoomLevel[] = [50, 75, 100, 125, 150];

export function ZoomControl({
  zoom,
  onChange,
}: {
  zoom: ZoomLevel;
  onChange: (z: ZoomLevel) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-rk-muted">
      <span>Zoom</span>
      <select
        value={zoom}
        onChange={(e) => onChange(Number(e.target.value) as ZoomLevel)}
        className="bg-rk-bg border border-rk-border rounded-md px-2 py-1 text-rk-text"
      >
        {LEVELS.map((z) => (
          <option key={z} value={z}>
            {z}%
          </option>
        ))}
      </select>
    </div>
  );
}
