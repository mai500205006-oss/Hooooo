import { Panel, Badge } from '@components/shared';
import type { ThreatActor } from '../types';

export function ThreatActorPanel({ actor }: { actor: ThreatActor }) {
  return (
    <Panel title="Threat Actor">
      <div className="text-sm text-rk-text">{actor.name}</div>
      {actor.aliases.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {actor.aliases.map((alias) => (
            <Badge key={alias} tone="muted">
              {alias}
            </Badge>
          ))}
        </div>
      )}
      <p className="text-xs text-rk-muted mt-2">{actor.description}</p>
    </Panel>
  );
}
