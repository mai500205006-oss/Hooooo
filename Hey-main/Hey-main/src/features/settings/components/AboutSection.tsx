import { Panel, Badge } from '@components/shared';
import { config } from '@config';

export function AboutSection() {
  return (
    <Panel title="About">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-rk-text font-mono">{config.appName}</span>
          <Badge tone="muted">v{config.appVersion}</Badge>
          <Badge tone={config.env.isDev ? 'warning' : 'success'}>{config.env.mode}</Badge>
        </div>
        <p className="text-rk-muted text-xs">
          مساحة عمل شخصية (Personal Intelligence Workspace) — أداة شخصية بدون Backend ولا AI حاليًا، كل حاجة شغالة
          محليًا في المتصفح.
        </p>
      </div>
    </Panel>
  );
}
