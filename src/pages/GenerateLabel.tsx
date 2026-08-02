import { useState, useEffect } from 'react';
import { ShippingForm } from '@/components/forms/ShippingForm';
import { LabelPreview } from '@/components/preview/LabelPreview';
import { PrintToolbar } from '@/components/toolbar/PrintToolbar';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Download, Printer, RotateCcw, Plus, FileText, Settings } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { LabelTemplate, ExportSettings } from '@/types';

export function GenerateLabel() {
  const { currentLabel, templates, setRecentTemplate } = useAppStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<LabelTemplate | null>(null);

  useEffect(() => {
    if (currentLabel) {
      const template = templates.find(t => t.id === currentLabel.templateId);
      if (template) {
        setSelectedTemplate(template);
        setShowPreview(true);
      }
    }
  }, [currentLabel, templates]);

  const handleSave = async (data: any) => {
    setRecentTemplate(data.templateId);
    addToast({ type: 'success', title: 'Label Generated', message: 'Your shipping label has been created.' });
    setShowPreview(true);
  };

  const handlePreview = (data: any) => {
    const template = templates.find(t => t.id === data.templateId);
    if (template) {
      setSelectedTemplate(template);
      setShowPreview(true);
    }
  };

  const handlePrint = () => {
    const element = document.getElementById('vonixx-label-preview');
    if (!element) {
      addToast({ type: 'error', title: 'Print Failed', message: 'No label element found to print.' });
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast({ type: 'error', title: 'Popup Blocked', message: 'Please allow popups to print labels.' });
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Shipping Label</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #ffffff;
            }
            #print-container {
              width: 100%;
              height: 100%;
            }
            ${Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
              .map(style => style.outerHTML)
              .join('\n')}
          </style>
        </head>
        <body>
          <div id="print-container">
            ${element.outerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    addToast({ type: 'success', title: 'Printing', message: 'Label sent to thermal printer print spooler.' });
  };

  const handleExportFormat = async (format: 'pdf' | 'png' | 'svg') => {
    const element = document.getElementById('vonixx-label-preview');
    if (!element) {
      addToast({ type: 'error', title: 'Export Failed', message: 'No label element found to export.' });
      return;
    }

    try {
      addToast({ type: 'info', title: 'Exporting', message: `Preparing label for ${format.toUpperCase()} export...` });
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const fileName = `vonixx-shipping-label-${currentLabel?.trackingNumber || Date.now()}`;

      if (format === 'png') {
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${fileName}.png`;
        link.click();
        addToast({ type: 'success', title: 'Success', message: 'PNG label downloaded successfully.' });
      } else if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'in',
          format: [4, 6]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, 4, 6);
        pdf.save(`${fileName}.pdf`);
        addToast({ type: 'success', title: 'Success', message: 'PDF label downloaded successfully.' });
      } else {
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${fileName}.png`;
        link.click();
        addToast({ type: 'success', title: 'Success', message: 'Label downloaded successfully.' });
      }
    } catch (error) {
      console.error('Export failed:', error);
      addToast({ type: 'error', title: 'Export Error', message: 'An error occurred during export conversion.' });
    }
  };

  const handleExport = (settings: ExportSettings) => {
    handleExportFormat(settings.format);
  };

  const handleNewTemplate = () => {
    navigate({ to: '/templates' });
  };

  const handleDuplicate = () => {
    // Implementation for duplicating current label
    addToast({ type: 'info', title: 'Diluted', message: 'Label duplicated for editing.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate Label</h1>
          <p className="text-muted-foreground">Create professional shipping labels in seconds</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate({ to: '/settings' })}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleDuplicate}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button onClick={handleNewTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="form" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="preview" disabled={!showPreview}>Preview</TabsTrigger>
          <TabsTrigger value="print">Print</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <ShippingForm
            initialData={currentLabel || undefined}
            onSubmit={handleSave}
            onPreview={handlePreview}
          />
        </TabsContent>

        <TabsContent value="preview" forceMount>
          {showPreview && selectedTemplate ? (
            <LabelPreview
              label={currentLabel as any}
              template={selectedTemplate}
              showGridLines={false}
              onPrint={handlePrint}
              onExport={handleExportFormat}
            />
          ) : (
            <Card className="h-[500px] flex items-center justify-center">
              <CardContent className="text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Preview Available</h3>
                <p className="text-muted-foreground">Fill out the form and select a template to see a live preview.</p>
                <Button variant="outline" className="mt-4" onClick={() => {}}>
                  Go to Form
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="print">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Print Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {showPreview && selectedTemplate ? (
                    <LabelPreview
                      label={currentLabel as any}
                      template={selectedTemplate}
                      showGridLines={false}
                      onPrint={handlePrint}
                      onExport={handleExportFormat}
                    />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Printer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Generate a label first to see print preview.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Print Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <PrintToolbar
                    onPrint={handlePrint}
                    onExport={handleExport}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print Label
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleExportFormat('pdf')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => handleExportFormat('png')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PNG
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}