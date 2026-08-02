import { useState } from 'react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { Plus, Trash2, Save, Barcode, QrCode, LayoutGrid, Eye, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import { CARRIERS, LABEL_SIZES } from '@/constants';
import type { LabelTemplate, LabelField } from '@/types';
import { generateId } from '@/utils/helpers';

interface TemplateDialogProps {
  open: boolean;
  onClose: () => void;
  templateToEdit?: LabelTemplate | null;
}

export function TemplateDialog({ open, onClose, templateToEdit }: TemplateDialogProps) {
  const addTemplate = useAppStore(state => state.addTemplate);
  const updateTemplate = useAppStore(state => state.updateTemplate);
  const deleteTemplate = useAppStore(state => state.deleteTemplate);
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<LabelTemplate>>({
    name: '',
    description: '',
    carrier: 'ups',
    format: '4x6',
    width: 4,
    height: 6,
    unit: 'in',
    orientation: 'portrait',
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    fields: [],
    barcodes: [],
    qrCodes: [],
  });

  const [selectedField, setSelectedField] = useState<LabelField | null>(null);
  const [showFieldEditor, setShowFieldEditor] = useState(false);

  const handleClose = () => {
    onClose();
    setFormData({
      name: '',
      description: '',
      carrier: 'ups',
      format: '4x6',
      width: 4,
      height: 6,
      unit: 'in',
      orientation: 'portrait',
      margins: { top: 10, right: 10, bottom: 10, left: 10 },
      fields: [],
      barcodes: [],
      qrCodes: [],
    });
    setIsEditing(false);
    setSelectedField(null);
    setShowFieldEditor(false);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const templateData = {
      ...formData,
      id: isEditing ? templateToEdit?.id : generateId('template'),
      createdAt: isEditing ? templateToEdit?.createdAt || now : now,
      updatedAt: now,
      isCustom: true,
    } as LabelTemplate;

    if (isEditing && templateToEdit) {
      updateTemplate(templateToEdit.id, templateData);
      addToast({ type: 'success', title: 'Template Updated', message: `"${templateData.name}" has been updated.` });
    } else {
      addTemplate(templateData);
      addToast({ type: 'success', title: 'Template Created', message: `"${templateData.name}" has been created.` });
    }
    handleClose();
  };

  const handleDelete = () => {
    if (templateToEdit && confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(templateToEdit.id);
      addToast({ type: 'success', title: 'Template Deleted', message: 'Template has been removed.' });
      handleClose();
    }
  };

  const handleFormatChange = (formatId: '4x6' | '4x8' | 'a5' | 'a6' | 'letter' | 'custom') => {
    const format = LABEL_SIZES.find(f => f.id === formatId);
    if (format) {
      setFormData(prev => ({
        ...prev,
        format: formatId,
        width: format.width,
        height: format.height,
        unit: format.unit as 'in' | 'mm' | 'cm',
      }));
    }
  };

  const addField = (type: LabelField['type']) => {
    const newField: LabelField = {
      id: generateId('field'),
      type,
      label: '',
      value: '',
      dataPath: '',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 30 },
      style: {
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        color: '#000000',
        textAlign: 'left',
      },
    };
    setFormData(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField],
    }));
    setSelectedField(newField);
    setShowFieldEditor(true);
  };

  const updateField = (field: LabelField) => {
    setFormData(prev => ({
      ...prev,
      fields: (prev.fields || []).map(f => f.id === field.id ? field : f),
    }));
  };

  const deleteField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: (prev.fields || []).filter(f => f.id !== fieldId),
    }));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
      setShowFieldEditor(false);
    }
  };

  if (!open) return null;

  return (
    <Card className="max-w-4xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Template' : 'New Template'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="fields">Fields</TabsTrigger>
              <TabsTrigger value="barcodes">Barcodes/QR</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name *</Label>
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="My Custom Template"
                    />
                  </div>
                  <div>
                    <Label>Carrier</Label>
                    <Select
                      value={formData.carrier || 'ups'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, carrier: value }))}
                      options={CARRIERS.map(c => ({ value: c.id, label: c.name }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Template description..."
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Label Size</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {LABEL_SIZES.map(size => (
                    <button
                      key={size.id}
                      onClick={() => handleFormatChange(size.id as '4x6' | '4x8' | 'a5' | 'a6' | 'letter' | 'custom')}
                      className={cn(
                        'p-3 rounded-lg border text-left transition-all',
                        formData.format === size.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-muted-foreground">{size.width}x{size.height}{size.unit}</div>
                    </button>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Width</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.width || 0}
                      onChange={(e) => setFormData(prev => ({ ...prev, width: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.height || 0}
                      onChange={(e) => setFormData(prev => ({ ...prev, height: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label>Unit</Label>
                    <Select
                      value={formData.unit || 'in'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value as any }))}
                      options={[
                        { value: 'in', label: 'Inches' },
                        { value: 'mm', label: 'Millimeters' },
                        { value: 'cm', label: 'Centimeters' },
                      ]}
                    />
                  </div>
                  <div>
                    <Label>Orientation</Label>
                    <Select
                      value={formData.orientation || 'portrait'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, orientation: value as any }))}
                      options={[
                        { value: 'portrait', label: 'Portrait' },
                        { value: 'landscape', label: 'Landscape' },
                      ]}
                    />
                  </div>
                </div>

                <Separator />

                <h4 className="font-medium">Margins (mm)</h4>
                <div className="grid grid-cols-4 gap-4">
                  {['top', 'right', 'bottom', 'left'].map(side => (
                    <div key={side}>
                      <Label className="capitalize">{side}</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.margins?.[side as keyof typeof formData.margins] || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          margins: {
                            top: prev.margins?.top ?? 0,
                            right: prev.margins?.right ?? 0,
                            bottom: prev.margins?.bottom ?? 0,
                            left: prev.margins?.left ?? 0,
                            [side]: Number(e.target.value),
                          },
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fields" className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Label Fields</h4>
                <div className="flex gap-2">
                  {['text', 'barcode', 'qr', 'line', 'box', 'image'].map(type => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      onClick={() => addField(type as any)}
                      className="gap-1"
                    >
                      {type === 'text' && <span>T</span>}
                      {type === 'barcode' && <Barcode className="h-4 w-8" />}
                      {type === 'qr' && <QrCode className="h-4 w-4" />}
                      {type === 'line' && <div className="w-8 h-0.5 bg-current" />}
                      {type === 'box' && <LayoutGrid className="h-4 w-4" />}
                      {type === 'image' && <Eye className="h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-auto">
                {(formData.fields || []).map(field => (
                  <div
                    key={field.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border',
                      selectedField?.id === field.id && 'border-primary bg-primary/5'
                    )}
                    onClick={() => { setSelectedField(field); setShowFieldEditor(true); }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{field.type}</Badge>
                        <span className="font-medium truncate">{field.label || field.value || field.dataPath || 'Untitled Field'}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Pos: ({field.position.x}, {field.position.y}) | Size: {field.size.width}x{field.size.height}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(formData.fields || []).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No fields added yet. Click a button above to add a field.
                  </div>
                )}
              </div>

              {showFieldEditor && selectedField && (
                <Separator />
              )}

              {showFieldEditor && selectedField && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Edit Field</h4>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setShowFieldEditor(false); setSelectedField(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={selectedField.label || ''}
                        onChange={(e) => updateField({ ...selectedField, label: e.target.value })}
                        placeholder="Field label"
                      />
                    </div>
                    <div>
                      <Label>Data Path</Label>
                      <Input
                        value={selectedField.dataPath || ''}
                        onChange={(e) => updateField({ ...selectedField, dataPath: e.target.value })}
                        placeholder="shipper.name, consignee.city, etc."
                        list="dataPathSuggestions"
                      />
                      <datalist id="dataPathSuggestions">
                        <option value="shipper.name">Shipper Name</option>
                        <option value="shipper.company">Shipper Company</option>
                        <option value="shipper.street1">Shipper Street 1</option>
                        <option value="shipper.street2">Shipper Street 2</option>
                        <option value="shipper.city">Shipper City</option>
                        <option value="shipper.state">Shipper State</option>
                        <option value="shipper.postalCode">Shipper Postal Code</option>
                        <option value="shipper.country">Shipper Country</option>
                        <option value="shipper.phone">Shipper Phone</option>
                        <option value="shipper.email">Shipper Email</option>
                        <option value="consignee.name">Consignee Name</option>
                        <option value="consignee.company">Consignee Company</option>
                        <option value="consignee.street1">Consignee Street 1</option>
                        <option value="consignee.street2">Consignee Street 2</option>
                        <option value="consignee.city">Consignee City</option>
                        <option value="consignee.state">Consignee State</option>
                        <option value="consignee.postalCode">Consignee Postal Code</option>
                        <option value="consignee.country">Consignee Country</option>
                        <option value="consignee.phone">Consignee Phone</option>
                        <option value="consignee.email">Consignee Email</option>
                        <option value="consignee.attention">Consignee Attention</option>
                        <option value="consignee.instructions">Consignee Instructions</option>
                        <option value="shipment.serviceLevelName">Service Type (Service Level Name)</option>
                        <option value="shipment.packagingTypeName">Package Type (Packaging Type Name)</option>
                        <option value="shipment.totalWeight">Total Weight</option>
                        <option value="shipment.totalWeightUnit">Total Weight Unit</option>
                        <option value="trackingNumber">Tracking Number</option>
                        <option value="createdAt">Date Created</option>
                      </datalist>
                    </div>
                    <div>
                      <Label>Static Value</Label>
                      <Input
                        value={selectedField.value || ''}
                        onChange={(e) => updateField({ ...selectedField, value: e.target.value })}
                        placeholder="Static text"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select
                        value={selectedField.type}
                        onValueChange={(value) => updateField({ ...selectedField, type: value as any })}
                        options={[
                          { value: 'text', label: 'Text' },
                          { value: 'barcode', label: 'Barcode' },
                          { value: 'qr', label: 'QR Code' },
                          { value: 'line', label: 'Line' },
                          { value: 'box', label: 'Box' },
                          { value: 'image', label: 'Image' },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label>X Position</Label>
                      <Input
                        type="number"
                        value={selectedField.position.x}
                        onChange={(e) => updateField({ ...selectedField, position: { ...selectedField.position, x: Number(e.target.value) } })}
                      />
                    </div>
                    <div>
                      <Label>Y Position</Label>
                      <Input
                        type="number"
                        value={selectedField.position.y}
                        onChange={(e) => updateField({ ...selectedField, position: { ...selectedField.position, y: Number(e.target.value) } })}
                      />
                    </div>
                    <div>
                      <Label>Width</Label>
                      <Input
                        type="number"
                        value={selectedField.size.width}
                        onChange={(e) => updateField({ ...selectedField, size: { ...selectedField.size, width: Number(e.target.value) } })}
                      />
                    </div>
                    <div>
                      <Label>Height</Label>
                      <Input
                        type="number"
                        value={selectedField.size.height}
                        onChange={(e) => updateField({ ...selectedField, size: { ...selectedField.size, height: Number(e.target.value) } })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Font Size</Label>
                      <Input
                        type="number"
                        value={selectedField.style.fontSize || 12}
                        onChange={(e) => updateField({ ...selectedField, style: { ...selectedField.style, fontSize: Number(e.target.value) } })}
                      />
                    </div>
                    <div>
                      <Label>Font Weight</Label>
                      <Select
                        value={selectedField.style.fontWeight || 'normal'}
                        onValueChange={(value) => updateField({ ...selectedField, style: { ...selectedField.style, fontWeight: value } })}
                        options={[
                          { value: 'normal', label: 'Normal' },
                          { value: 'bold', label: 'Bold' },
                          { value: '600', label: 'Semi Bold' },
                        ]}
                      />
                    </div>
                    <div>
                      <Label>Color</Label>
                      <Input
                        type="color"
                        value={selectedField.style.color || '#000000'}
                        onChange={(e) => updateField({ ...selectedField, style: { ...selectedField.style, color: e.target.value } })}
                      />
                    </div>
                    <div>
                      <Label>Text Align</Label>
                      <Select
                        value={selectedField.style.textAlign || 'left'}
                        onValueChange={(value) => updateField({ ...selectedField, style: { ...selectedField.style, textAlign: value as any } })}
                        options={[
                          { value: 'left', label: 'Left' },
                          { value: 'center', label: 'Center' },
                          { value: 'right', label: 'Right' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="barcodes" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Barcodes</h4>
                <div className="space-y-2">
                  {(formData.barcodes || []).map((barcode, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <Badge variant="secondary">{barcode.type.toUpperCase()}</Badge>
                      <div className="flex-1">
                        <div className="font-mono text-sm">{barcode.value}</div>
                        <div className="text-sm text-muted-foreground">
                          Pos: ({barcode.position.x}, {barcode.position.y}) | Size: {barcode.size.width}x{barcode.size.height}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon-sm" onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          barcodes: (prev.barcodes || []).filter((_, i) => i !== index),
                        }));
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      barcodes: [
                        ...(prev.barcodes || []),
                        {
                          id: generateId('barcode'),
                          type: 'code128' as const,
                          value: '1Z999AA10123456784',
                          width: 2,
                          height: 60,
                          displayValue: true,
                          fontSize: 12,
                          margin: 5,
                          position: { x: 50, y: 200 },
                          size: { width: 300, height: 80 },
                        },
                      ],
                    }));
                  }}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Barcode
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">QR Codes</h4>
                <div className="space-y-2">
                  {(formData.qrCodes || []).map((qr, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <QrCode className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <div className="font-mono text-sm truncate max-w-xs">{qr.value}</div>
                        <div className="text-sm text-muted-foreground">
                          Size: {qr.size}px | ECC: {qr.errorCorrectionLevel} | Pos: ({qr.position.x}, {qr.position.y})
                        </div>
                      </div>
                      <Button variant="ghost" size="icon-sm" onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          qrCodes: (prev.qrCodes || []).filter((_, i) => i !== index),
                        }));
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      qrCodes: [
                        ...(prev.qrCodes || []),
                        {
                          value: 'https://tracking.example.com/1Z999AA10123456784',
                          size: 100,
                          errorCorrectionLevel: 'M' as const,
                          margin: 4,
                          position: { x: 350, y: 50 },
                          includeLogo: false,
                        },
                      ],
                    }));
                  }}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add QR Code
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex items-center justify-end gap-2 pt-6 mt-6 border-t">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          {isEditing && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button onClick={handleSave} disabled={!formData.name}>
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update' : 'Create'} Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}