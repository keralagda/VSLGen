import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { ShipperCard } from '@/components/forms/ShipperCard';
import { ConsigneeCard } from '@/components/forms/ConsigneeCard';
import { ShipmentCard } from '@/components/forms/ShipmentCard';

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  text: Input,
  number: Input,
  select: Select,
  textarea: Textarea,
  checkbox: Checkbox,
  
  // Section Card Components (VRA Compound Components)
  shipper: ShipperCard,
  consignee: ConsigneeCard,
  shipment: ShipmentCard,
};

export function getRegisteredComponent(type: string): React.ComponentType<any> | undefined {
  return componentRegistry[type];
}
