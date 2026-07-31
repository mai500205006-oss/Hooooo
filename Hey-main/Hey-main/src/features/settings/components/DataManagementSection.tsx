import { useRef, useState, type ChangeEvent } from 'react';
import { Panel, Button, Badge } from '@components/shared';
import { useLocalData } from '../useLocalData';

export function DataManagementSection() {
  const { keyCount, state, errorMessage, exportData, importData, clearData } = useLocalData();
  const [confirmingClear, setConfirmingClear] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importData(file);
    e.target.value = '';
  };

  const handleClearClick = () => {
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }
    setConfirmingClear(false);
    clearData();
  };

  return (
    <Panel title="Data Management">
      <div className="space-y-3">
        <p className="text-xs text-rk-muted">
          كل بياناتك متخزنة محليًا في المتصفح بتاعك بس (Local Storage) — مفيش سيرفر ومفيش حد شايفها غيرك.
        </p>

        <div className="flex items-center gap-2">
          <Badge tone="muted">{keyCount} local {keyCount === 1 ? 'entry' : 'entries'}</Badge>
          {state === 'exported' && <Badge tone="success">Exported</Badge>}
          {state === 'cleared' && <Badge tone="success">Cleared</Badge>}
          {state === 'error' && <Badge tone="danger">{errorMessage}</Badge>}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={exportData}>
            ⬇ Export All Data
          </Button>
          <Button variant="ghost" onClick={handleImportClick}>
            ⬆ Import Backup
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleFileSelected}
          />
          <Button
            variant="danger"
            onClick={handleClearClick}
            onBlur={() => setConfirmingClear(false)}
          >
            {confirmingClear ? 'Click again to confirm' : 'Clear All Local Data'}
          </Button>
        </div>
      </div>
    </Panel>
  );
}
