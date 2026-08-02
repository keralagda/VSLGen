import { HistoryTable } from '@/components/history/HistoryTable';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Trash2, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from '@tanstack/react-router';

export function History() {
  const history = useAppStore(state => state.history);
  const clearHistory = useAppStore(state => state.clearHistory);
  const setCurrentLabel = useAppStore(state => state.setCurrentLabel);
  const voidLabel = useAppStore(state => state.voidLabel);
  const printLabel = useAppStore(state => state.printLabel);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const printCount = history.filter(h => h.status === 'printed').length;
  const voidCount = history.filter(h => h.status === 'voided').length;
  const draftCount = history.filter(h => h.status === 'draft').length;

  const handleExportAll = () => {
    addToast({ type: 'success', title: 'Exporting History', message: 'Downloading all labels as CSV...' });
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      clearHistory();
      addToast({ type: 'success', title: 'History Cleared', message: 'All label history has been removed.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="text-muted-foreground">View and manage your shipping label history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportAll}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline" onClick={handleClearHistory}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Labels</p>
                <p className="text-3xl font-bold">{history.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Printed</p>
                <p className="text-3xl font-bold text-success">{printCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <RotateCcw className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Voided</p>
                <p className="text-3xl font-bold text-error">{voidCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-error/10">
                <RotateCcw className="h-6 w-6 text-error" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-3xl font-bold text-warning">{draftCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <RotateCcw className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <HistoryTable
        onView={(label) => {
          setCurrentLabel(label);
          navigate({ to: '/generate' });
          addToast({ type: 'info', title: 'Viewing Label', message: `Displaying details for label ${label.trackingNumber || label.id}` });
        }}
        onPrint={(label) => {
          printLabel(label.id);
          addToast({ type: 'success', title: 'Printing', message: `Sending label ${label.trackingNumber || label.id} to printer...` });
        }}
        onExport={(label, format) => {
          addToast({ type: 'success', title: 'Exporting', message: `Exporting label ${label.trackingNumber || label.id} as ${format.toUpperCase()}...` });
        }}
        onVoid={(label, reason) => {
          voidLabel(label.id, reason);
          addToast({ type: 'warning', title: 'Label Voided', message: `Label ${label.trackingNumber || label.id} has been voided.` });
        }}
        onDuplicate={(label) => {
          const { id: _id, trackingNumber: _trackingNumber, createdAt: _createdAt, updatedAt: _updatedAt, status: _status, printedAt: _printedAt, voidedAt: _voidedAt, voidReason: _voidReason, ...duplicated } = label;
          setCurrentLabel({
            ...duplicated,
            status: 'draft',
          });
          navigate({ to: '/generate' });
          addToast({ type: 'info', title: 'Label Duplicated', message: 'Ready to generate new label from duplicate.' });
        }}
      />
    </div>
  );
}