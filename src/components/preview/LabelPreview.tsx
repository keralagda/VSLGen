'use client';

import { useRef, useMemo, useState } from 'react';
import { cn } from '@/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Badge } from '@/components/ui/Badge';
import { ZoomIn, ZoomOut, RotateCcw, Download, Printer, Minimize } from 'lucide-react';
import { BarcodeSvg } from '@/components/barcode/Barcode';
import { QRCodeComponent } from '@/components/barcode/QRCode';
import type { ShippingLabel, LabelTemplate } from '@/types';

interface LabelPreviewProps {
  label: ShippingLabel | null;
  template: LabelTemplate | null;
  showGridLines?: boolean;
  onPrint?: () => void;
  onExport?: (format: 'pdf' | 'png' | 'svg') => void;
  className?: string;
}

const DPI = 96;
const INCH_TO_PX = DPI;
const MM_TO_PX = DPI / 25.4;

function getLabelDimensions(template: LabelTemplate | null): { width: number; height: number } {
  if (!template) return { width: 4 * INCH_TO_PX, height: 6 * INCH_TO_PX };

  const { width, height, unit } = template;
  let w = width;
  let h = height;

  if (unit === 'in') {
    w *= INCH_TO_PX;
    h *= INCH_TO_PX;
  } else if (unit === 'mm') {
    w *= MM_TO_PX;
    h *= MM_TO_PX;
  } else if (unit === 'cm') {
    w *= MM_TO_PX * 10;
    h *= MM_TO_PX * 10;
  }

  return { width: w, height: h };
}

function getFieldValue(label: ShippingLabel, dataPath: string): string {
  const paths = dataPath.split('.');
  let value: unknown = label;
  for (const path of paths) {
    if (value && typeof value === 'object' && path in value) {
      value = (value as Record<string, unknown>)[path];
    } else {
      return '';
    }
  }
  return String(value || '');
}

export function LabelPreview({
  label,
  template,
  showGridLines = false,
  onPrint,
  onExport,
  className,
}: LabelPreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const labelRef = useRef<HTMLDivElement>(null);

  const dimensions = useMemo(() => getLabelDimensions(template), [template]);
  const aspectRatio = dimensions.width / dimensions.height;

  const containerWidth = Math.min(600, dimensions.width * zoom);
  const containerHeight = containerWidth / aspectRatio;

  const previewStyle = useMemo(() => ({
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'center center',
  }), [containerWidth, containerHeight, rotation]);

  if (!label || !template) {
    return (
      <Card className={cn('flex items-center justify-center min-h-[400px]', className)}>
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-lg">No label to preview</p>
          <p className="text-sm">Fill out the form and select a template to see preview</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{template.name}</Badge>
          <Badge variant="outline">{template.format.toUpperCase()}</Badge>
          {template.carrier && <Badge variant="outline">{template.carrier.toUpperCase()}</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-mono w-16 text-center">{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setRotation((r) => (r + 90) % 360)}
            aria-label="Rotate"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => { setZoom(1); setRotation(0); }}
            aria-label="Reset view"
          >
            <Minimize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className="relative bg-white p-4 flex items-center justify-center min-h-[400px]"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div
          ref={labelRef}
          id="vonixx-label-preview"
          className={cn('relative overflow-hidden border border-gray-300 shadow-lg', showGridLines && 'grid-lines')}
          style={previewStyle}
        >
          {showGridLines && (
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="col-span-1 border-r border-gray-400" />
              ))}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="row-span-1 border-b border-gray-400" />
              ))}
            </div>
          )}

          {template.fields.map((field) => {
            const fieldValue = field.value || (field.dataPath ? getFieldValue(label, field.dataPath) : '');
            if (!fieldValue && field.type !== 'line' && field.type !== 'box') return null;

            const style: React.CSSProperties = {
              position: 'absolute',
              left: `${field.position.x}px`,
              top: `${field.position.y}px`,
              width: `${field.size.width}px`,
              height: `${field.size.height}px`,
              fontSize: field.style.fontSize ? `${field.style.fontSize}px` : '12px',
              fontWeight: field.style.fontWeight || 'normal',
              fontFamily: field.style.fontFamily || 'Arial, sans-serif',
              color: field.style.color || '#000000',
              backgroundColor: field.style.backgroundColor || 'transparent',
              borderColor: field.style.borderColor || 'transparent',
              borderWidth: field.style.borderWidth ? `${field.style.borderWidth}px` : '0',
              borderStyle: field.style.borderStyle || 'solid',
              textAlign: field.style.textAlign || 'left',
              display: 'flex',
              alignItems: field.style.verticalAlign === 'top' ? 'flex-start' :
                field.style.verticalAlign === 'bottom' ? 'flex-end' : 'center',
              justifyContent: field.style.textAlign === 'center' ? 'center' :
                field.style.textAlign === 'right' ? 'flex-end' : 'flex-start',
              padding: '0px 2px',
              lineHeight: '1.1',
              boxSizing: 'border-box',
              transform: field.style.rotation ? `rotate(${field.style.rotation}deg)` : undefined,
              transformOrigin: 'center center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            };

            switch (field.type) {
              case 'barcode':
                return (
                  <div key={field.id} style={style} className="flex items-center justify-center">
                    <BarcodeSvg
                      value={fieldValue}
                      type={label.barcode?.type === 'qr' ? 'code128' : (label.barcode?.type || 'code128') as any}
                      width={label.barcode?.width || 2}
                      height={label.barcode?.height || 60}
                      displayValue={label.barcode?.displayValue ?? true}
                      fontSize={label.barcode?.fontSize || 12}
                      margin={label.barcode?.margin || 5}
                    />
                  </div>
                );
              case 'qr':
                return (
                  <div key={field.id} style={style} className="flex items-center justify-center">
                    <QRCodeComponent
                      value={fieldValue}
                      size={Math.min(field.size.width, field.size.height)}
                      errorCorrectionLevel={label.qrCode?.errorCorrectionLevel || 'M'}
                      margin={label.qrCode?.margin || 4}
                    />
                  </div>
                );
              case 'line':
                const isVertical = field.size.width === 0;
                return (
                  <div
                    key={field.id}
                    style={{
                      ...style,
                      borderLeft: isVertical ? `${field.style.borderWidth || 1}px ${field.style.borderStyle || 'dashed'} ${field.style.borderColor || '#C7C7C7'}` : undefined,
                      borderBottom: !isVertical ? `${field.style.borderWidth || 1}px ${field.style.borderStyle || 'dashed'} ${field.style.borderColor || '#C7C7C7'}` : undefined,
                      width: isVertical ? '0px' : `${field.size.width}px`,
                      height: isVertical ? `${field.size.height}px` : '0px',
                    }}
                  />
                );
              case 'box':
                return (
                  <div
                    key={field.id}
                    style={{
                      ...style,
                      border: `${field.style.borderWidth || 1}px ${field.style.borderStyle || 'solid'} ${field.style.borderColor || '#000'}`,
                      backgroundColor: field.style.backgroundColor || 'transparent',
                    }}
                  />
                );
              case 'image':
                return (
                  <div key={field.id} style={style} className="flex items-center justify-center">
                    {fieldValue && (
                      <img
                        src={fieldValue}
                        alt={field.label || 'Image'}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                );
              default:
                return (
                  <div key={field.id} style={style}>
                    {field.label && (
                      <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '2px', opacity: 0.7 }}>
                        {field.label}
                      </div>
                    )}
                    <div>{fieldValue}</div>
                  </div>
                );
            }
          })}
        </div>
      </div>

      <div className="border-t p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Tracking: {label.trackingNumber || 'Auto-generated'}</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Status: <Badge variant="secondary">{label.status}</Badge></span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPrint} disabled={!onPrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => onExport?.('pdf')} disabled={!onExport}>
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => onExport?.('png')} disabled={!onExport}>
            <Download className="h-4 w-4 mr-1" />
            PNG
          </Button>
        </div>
      </div>
    </Card>
  );
}