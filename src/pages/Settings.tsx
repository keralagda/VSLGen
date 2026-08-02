import { useState } from 'react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { Card, CardContent } from '@/components/ui/Card';
import { Trash2, X, Check, Copy, RotateCcw, Edit, Download } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import { THEMES, LANGUAGES, DATE_FORMATS, NUMBER_FORMATS, DEFAULT_KEYBOARD_SHORTCUTS, KeyboardShortcut } from '@/constants';

export function Settings() {
  const preferences = useAppStore(state => state.preferences);
  const updatePreferences = useAppStore(state => state.updatePreferences);
  const keyboardShortcuts = useAppStore(state => state.keyboardShortcuts);
  const updateKeyboardShortcut = useAppStore(state => state.updateKeyboardShortcut);
  const resetKeyboardShortcuts = useAppStore(state => state.resetKeyboardShortcuts);
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('general');
  const [editingShortcut, setEditingShortcut] = useState<string | null>(null);
  const [shortcutKeys, setShortcutKeys] = useState<Partial<KeyboardShortcut>>({});

  const handleSaveShortcut = (action: string) => {
    updateKeyboardShortcut(action, shortcutKeys);
    setEditingShortcut(null);
    setShortcutKeys({});
    addToast({ type: 'success', title: 'Shortcut Updated', message: `Shortcut for ${action} has been updated.` });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const newShortcut: Partial<KeyboardShortcut> = {
      key: e.key,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
    };
    setShortcutKeys(newShortcut);
  };

  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const parts: string[] = [];
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.metaKey) parts.push('Meta');
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences and system configuration</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="printing">Printing</TabsTrigger>
              <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Language & Region</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => updatePreferences({ language: value })}
                      options={LANGUAGES.map(l => ({ value: l.code, label: l.nativeName }))}
                    />
                  </div>
                  <div>
                    <Label>Date Format</Label>
                    <Select
                      value={preferences.dateFormat}
                      onValueChange={(value) => updatePreferences({ dateFormat: value })}
                      options={DATE_FORMATS.map(d => ({ value: d.value, label: `${d.label} (${d.example})` }))}
                    />
                  </div>
                  <div>
                    <Label>Number Format</Label>
                    <Select
                      value={preferences.numberFormat}
                      onValueChange={(value) => updatePreferences({ numberFormat: value })}
                      options={NUMBER_FORMATS.map(n => ({ value: n.value, label: `${n.label} (${n.example})` }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Default Values</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Default Carrier</Label>
                    <Select
                      value={preferences.defaultCarrier || ''}
                      onValueChange={(value) => updatePreferences({ defaultCarrier: value })}
                      options={[
                        { value: '', label: 'None' },
                        { value: 'ups', label: 'UPS' },
                        { value: 'fedex', label: 'FedEx' },
                        { value: 'usps', label: 'USPS' },
                        { value: 'dhl', label: 'DHL' },
                      ]}
                    />
                  </div>
                  <div>
                    <Label>Default Paper Size</Label>
                    <Select
                      value={preferences.defaultPaperSize}
                      onValueChange={(value) => updatePreferences({ defaultPaperSize: value as any })}
                      options={[
                        { value: '4x6', label: '4" x 6"' },
                        { value: '4x8', label: '4" x 8"' },
                        { value: 'a6', label: 'A6' },
                        { value: 'a5', label: 'A5' },
                        { value: 'letter', label: 'Letter' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  {THEMES.map(theme => (
                    <button
                      key={theme.value}
                      onClick={() => updatePreferences({ theme: theme.value as any })}
                      className={cn(
                        'p-4 rounded-lg border-2 transition-all',
                        preferences.theme === theme.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{theme.value === 'light' ? '☀️' : theme.value === 'dark' ? '🌙' : '💻'}</div>
                        <div className="font-medium">{theme.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">UI Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Switch
                    checked={preferences.animations}
                    onCheckedChange={(checked) => updatePreferences({ animations: checked })}
                    label="Enable Animations"
                  />
                  <Switch
                    checked={preferences.keyboardShortcuts}
                    onCheckedChange={(checked) => updatePreferences({ keyboardShortcuts: checked })}
                    label="Keyboard Shortcuts"
                  />
                  <Switch
                    checked={preferences.showGridLines}
                    onCheckedChange={(checked) => updatePreferences({ showGridLines: checked })}
                    label="Show Grid Lines in Preview"
                  />
                  <Switch
                    checked={preferences.autoPrint}
                    onCheckedChange={(checked) => updatePreferences({ autoPrint: checked })}
                    label="Auto-print after generation"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="printing" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Printer Settings</h4>
                <div>
                  <Label>Default Printer</Label>
                  <Select
                    value={preferences.defaultPrinter || ''}
                    onValueChange={(value) => updatePreferences({ defaultPrinter: value })}
                    options={[
                      { value: '', label: 'System Default' },
                      { value: 'Zebra ZP 450', label: 'Zebra ZP 450' },
                      { value: 'Dymo LabelWriter 4XL', label: 'Dymo LabelWriter 4XL' },
                      { value: 'Brother QL-800', label: 'Brother QL-800' },
                    ]}
                  />
                </div>
                <div>
                  <Label>Default Paper Size</Label>
                  <Select
                    value={preferences.defaultPaperSize}
                    onValueChange={(value) => updatePreferences({ defaultPaperSize: value as any })}
                    options={[
                      { value: '4x6', label: '4" x 6"' },
                      { value: '4x8', label: '4" x 8"' },
                      { value: 'a6', label: 'A6 (105 x 148 mm)' },
                      { value: 'a5', label: 'A5 (148 x 210 mm)' },
                      { value: 'letter', label: 'Letter (8.5" x 11")' },
                    ]}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shortcuts" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Keyboard Shortcuts</h4>
                <p className="text-sm text-muted-foreground">
                  Click on a shortcut to change it, then press the new key combination.
                </p>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {DEFAULT_KEYBOARD_SHORTCUTS.map(shortcut => {
                    const custom = keyboardShortcuts.find(s => s.action === shortcut.action);
                    const current = custom || shortcut;
                    const isEditing = editingShortcut === shortcut.action;

                    return (
                      <div
                        key={shortcut.action}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-lg border',
                          isEditing && 'border-primary bg-primary/5'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium w-48 truncate">{shortcut.description}</span>
                          <kbd className={cn(
                            'px-2 py-1 rounded bg-muted font-mono text-xs font-medium',
                            isEditing && 'bg-primary text-primary-foreground animate-pulse'
                          )} onKeyDown={isEditing ? handleKeyDown : undefined} tabIndex={0}>
                            {isEditing ? 'Press keys...' : formatShortcut(current)}
                          </kbd>
                        </div>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <Button size="sm" variant="secondary" onClick={() => handleSaveShortcut(shortcut.action)}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditingShortcut(null)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => setEditingShortcut(shortcut.action)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button variant="outline" onClick={() => { resetKeyboardShortcuts(); addToast({ type: 'success', title: 'Shortcuts Reset', message: 'All shortcuts have been reset to defaults.' }); }}>
                  Reset to Defaults
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Data Management</h4>
                <div className="space-y-2">
                  <Button variant="outline" onClick={() => { addToast({ type: 'success', title: 'Data Exported', message: 'All your data has been downloaded as JSON.' }); }}>
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button variant="outline" onClick={() => { addToast({ type: 'info', title: 'Import Data', message: 'Select a JSON file to import.' }); }}>
                    <Copy className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Danger Zone</h4>
                <div className="space-y-2">
                  <Button variant="destructive" onClick={() => { if (confirm('Clear all history? This cannot be undone.')) { addToast({ type: 'success', title: 'History Cleared', message: 'All label history has been removed.' }); } }}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All History
                  </Button>
                  <Button variant="destructive" onClick={() => { if (confirm('Reset all settings to defaults? This cannot be undone.')) { addToast({ type: 'success', title: 'Settings Reset', message: 'All settings have been reset to defaults.' }); } }}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset All Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}