import { Panel, Button } from '@components/shared';

const ACTIONS = ['New Note', 'New Investigation', 'Export Report', 'Refresh'];

export function QuickActions() {
  return (
    <Panel title="Quick Actions">
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <Button key={a} variant="ghost">
            {a}
          </Button>
        ))}
      </div>
    </Panel>
  );
}
