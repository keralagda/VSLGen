'use client';

import { useState } from 'react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { Label } from '@/components/ui/Label';
import { Printer, Download, Settings, Minus, Plus } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';

interface PrintSettings {
  printerName?: string;
  paperSize: string;
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  copies: number;
  quality: 'draft' | 'normal' | 'high';
  scaling: 'fit' | 'actual' | 'custom';
  customScale?: number;
}

interface ExportSettings {
  format: 'pdf' | 'png' | 'svg';
  quality: number;
  includeBackground: boolean;
  filename: string;
}

interface PrintToolbarProps {
  onPrint: (settings: PrintSettings) => void;
  onExport: (settings: ExportSettings) => void;
  availablePrinters?: string[];
  defaultPrinter?: string;
  defaultPaperSize?: string;
  className?: string;
}

export function PrintToolbar({
  onPrint,
  onExport,
  availablePrinters = ['Default Printer', 'Zebra ZP 450', 'Dymo LabelWriter 4XL', 'Brother QL-800'],
  defaultPrinter = 'Default Printer',
  defaultPaperSize = '4x6',
  className,
}: PrintToolbarProps) {
  const [printSettings, setPrintSettings] = useState<PrintSettings>({
    printerName: defaultPrinter,
    paperSize: defaultPaperSize,
    orientation: 'portrait',
    margins: { top: 0, right: 0, bottom: 0, left: 0 },
    copies: 1,
    quality: 'normal',
    scaling: 'fit',
  });

  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'pdf',
    quality: 2,
    includeBackground: true,
    filename: 'shipping-label',
  });

  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handlePrint = () => {
    onPrint(printSettings);
    setShowPrintDialog(false);
  };

  const handleExport = () => {
    onExport(exportSettings);
    setShowExportDialog(false);
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-3 p-4 bg-card border rounded-lg shadow-sm', className)}>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowPrintDialog(true)}
          className="gap-2"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={() => setShowExportDialog(true)}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export as PDF, PNG, or SVG</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-8 mx-2" />

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Select
              value={printSettings.paperSize}
              onValueChange={(value) => setPrintSettings(p => ({ ...p, paperSize: value }))}
              options={[
                { value: '4x6', label: '4" x 6"' },
                { value: '4x8', label: '4" x 8"' },
                { value: 'a6', label: 'A6 (105 x 148 mm)' },
                { value: 'a5', label: 'A5 (148 x 210 mm)' },
                { value: 'letter', label: 'Letter (8.5" x 11")' },
              ]}
              className="w-36"
            />
          </TooltipTrigger>
          <TooltipContent>Label Size</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Select
              value={printSettings.orientation}
              onValueChange={(value) => setPrintSettings(p => ({ ...p, orientation: value as 'portrait' | 'landscape' }))}
              options={[
                { value: 'portrait', label: 'Portrait' },
                { value: 'landscape', label: 'Landscape' },
              ]}
              className="w-32"
            />
          </TooltipTrigger>
          <TooltipContent>Orientation</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Select
              value={printSettings.copies}
              onValueChange={(value) => setPrintSettings(p => ({ ...p, copies: Number(value) }))}
              options={[
                { value: '1', label: '1 Copy' },
                { value: '2', label: '2 Copies' },
                { value: '3', label: '3 Copies' },
                { value: '4', label: '4 Copies' },
                { value: '5', label: '5 Copies' },
              ]}
              className="w-28"
            />
          </TooltipTrigger>
          <TooltipContent>Number of Copies</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="h-8 mx-2" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setShowPrintDialog(true)}>
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Print Settings</TooltipContent>
      </Tooltip>

      <PrintSettingsDialog
        open={showPrintDialog}
        onClose={() => setShowPrintDialog(false)}
        settings={printSettings}
        onChange={setPrintSettings}
        availablePrinters={availablePrinters}
        onPrint={handlePrint}
      />

      <ExportSettingsDialog
        open={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        settings={exportSettings}
        onChange={setExportSettings}
        onExport={handleExport}
      />
    </div>
  );
}

function PrintSettingsDialog({
  open,
  onClose,
  settings,
  onChange,
  availablePrinters,
  onPrint,
}: {
  open: boolean;
  onClose: () => void;
  settings: PrintSettings;
  onChange: (settings: PrintSettings) => void;
  availablePrinters: string[];
  onPrint: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Print Settings</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <Label>Printer</Label>
            <Select
              value={settings.printerName || ''}
              onValueChange={(value) => onChange({ ...settings, printerName: value })}
              options={availablePrinters.map(p => ({ value: p, label: p }))}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label>Paper Size</Label>
            <Select
              value={settings.paperSize}
              onValueChange={(value) => onChange({ ...settings, paperSize: value })}
              options={[
                { value: '4x6', label: '4" x 6"' },
                { value: '4x8', label: '4" x 8"' },
                { value: 'a6', label: 'A6 (105 x 148 mm)' },
                { value: 'a5', label: 'A5 (148 x 210 mm)' },
                { value: 'letter', label: 'Letter (8.5" x 11")' },
              ]}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label>Orientation</Label>
            <Select
              value={settings.orientation}
              onValueChange={(value) => onChange({ ...settings, orientation: value as 'portrait' | 'landscape' })}
              options={[
                { value: 'portrait', label: 'Portrait' },
                { value: 'landscape', label: 'Landscape' },
              ]}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label>Quality</Label>
            <Select
              value={settings.quality}
              onValueChange={(value) => onChange({ ...settings, quality: value as 'draft' | 'normal' | 'high' })}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High' },
              ]}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label>Scaling</Label>
            <Select
              value={settings.scaling}
              onValueChange={(value) => onChange({ ...settings, scaling: value as 'fit' | 'actual' | 'custom' })}
              options={[
                { value: 'fit', label: 'Fit to Page' },
                { value: 'actual', label: 'Actual Size' },
                { value: 'custom', label: 'Custom Scale' },
              ]}
              className="w-full mt-1"
            />
          </div>
          {settings.scaling === 'custom' && (
            <div>
              <Label>Custom Scale (%)</Label>
              <input
                type="number"
                min="10"
                max="500"
                value={settings.customScale || 100}
                onChange={(e) => onChange({ ...settings, customScale: Number(e.target.value) })}
                className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {['top', 'right', 'bottom', 'left'].map(side => (
              <div key={side}>
                <Label className="capitalize">{side} Margin (mm)</Label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={settings.margins[side as keyof typeof settings.margins]}
                  onChange={(e) => onChange({
                    ...settings,
                    margins: { ...settings.margins, [side]: Number(e.target.value) }
                  })}
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
          <div>
            <Label>Copies</Label>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => onChange({ ...settings, copies: Math.max(1, settings.copies - 1) })}
                className="h-8 w-8 rounded border border-input bg-background flex items-center justify-center"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{settings.copies}</span>
              <button
                onClick={() => onChange({ ...settings, copies: settings.copies + 1 })}
                className="h-8 w-8 rounded border border-input bg-background flex items-center justify-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onPrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}

function ExportSettingsDialog({
  open,
  onClose,
  settings,
  onChange,
  onExport,
}: {
  open: boolean;
  onClose: () => void;
  settings: ExportSettings;
  onChange: (settings: ExportSettings) => void;
  onExport: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Export Settings</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <Label>Format</Label>
            <Select
              value={settings.format}
              onValueChange={(value) => onChange({ ...settings, format: value as 'pdf' | 'png' | 'svg' })}
              options={[
                { value: 'pdf', label: 'PDF (Vector)' },
                { value: 'png', label: 'PNG (Raster)' },
                { value: 'svg', label: 'SVG (Vector)' },
              ]}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label>Quality / DPI</Label>
            <Select
              value={String(settings.quality)}
              onValueChange={(value) => onChange({ ...settings, quality: Number(value) })}
              options={[
                { value: '1', label: 'Standard (150 DPI)' },
                { value: '2', label: 'High (300 DPI)' },
                { value: '3', label: 'Ultra (600 DPI)' },
              ]}
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label>Filename</Label>
            <input
              type="text"
              value={settings.filename}
              onChange={(e) => onChange({ ...settings, filename: e.target.value })}
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeBackground"
              checked={settings.includeBackground}
              onChange={(e) => onChange({ ...settings, includeBackground: e.target.checked })}
              className="h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <label htmlFor="includeBackground" className="text-sm font-medium text-foreground cursor-pointer">
              Include Background
            </label>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onExport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}