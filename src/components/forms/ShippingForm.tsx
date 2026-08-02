'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { Alert } from '@/components/ui/Alert';
import { Save, Loader2, CheckCircle, Hash, AlertTriangle, Sparkles } from 'lucide-react';
import { RuntimeForm } from '@/runtime/RuntimeForm';
import { fullShippingFormSchema, type FullShippingFormData } from '@/utils/validation';
import type { ShippingLabel } from '@/types';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import { CARRIERS } from '@/constants';
import { RegistryStore } from '@/runtime/RegistryStore';

interface ShippingFormProps {
  initialData?: Partial<FullShippingFormData>;
  onSubmit?: (data: FullShippingFormData) => Promise<void>;
  onPreview?: (data: FullShippingFormData) => void;
}

export function ShippingForm({ initialData, onSubmit, onPreview }: ShippingFormProps) {
  const { currentLabel, updateCurrentLabel, pushUndo, templates } = useAppStore();
  const { addToast } = useToast();

  const form = useForm<FullShippingFormData>({
    resolver: zodResolver(fullShippingFormSchema),
    defaultValues: {
      shipper: {
        name: '',
        company: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
        phone: '',
        email: '',
        taxId: '',
        accountNumber: '',
        isDefault: false,
      },
      consignee: {
        name: '',
        company: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
        phone: '',
        email: '',
        attention: '',
        instructions: '',
        isDefault: false,
      },
      shipment: {
        serviceLevel: '',
        serviceLevelName: '',
        packagingType: '',
        packagingTypeName: '',
        packages: [{
          id: `pkg-${Date.now()}`,
          length: 0,
          width: 0,
          height: 0,
          weight: 0,
          weightUnit: 'lb',
          dimensionUnit: 'in',
          description: '',
          reference: '',
          declaredValue: 0,
          currency: 'USD',
        }],
        totalWeight: 0,
        totalWeightUnit: 'lb',
        specialServices: [],
        paymentType: 'prepaid',
        paymentAccount: '',
        codAmount: 0,
        codCurrency: 'USD',
      },
      templateId: '',
      trackingNumber: '',
      ...initialData,
    },
    mode: 'onChange',
  });

  const { control, watch, handleSubmit, reset, formState: { errors, isSubmitting, isValidating } } = form;

  const watchedValues = watch();

  useEffect(() => {
    if (currentLabel) {
      reset(currentLabel as FullShippingFormData);
    }
  }, [currentLabel, reset]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name) {
        updateCurrentLabel(value as Partial<ShippingLabel>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateCurrentLabel]);

  const handleSave = useCallback(async (data: FullShippingFormData) => {
    pushUndo(data);
    if (onSubmit) {
      await onSubmit(data);
    }
    addToast({
      type: 'success',
      title: 'Label Saved',
      message: 'Shipping label has been saved successfully.',
    });
  }, [onSubmit, pushUndo, addToast]);

  const handlePreview = useCallback((data: FullShippingFormData) => {
    if (onPreview) {
      onPreview(data);
    }
  }, [onPreview]);

  const handleFillRandomData = () => {
    const template = templates[Math.floor(Math.random() * templates.length)] || { id: 'ups-standard', carrier: 'ups' };
    const carrier = CARRIERS.find(c => c.id === template.carrier) || CARRIERS[0];
    const service = carrier.serviceLevels[Math.floor(Math.random() * carrier.serviceLevels.length)];
    const pkgType = carrier.packagingTypes[Math.floor(Math.random() * carrier.packagingTypes.length)];

    const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const companies = ['Innovate LLC', 'Global Trade Co', 'Fast Ship Inc', 'Apex Warehousing', 'Zenith Dist.'];
    const streets = ['742 Evergreen Terrace', '100 Main St', '456 Oak Ln', '789 Pine Dr', '321 Maple Ct'];

    // Resolve geographic fields dynamically from postal-codes registry
    const postalCodesMap = RegistryStore.getAll('postal-codes') || {};
    const postalCodes = Object.entries(postalCodesMap);

    const defaultGeo = { city: 'Austin', state: 'TX', country: 'US', zip: '78701' };
    const randomShipperEntry = postalCodes.length > 0 ? postalCodes[Math.floor(Math.random() * postalCodes.length)] : null;
    const randomConsigneeEntry = postalCodes.length > 0 ? postalCodes[Math.floor(Math.random() * postalCodes.length)] : null;

    const shipperGeo = randomShipperEntry ? { ...(randomShipperEntry[1] as any), zip: randomShipperEntry[0] } : defaultGeo;
    const consigneeGeo = randomConsigneeEntry ? { ...(randomConsigneeEntry[1] as any), zip: randomConsigneeEntry[0] } : defaultGeo;

    // Resolve payment type dynamically from payment-methods registry
    const paymentMethodsMap = RegistryStore.getAll('payment-methods') || {};
    const paymentMethodKeys = Object.keys(paymentMethodsMap);
    const randomPaymentType = paymentMethodKeys.length > 0 ? paymentMethodKeys[Math.floor(Math.random() * paymentMethodKeys.length)] : 'prepaid';

    // Resolve delivery options dynamically
    const deliveryOptionsMap = RegistryStore.getAll('delivery-options') || {};
    const deliveryOptionKeys = Object.keys(deliveryOptionsMap);
    const randomServices = Math.random() > 0.5 && deliveryOptionKeys.length > 0 ? [deliveryOptionKeys[Math.floor(Math.random() * deliveryOptionKeys.length)]] : [];

    const randomShipper = {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      street1: streets[Math.floor(Math.random() * streets.length)],
      street2: Math.random() > 0.5 ? `Suite ${Math.floor(Math.random() * 500) + 100}` : '',
      city: shipperGeo.city,
      state: shipperGeo.state,
      postalCode: shipperGeo.zip,
      country: shipperGeo.country,
      phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      email: `shipper-${Math.floor(Math.random() * 100)}@example.com`,
      taxId: `XX-XXX${Math.floor(1000 + Math.random() * 9000)}`,
      accountNumber: `${template.carrier.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      isDefault: false,
    };

    const randomConsignee = {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      street1: streets[Math.floor(Math.random() * streets.length)],
      street2: Math.random() > 0.5 ? `Apt ${Math.floor(Math.random() * 50) + 1}` : '',
      city: consigneeGeo.city,
      state: consigneeGeo.state,
      postalCode: consigneeGeo.zip,
      country: consigneeGeo.country,
      phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      email: `recipient-${Math.floor(Math.random() * 100)}@example.com`,
      attention: Math.random() > 0.5 ? 'Receiving Manager' : '',
      instructions: Math.random() > 0.5 ? 'Leave by front door' : '',
      isDefault: false,
    };

    const numPackages = Math.floor(Math.random() * 3) + 1;
    const randomPackages = Array.from({ length: numPackages }).map((_, idx) => {
      const weight = parseFloat((Math.random() * 30 + 1).toFixed(1));
      return {
        id: `pkg-${Date.now()}-${idx}`,
        length: Math.floor(Math.random() * 20) + 5,
        width: Math.floor(Math.random() * 15) + 5,
        height: Math.floor(Math.random() * 12) + 5,
        weight,
        weightUnit: 'lb' as const,
        dimensionUnit: 'in' as const,
        description: `Random Item #${idx + 1}`,
        reference: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
        declaredValue: Math.floor(Math.random() * 200) + 10,
        currency: 'USD',
      };
    });

    const totalWeight = parseFloat(randomPackages.reduce((acc, p) => acc + p.weight, 0).toFixed(1));

    const randomFormValues = {
      shipper: randomShipper,
      consignee: randomConsignee,
      shipment: {
        serviceLevel: service?.id || '',
        serviceLevelName: service?.name || '',
        packagingType: pkgType?.id || '',
        packagingTypeName: pkgType?.name || '',
        packages: randomPackages,
        totalWeight,
        totalWeightUnit: 'lb' as const,
        specialServices: randomServices,
        paymentType: randomPaymentType as any,
        paymentAccount: Math.random() > 0.5 ? `${Math.floor(10000000 + Math.random() * 90000000)}` : '',
        codAmount: Math.random() > 0.7 ? Math.floor(Math.random() * 150) + 10 : 0,
        codCurrency: 'USD',
      },
      templateId: template.id,
      trackingNumber: `${template.carrier.toUpperCase().slice(0, 2)}${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    reset(randomFormValues);
    addToast({
      type: 'info',
      title: 'Randomized Data',
      message: `Form filled with random shipment data using template: ${template.name}`,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6" noValidate>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Shipping Label Form</h2>
          <p className="text-sm text-muted-foreground">Fill in the details below to generate your shipping label</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={handleFillRandomData}>
            <Sparkles className="h-4 w-4 mr-2" />
            Randomize
          </Button>
          <Button type="button" variant="outline" onClick={() => handlePreview(watchedValues)} disabled={isSubmitting || isValidating}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button type="submit" disabled={isSubmitting || isValidating}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            <Save className="h-4 w-4 mr-2" />
            Save Label
          </Button>
        </div>
      </div>

      {errors.shipper && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Please fix the errors in the Shipper section before saving.
        </Alert>
      )}

      <RuntimeForm
        sectionIds={['shipper', 'consignee', 'shipment']}
      />

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="templateId"
          control={control}
          defaultValue={initialData?.templateId || ''}
          render={({ field }) => (
            <Select
              {...field}
              label="Label Template *"
              placeholder="Select a template"
              options={templates.map(t => ({ value: t.id, label: `${t.name} (${t.width}x${t.height}${t.unit})` }))}
            />
          )}
        />
        <Controller
          name="trackingNumber"
          control={control}
          defaultValue={initialData?.trackingNumber || ''}
          render={({ field }) => (
            <Input
              {...field}
              label="Tracking Number (Optional)"
              placeholder="1Z999AA10123456784"
              icon={<Hash className="h-4 w-4" />}
            />
          )}
        />
      </div>
    </form>
    </FormProvider>
  );
}