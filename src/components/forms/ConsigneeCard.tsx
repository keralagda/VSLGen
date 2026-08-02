'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { User, Building, MapPin, Phone, Mail, Hash, Eye, FileText } from 'lucide-react';
import { RegistryResolver } from '@/runtime/RegistryResolver';

interface ConsigneeCardProps {
  defaultValues?: Partial<{
    name: string;
    company: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    attention: string;
    instructions: string;
    isDefault: boolean;
  }>;
}

export function ConsigneeCard({ defaultValues }: ConsigneeCardProps) {
  const { control, watch, setValue } = useFormContext();
  const country = watch('consignee.country') || defaultValues?.country || 'US';
  const state = watch('consignee.state') || defaultValues?.state || '';

  const countryOptions = RegistryResolver.resolveOptions('countries');
  const stateOptions = RegistryResolver.resolveOptions('states', { country });
  const cityOptions = RegistryResolver.resolveOptions('cities', { country, state });

  return (
    <fieldset className="border rounded-lg p-4 bg-background">
      <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-foreground">
        <User className="h-4 w-4 text-primary" />
        Consignee (To)
      </legend>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="consignee.name"
            control={control}
            defaultValue={defaultValues?.name || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Contact Name *"
                placeholder="Jane Smith"
                icon={<User className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="consignee.company"
            control={control}
            defaultValue={defaultValues?.company || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Company Name"
                placeholder="Globex Corporation"
                icon={<Building className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <Controller
          name="consignee.street1"
          control={control}
          defaultValue={defaultValues?.street1 || ''}
          render={({ field }) => (
            <Input
              {...field}
              label="Street Address *"
              placeholder="456 Oak Avenue"
              icon={<MapPin className="h-4 w-4" />}
            />
          )}
        />

        <Controller
          name="consignee.street2"
          control={control}
          defaultValue={defaultValues?.street2 || ''}
          render={({ field }) => (
            <Input
              {...field}
              label="Address Line 2"
              placeholder="Floor 2, Reception"
              icon={<MapPin className="h-4 w-4" />}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="consignee.city"
            control={control}
            defaultValue={defaultValues?.city || ''}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  label="City *"
                  placeholder="Los Angeles"
                  list="consignee-cities"
                />
                <datalist id="consignee-cities">
                  {cityOptions.map(opt => (
                    <option key={opt.value} value={opt.label} />
                  ))}
                </datalist>
              </div>
            )}
          />
          <Controller
            name="consignee.state"
            control={control}
            defaultValue={defaultValues?.state || ''}
            render={({ field }) => (
              <Select
                {...field}
                label="State/Province *"
                placeholder="Select state"
                options={stateOptions}
              />
            )}
          />
          <Controller
            name="consignee.postalCode"
            control={control}
            defaultValue={defaultValues?.postalCode || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Postal Code *"
                placeholder="90001"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="consignee.country"
            control={control}
            defaultValue={defaultValues?.country || 'US'}
            render={({ field }) => (
              <Select
                {...field}
                label="Country *"
                options={countryOptions}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue('consignee.state', '');
                }}
              />
            )}
          />
          <Controller
            name="consignee.phone"
            control={control}
            defaultValue={defaultValues?.phone || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Phone"
                placeholder="+1 (555) 987-6543"
                type="tel"
                icon={<Phone className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="consignee.email"
            control={control}
            defaultValue={defaultValues?.email || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                placeholder="consignee@example.com"
                type="email"
                icon={<Mail className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="consignee.attention"
            control={control}
            defaultValue={defaultValues?.attention || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Attention (Optional)"
                placeholder="Shipping Department"
                icon={<Eye className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <Controller
          name="consignee.instructions"
          control={control}
          defaultValue={defaultValues?.instructions || ''}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Delivery Instructions"
              placeholder="Leave at front door, ring bell, etc."
              rows={2}
              icon={<FileText className="h-4 w-4" />}
            />
          )}
        />
      </div>
    </fieldset>
  );
}