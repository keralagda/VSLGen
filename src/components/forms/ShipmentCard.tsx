'use client';

import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/utils/helpers';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Package, Plus, Trash2, Scale, Ruler, Hash, CreditCard, Tag, FileText } from 'lucide-react';
import { CARRIERS, SPECIAL_SERVICES, PAYMENT_TYPES, INCO_TERMS, COUNTRIES } from '@/constants';
import { useAppStore } from '@/store/appStore';
import { RegistryResolver } from '@/runtime/RegistryResolver';
import { RegistryStore } from '@/runtime/RegistryStore';

interface PackageFormData {
  id: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  weightUnit: 'kg' | 'lb';
  dimensionUnit: 'cm' | 'in';
  description?: string;
  reference?: string;
  declaredValue?: number;
  currency?: string;
}

interface ShipmentCardProps {
  defaultValues?: Partial<{
    serviceLevel: string;
    serviceLevelName: string;
    packagingType: string;
    packagingTypeName: string;
    packages: PackageFormData[];
    specialServices: string[];
    reference1: string;
    reference2: string;
    reference3: string;
    customsValue: number;
    customsCurrency: string;
    customsDescription: string;
    harmonizedCode: string;
    countryOfOrigin: string;
    incoterm: string;
    paymentType: 'prepaid' | 'collect' | 'third-party';
    paymentAccount: string;
    codAmount: number;
    codCurrency: string;
  }>;
}

export function ShipmentCard({ defaultValues }: ShipmentCardProps) {
  const { control, watch, setValue } = useFormContext();
  const { templates } = useAppStore();
  const { fields: packages, append, remove } = useFieldArray({
    control,
    name: 'shipment.packages',
  });

  const packageSizeOptions = RegistryResolver.resolveOptions('box-sizes');

  const handleSelectSizePreset = (index: number, sizeId: string) => {
    const sizeObj = RegistryStore.get('box-sizes', sizeId) as any;
    if (sizeObj) {
      setValue(`shipment.packages.${index}.length`, sizeObj.length, { shouldDirty: true, shouldValidate: true });
      setValue(`shipment.packages.${index}.width`, sizeObj.width, { shouldDirty: true, shouldValidate: true });
      setValue(`shipment.packages.${index}.height`, sizeObj.height, { shouldDirty: true, shouldValidate: true });
      setValue(`shipment.packages.${index}.dimensionUnit`, sizeObj.unit || 'in', { shouldDirty: true, shouldValidate: true });
    }
  };

  const templateId = watch('templateId');
  const selectedTemplate = templates.find(t => t.id === templateId);
  const carrierId = selectedTemplate?.carrier;
  const carrier = CARRIERS.find(c => c.id === carrierId);
  const serviceLevels = carrier?.serviceLevels || [];
  const packagingTypes = carrier?.packagingTypes || [];

  const hasPackages = packages.length > 0;

  return (
    <fieldset className="border rounded-lg p-4 bg-background">
      <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-foreground">
        <Package className="h-4 w-4 text-primary" />
        Shipment Details
      </legend>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipment.serviceLevel"
            control={control}
            defaultValue={defaultValues?.serviceLevel || ''}
            render={({ field }) => (
              <Select
                {...field}
                label="Service Level *"
                placeholder="Select service level"
                options={serviceLevels.map(s => ({ value: s.id, label: `${s.name} (${s.code})` }))}
              />
            )}
          />
          <Controller
            name="shipment.packagingType"
            control={control}
            defaultValue={defaultValues?.packagingType || ''}
            render={({ field }) => (
              <Select
                {...field}
                label="Packaging Type *"
                placeholder="Select packaging"
                options={packagingTypes.map(p => ({ value: p.id, label: `${p.name} (${p.code})` }))}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="shipment.reference1"
            control={control}
            defaultValue={defaultValues?.reference1 || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Reference 1 (PO#)"
                placeholder="PO-12345"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="shipment.reference2"
            control={control}
            defaultValue={defaultValues?.reference2 || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Reference 2 (Order#)"
                placeholder="ORD-67890"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="shipment.reference3"
            control={control}
            defaultValue={defaultValues?.reference3 || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Reference 3 (Dept#)"
                placeholder="DEPT-001"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-sm font-medium">
            <Package className="h-4 w-4" />
            Packages
          </h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({
              id: `pkg-${Date.now()}`,
              length: 0,
              width: 0,
              height: 0,
              weight: 0,
              weightUnit: 'lb',
              dimensionUnit: 'in',
            })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Package
          </Button>
        </div>

        {packages.map((packageField, index) => (
          <Card key={packageField.id} className="mb-3">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{index + 1}</Badge>
                  <span className="text-sm font-medium">Package {index + 1}</span>
                </div>
                
                {/* Size Preset Selector */}
                <div className="flex items-center gap-2 flex-1 max-w-[180px] -mt-2">
                  <Select
                    placeholder="Size Preset"
                    options={packageSizeOptions}
                    onValueChange={(val) => handleSelectSizePreset(index, val)}
                  />
                </div>
                {packages.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <Controller
                  name={`shipment.packages.${index}.length`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.length || 0}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Length"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="12"
                      icon={<Ruler className="h-4 w-4" />}
                    />
                  )}
                />
                <Controller
                  name={`shipment.packages.${index}.width`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.width || 0}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Width"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="10"
                      icon={<Ruler className="h-4 w-4" />}
                    />
                  )}
                />
                <Controller
                  name={`shipment.packages.${index}.height`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.height || 0}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Height"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="8"
                      icon={<Ruler className="h-4 w-4" />}
                    />
                  )}
                />
                <Controller
                  name={`shipment.packages.${index}.weight`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.weight || 0}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Weight"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="5.5"
                      icon={<Scale className="h-4 w-4" />}
                    />
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name={`shipment.packages.${index}.dimensionUnit`}
                    control={control}
                    defaultValue={defaultValues?.packages?.[index]?.dimensionUnit || 'in'}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Dim Unit"
                        options={[
                          { value: 'in', label: 'Inches' },
                          { value: 'cm', label: 'Centimeters' },
                        ]}
                      />
                    )}
                  />
                  <Controller
                    name={`shipment.packages.${index}.weightUnit`}
                    control={control}
                    defaultValue={defaultValues?.packages?.[index]?.weightUnit || 'lb'}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Wgt Unit"
                        options={[
                          { value: 'lb', label: 'Pounds' },
                          { value: 'kg', label: 'Kilograms' },
                        ]}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <Controller
                  name={`shipment.packages.${index}.description`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.description || ''}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Description"
                      placeholder="Electronics, Clothing, etc."
                      icon={<Tag className="h-4 w-4" />}
                    />
                  )}
                />
                <Controller
                  name={`shipment.packages.${index}.reference`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.reference || ''}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Reference"
                      placeholder="SKU-123"
                      icon={<Hash className="h-4 w-4" />}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <Controller
                  name={`shipment.packages.${index}.declaredValue`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.declaredValue || 0}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Declared Value"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="100.00"
                      icon={<CreditCard className="h-4 w-4" />}
                    />
                  )}
                />
                <Controller
                  name={`shipment.packages.${index}.currency`}
                  control={control}
                  defaultValue={defaultValues?.packages?.[index]?.currency || 'USD'}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Currency"
                      options={[
                        { value: 'USD', label: 'USD' },
                        { value: 'EUR', label: 'EUR' },
                        { value: 'GBP', label: 'GBP' },
                        { value: 'CAD', label: 'CAD' },
                      ]}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {!hasPackages && (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Package className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No packages added yet. Click "Add Package" to get started.</p>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipment.paymentType"
            control={control}
            defaultValue={defaultValues?.paymentType || 'prepaid'}
            render={({ field }) => (
              <Select
                {...field}
                label="Payment Type"
                options={PAYMENT_TYPES.map(p => ({ value: p.value, label: p.label }))}
              />
            )}
          />
          <Controller
            name="shipment.paymentAccount"
            control={control}
            defaultValue={defaultValues?.paymentAccount || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Payment Account (if third-party)"
                placeholder="Third-party account number"
                icon={<CreditCard className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <Controller
          name="shipment.specialServices"
          control={control}
          defaultValue={defaultValues?.specialServices || []}
          render={({ field }) => (
            <div>
              <Label className="block text-sm font-medium mb-2">Special Services</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {SPECIAL_SERVICES.map(service => (
                  <label
                    key={service.id}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border p-2 text-sm cursor-pointer transition-colors',
                      'hover:bg-accent',
                      field.value?.includes(service.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-foreground'
                    )}
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      checked={field.value?.includes(service.id) || false}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(field.value || []), service.id]
                          : (field.value || []).filter((v: string) => v !== service.id);
                        field.onChange(newValue);
                      }}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span>{service.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        />

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipment.customsValue"
            control={control}
            defaultValue={defaultValues?.customsValue || 0}
            render={({ field }) => (
              <Input
                {...field}
                label="Customs Value"
                type="number"
                step="0.01"
                min="0"
                placeholder="500.00"
                icon={<CreditCard className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="shipment.customsCurrency"
            control={control}
            defaultValue={defaultValues?.customsCurrency || 'USD'}
            render={({ field }) => (
              <Select
                {...field}
                label="Customs Currency"
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EUR' },
                  { value: 'GBP', label: 'GBP' },
                  { value: 'CAD', label: 'CAD' },
                ]}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipment.customsDescription"
            control={control}
            defaultValue={defaultValues?.customsDescription || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Customs Description"
                placeholder="Electronic components for resale"
                icon={<FileText className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="shipment.harmonizedCode"
            control={control}
            defaultValue={defaultValues?.harmonizedCode || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="HS Code"
                placeholder="8542.31"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipment.countryOfOrigin"
            control={control}
            defaultValue={defaultValues?.countryOfOrigin || ''}
            render={({ field }) => (
              <Select
                {...field}
                label="Country of Origin"
                placeholder="Select country"
                options={COUNTRIES.map(c => ({ value: c.code, label: `${c.name} (${c.code})` }))}
              />
            )}
          />
          <Controller
            name="shipment.incoterm"
            control={control}
            defaultValue={defaultValues?.incoterm || ''}
            render={({ field }) => (
              <Select
                {...field}
                label="Incoterm"
                options={INCO_TERMS.map(i => ({ value: i.code, label: `${i.code} - ${i.name}` }))}
              />
            )}
          />
        </div>

        <Controller
          name="shipment.codAmount"
          control={control}
          defaultValue={defaultValues?.codAmount || 0}
          render={({ field }) => (
            <Input
              {...field}
              label="COD Amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              icon={<CreditCard className="h-4 w-4" />}
            />
          )}
        />

        <Controller
          name="shipment.codCurrency"
          control={control}
          defaultValue={defaultValues?.codCurrency || 'USD'}
          render={({ field }) => (
            <Select
              {...field}
              label="COD Currency"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
                { value: 'CAD', label: 'CAD' },
              ]}
            />
          )}
        />
      </div>
    </fieldset>
  );
}