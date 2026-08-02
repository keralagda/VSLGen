import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { TemplateDialog } from '@/components/dialogs/TemplateDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { LabelPreview } from '@/components/preview/LabelPreview';
import { Search, Plus, Edit, Trash2, Copy, Package, FileText, Eye } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import { CARRIERS, LABEL_SIZES } from '@/constants';
import { cn } from '@/utils/helpers';
import type { LabelTemplate } from '@/types';
import { defaultTemplates } from '@/registries';

const MOCK_LABEL = {
  id: 'mock-label-id',
  shipper: {
    name: 'John Doe',
    company: 'Vonixx Labs Inc.',
    street1: '123 Innovation Blvd',
    street2: 'Suite 500',
    city: 'Fortaleza',
    state: 'CE',
    postalCode: '60000-000',
    country: 'BR',
    phone: '+55 85 99999-9999',
    email: 'contact@vonixx.com',
  },
  consignee: {
    name: 'Jane Smith',
    company: 'Aero Logistics SA',
    street1: '456 Delivery Ave',
    street2: 'Warehouse 4',
    city: 'Miami',
    state: 'FL',
    postalCode: '33101',
    country: 'US',
    phone: '+1 (305) 555-0199',
    email: 'jane@aerologistics.com',
    attention: 'Jane Smith',
  },
  shipment: {
    serviceLevel: 'standard',
    serviceLevelName: 'Standard Shipping',
    packagingType: 'box',
    packagingTypeName: 'Medium Box',
    packages: [
      {
        id: 'pkg-1',
        length: 30,
        width: 20,
        height: 15,
        weight: 2.5,
        weightUnit: 'kg' as const,
        dimensionUnit: 'cm' as const,
      },
    ],
    totalWeight: 2.5,
    totalWeightUnit: 'kg' as const,
    specialServices: [],
    reference1: 'VON-98765-2026',
    paymentType: 'prepaid' as const,
  },
  barcode: {
    type: 'code128' as const,
    value: 'VX-123456789-BR',
    position: { x: 0, y: 0 },
    size: { width: 300, height: 60 },
  },
  trackingNumber: 'VX123456789BR',
  status: 'generated' as const,
  createdAt: '2026-08-02T00:00:00.000Z',
  updatedAt: '2026-08-02T00:00:00.000Z',
};

// defaultTemplates imported from registries

export function Templates() {
  const templates = useAppStore(state => state.templates);
  const addTemplate = useAppStore(state => state.addTemplate);
  const deleteTemplate = useAppStore(state => state.deleteTemplate);
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<LabelTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<LabelTemplate | null>(null);

  const allTemplates = [...defaultTemplates, ...templates];

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = search === '' ||
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCarrier = carrierFilter === 'all' || template.carrier === carrierFilter;
    const matchesFormat = formatFilter === 'all' || template.format === formatFilter;

    return matchesSearch && matchesCarrier && matchesFormat;
  });

  const handleNewTemplate = () => {
    setTemplateToEdit(null);
    setShowForm(true);
  };

  const handleEdit = (template: LabelTemplate) => {
    setTemplateToEdit(template);
    setShowForm(true);
  };

  const handleDelete = (template: LabelTemplate) => {
    if (confirm(`Delete "${template.name}"?`)) {
      deleteTemplate(template.id);
      addToast({ type: 'success', title: 'Template Deleted', message: `"${template.name}" has been removed.` });
    }
  };

  const handleDuplicate = (template: LabelTemplate) => {
    const newTemplate = addTemplate({
      ...template,
      name: `${template.name} (Copy)`,
      isCustom: true,
      isDefault: false,
    });
    addToast({ type: 'success', title: 'Template Duplicated', message: `"${newTemplate.name}" created.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Manage your shipping label templates</p>
        </div>
        {!showForm && (
          <Button onClick={handleNewTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        )}
      </div>

      {showForm ? (
        <TemplateDialog
          open={showForm}
          onClose={() => setShowForm(false)}
          templateToEdit={templateToEdit}
        />
      ) : (
        <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={carrierFilter}
              onValueChange={setCarrierFilter}
              options={[
                { value: 'all', label: 'All Carriers' },
                ...CARRIERS.map(c => ({ value: c.id, label: c.name })),
              ]}
              className="w-48"
            />
            <Select
              value={formatFilter}
              onValueChange={setFormatFilter}
              options={[
                { value: 'all', label: 'All Formats' },
                ...LABEL_SIZES.map(s => ({ value: s.id, label: s.name })),
              ]}
              className="w-40"
            />
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                {search || carrierFilter !== 'all' || formatFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first template to get started'}
              </p>
              <Button onClick={handleNewTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map(template => (
                <Card
                  key={template.id}
                  className={cn('transition-all hover:shadow-lg', template.isDefault && 'ring-2 ring-primary/20')}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      {template.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>{template.carrier.toUpperCase()}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <span>{template.format.toUpperCase()}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <span>{template.width}x{template.height}{template.unit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {template.isCustom && (
                        <Badge variant="outline" className="text-xs">Custom</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button variant="ghost" size="icon" onClick={() => setPreviewTemplate(template)} title="Preview">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(template)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDuplicate(template)} title="Duplicate">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(template)} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        </Card>
      )}

      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Template Preview: {previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            {previewTemplate && (
              <LabelPreview
                label={MOCK_LABEL as any}
                template={previewTemplate}
                className="w-full max-w-2xl border-none shadow-none"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}