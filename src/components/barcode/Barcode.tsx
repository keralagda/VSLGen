'use client';

import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string;
  type?: 'code128' | 'code39' | 'ean13' | 'upc-a';
  width?: number;
  height?: number;
  displayValue?: boolean;
  fontSize?: number;
  margin?: number;
  className?: string;
}

export function Barcode({
  value,
  type = 'code128',
  width = 2,
  height = 100,
  displayValue = true,
  fontSize = 16,
  margin = 10,
  className,
}: BarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      try {
        JsBarcode(canvasRef.current, value, {
          format: type,
          width,
          height,
          displayValue,
          fontSize,
          margin,
          fontOptions: 'bold',
          textAlign: 'center',
          textPosition: 'bottom',
          background: '#ffffff',
          lineColor: '#000000',
        });
      } catch (error) {
        console.error('Barcode generation error:', error);
      }
    }
  }, [value, type, width, height, displayValue, fontSize, margin]);

  if (!value) {
    return (
      <div className={className} style={{ width: '200px', height: '80px' }}>
        <canvas ref={canvasRef} />
      </div>
    );
  }

  return (
    <div className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export function BarcodeSvg({
  value,
  type = 'code128',
  width = 2,
  height = 100,
  displayValue = true,
  fontSize = 16,
  margin = 10,
  className,
}: BarcodeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: type,
          width,
          height,
          displayValue,
          fontSize,
          margin,
          fontOptions: 'bold',
          textAlign: 'center',
          textPosition: 'bottom',
          background: '#ffffff',
          lineColor: '#000000',
        });
      } catch (error) {
        console.error('Barcode generation error:', error);
      }
    }
  }, [value, type, width, height, displayValue, fontSize, margin]);

  if (!value) {
    return <svg ref={svgRef} className={className} width="200" height="80" />;
  }

  return <svg ref={svgRef} className={className} />;
}