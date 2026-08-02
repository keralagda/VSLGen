'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { cn } from '@/utils/helpers';

interface QRCodeProps {
  value: string;
  size?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  includeLogo?: boolean;
  logoUrl?: string;
  className?: string;
  onError?: (error: Error) => void;
}

export function QRCodeComponent({
  value,
  size = 128,
  errorCorrectionLevel = 'M',
  margin = 4,
  includeLogo = false,
  logoUrl,
  className,
  onError,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    const generateQR = async () => {
      try {
        await QRCode.toCanvas(canvasRef.current!, value, {
          width: size,
          margin,
          errorCorrectionLevel,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });

        if (includeLogo && logoUrl && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            const logoSize = size * 0.2;
            const logoX = (size - logoSize) / 2;
            const logoY = (size - logoSize) / 2;

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = logoUrl;
            img.onload = () => {
              ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 4;
              ctx.strokeRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
            };
            img.onerror = () => {
              console.warn('Failed to load QR code logo');
            };
          }
        }
      } catch (error) {
        console.error('QR code generation error:', error);
        onError?.(error as Error);
      }
    };

    generateQR();
  }, [value, size, errorCorrectionLevel, margin, includeLogo, logoUrl, onError]);

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </div>
  );
}

export function QRCodeSvg({
  value,
  size = 128,
  errorCorrectionLevel = 'M',
  margin = 4,
  className,
  onError,
}: Omit<QRCodeProps, 'includeLogo' | 'logoUrl'>) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !value) return;

    const generateQR = async () => {
      try {
        await QRCode.toCanvas(svgRef.current!, value, {
          width: size,
          margin,
          errorCorrectionLevel,
          color: {
            dark: '#000000',
            light: '#ffffff00',
          },
        });
      } catch (error) {
        console.error('QR code generation error:', error);
        onError?.(error as Error);
      }
    };

    generateQR();
  }, [value, size, errorCorrectionLevel, margin, onError]);

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <svg ref={svgRef} width={size} height={size} />
    </div>
  );
}