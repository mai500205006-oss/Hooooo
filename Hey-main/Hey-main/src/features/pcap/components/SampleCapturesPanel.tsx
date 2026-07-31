import { Card, Badge } from '@components/shared';
import { SAMPLE_CAPTURES } from '../types';
import type { SampleCapture } from '../types';

export function SampleCapturesPanel({ onSelect }: { onSelect: (sample: SampleCapture) => void }) {
  return (
    <div>
      <div className="text-xs text-rk-muted mb-2">Or try a sample capture</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {SAMPLE_CAPTURES.map((sample) => (
          <Card
            key={sample.id}
            onClick={() => onSelect(sample)}
            className="cursor-pointer text-center py-4 hover:border-rk-accent transition-colors"
          >
            <Badge tone="muted">{sample.label}</Badge>
            <p className="text-xs text-rk-muted mt-2">{sample.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
