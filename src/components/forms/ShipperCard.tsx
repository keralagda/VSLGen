'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { User, Building, MapPin, Phone, Mail, Hash, CreditCard } from 'lucide-react';
import { RegistryResolver } from '@/runtime/RegistryResolver';

interface ShipperCardProps {
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
    taxId: string;
    accountNumber: string;
    isDefault: boolean;
  }>;
}

export function ShipperCard({ defaultValues }: ShipperCardProps) {
  const { control, watch, setValue } = useFormContext();
  const country = watch('shipper.country') || defaultValues?.country || 'US';
  const state = watch('shipper.state') || defaultValues?.state || '';

  const countryOptions = RegistryResolver.resolveOptions('countries');
  const stateOptions = RegistryResolver.resolveOptions('states', { country });
  const cityOptions = RegistryResolver.resolveOptions('cities', { country, state });

  return (
    <fieldset className="border rounded-lg p-4 bg-background">
      <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-foreground">
        <User className="h-4 w-4 text-primary" />
        Shipper (From)
      </legend>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipper.name"
            control={control}
            defaultValue={defaultValues?.name || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Contact Name *"
                placeholder="John Doe"
                icon={<User className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="shipper.company"
            control={control}
            defaultValue={defaultValues?.company || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Company Name"
                placeholder="Acme Corporation"
                icon={<Building className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <Controller
          name="shipper.street1"
          control={control}
          defaultValue={defaultValues?.street1 || ''}
          render={({ field }) => (
            <Input
              {...field}
              label="Street Address *"
              placeholder="123 Main Street"
              icon={<MapPin className="h-4 w-4" />}
            />
          )}
        />

        <Controller
          name="shipper.street2"
          control={control}
          defaultValue={defaultValues?.street2 || ''}
          render={({ field }) => (
            <Input
              {...field}
              label="Address Line 2"
              placeholder="Suite 100, Building A"
              icon={<MapPin className="h-4 w-4" />}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="shipper.city"
            control={control}
            defaultValue={defaultValues?.city || ''}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  label="City *"
                  placeholder="New York"
                  list="shipper-cities"
                />
                <datalist id="shipper-cities">
                  {cityOptions.map(opt => (
                    <option key={opt.value} value={opt.label} />
                  ))}
                </datalist>
              </div>
            )}
          />
          <Controller
            name="shipper.state"
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
            name="shipper.postalCode"
            control={control}
            defaultValue={defaultValues?.postalCode || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Postal Code *"
                placeholder="10001"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipper.country"
            control={control}
            defaultValue={defaultValues?.country || 'US'}
            render={({ field }) => (
              <Select
                {...field}
                label="Country *"
                options={countryOptions}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue('shipper.state', '');
                }}
              />
            )}
          />
          <Controller
            name="shipper.phone"
            control={control}
            defaultValue={defaultValues?.phone || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Phone"
                placeholder="+1 (555) 123-4567"
                type="tel"
                icon={<Phone className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="shipper.email"
            control={control}
            defaultValue={defaultValues?.email || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                placeholder="shipper@example.com"
                type="email"
                icon={<Mail className="h-4 w-4" />}
              />
            )}
          />
          <Controller
            name="shipper.taxId"
            control={control}
            defaultValue={defaultValues?.taxId || ''}
            render={({ field }) => (
              <Input
                {...field}
                label="Tax ID / VAT"
                placeholder="US123456789"
                icon={<Hash className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <Controller
          name="shipper.accountNumber"
          control={control}
          defaultValue={defaultValues?.accountNumber || ''}
          render={({ field }) => (
            <Input
              {...field}
              label="Carrier Account Number"
              placeholder="UPS/FedEx account number"
              icon={<CreditCard className="h-4 w-4" />}
            />
          )}
        />
      </div>
    </fieldset>
  );
}