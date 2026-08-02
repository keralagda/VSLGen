import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shipperSchema, consigneeSchema } from '@/utils/validation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { Search, Plus, Edit, Trash2, Star, Building, User, MapPin, Phone, Mail } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/useToast';
import { COUNTRIES } from '@/constants';
import { cn } from '@/utils/helpers';
import type { Shipper, Consignee } from '@/types';

type AddressFormData = {
  name: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  isDefault?: boolean;
  attention?: string;
  instructions?: string;
};

export function AddressBook() {
  const shippers = useAppStore(state => state.shippers);
  const consignees = useAppStore(state => state.consignees);
  const addShipper = useAppStore(state => state.addShipper);
  const updateShipper = useAppStore(state => state.updateShipper);
  const deleteShipper = useAppStore(state => state.deleteShipper);
  const setDefaultShipper = useAppStore(state => state.setDefaultShipper);
  const addConsignee = useAppStore(state => state.addConsignee);
  const updateConsignee = useAppStore(state => state.updateConsignee);
  const deleteConsignee = useAppStore(state => state.deleteConsignee);
  const setDefaultConsignee = useAppStore(state => state.setDefaultConsignee);
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'shippers' | 'consignees'>('shippers');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Shipper | Consignee | null>(null);

  const currentItems = activeTab === 'shippers' ? shippers : consignees;
  const addItem = activeTab === 'shippers' ? addShipper : addConsignee;
  const updateItem = activeTab === 'shippers' ? updateShipper : updateConsignee;
  const deleteItem = activeTab === 'shippers' ? deleteShipper : deleteConsignee;
  const setDefaultItem = activeTab === 'shippers' ? setDefaultShipper : setDefaultConsignee;

  const schema = activeTab === 'shippers' ? shipperSchema : consigneeSchema;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
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
      isDefault: false,
      attention: '',
      instructions: '',
    },
  });

  // Reset form schema resolver default fields when switching tabs
  useEffect(() => {
    if (!editingItem) {
      reset({
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
        isDefault: false,
        attention: '',
        instructions: '',
      });
    }
  }, [activeTab, editingItem, reset]);

  const filteredItems = currentItems.filter(item => {
    const matchesSearch = search === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.company?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const openDialog = (item?: Shipper | Consignee) => {
    if (item) {
      setEditingItem(item);
      reset({
        name: item.name || '',
        company: item.company || '',
        street1: item.street1 || '',
        street2: item.street2 || '',
        city: item.city || '',
        state: item.state || '',
        postalCode: item.postalCode || '',
        country: item.country || 'US',
        phone: item.phone || '',
        email: item.email || '',
        isDefault: item.isDefault || false,
        attention: (item as Consignee).attention || '',
        instructions: (item as Consignee).instructions || '',
      });
    } else {
      setEditingItem(null);
      reset({
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
        isDefault: false,
        attention: '',
        instructions: '',
      });
    }
    setShowForm(true);
  };

  const handleSave = (data: AddressFormData) => {
    if (editingItem && editingItem.id) {
      updateItem(editingItem.id, data as any);
      if (data.isDefault) setDefaultItem(editingItem.id);
      addToast({ type: 'success', title: 'Updated', message: `${data.name || 'Address'} has been updated.` });
    } else {
      const newItem = addItem(data as any);
      if (data.isDefault && newItem.id) setDefaultItem(newItem.id);
      addToast({ type: 'success', title: 'Added', message: `${data.name || 'Address'} has been added to your address book.` });
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (item: Shipper | Consignee) => {
    if (!item.id) return;
    if (confirm(`Delete "${item.name}" from address book?`)) {
      deleteItem(item.id);
      addToast({ type: 'success', title: 'Deleted', message: `"${item.name}" has been removed.` });
    }
  };

  const handleSetDefault = (item: Shipper | Consignee) => {
    if (!item.id) return;
    setDefaultItem(item.id);
    addToast({ type: 'success', title: 'Default Set', message: `"${item.name}" is now the default.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Address Book</h1>
          <p className="text-muted-foreground">Manage your saved shippers and consignees</p>
        </div>
        {!showForm && (
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab === 'shippers' ? 'Shipper' : 'Consignee'}
          </Button>
        )}
      </div>

      {showForm ? (
        <Card className="max-w-2xl mx-auto shadow-sm">
          <CardHeader>
            <CardTitle>{editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add ${activeTab.slice(0, -1)}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    {...register('name')}
                    label="Name *"
                    placeholder="John Doe"
                    error={!!errors.name}
                    hint={errors.name?.message}
                  />
                </div>
                <div>
                  <Input
                    {...register('company')}
                    label="Company"
                    placeholder="Acme Corp"
                    error={!!errors.company}
                    hint={errors.company?.message}
                  />
                </div>
              </div>

              <div>
                <Input
                  {...register('street1')}
                  label="Street Address *"
                  placeholder="123 Main St"
                  error={!!errors.street1}
                  hint={errors.street1?.message}
                />
              </div>

              <div>
                <Input
                  {...register('street2')}
                  label="Address Line 2"
                  placeholder="Suite 100"
                  error={!!errors.street2}
                  hint={errors.street2?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    {...register('city')}
                    label="City *"
                    placeholder="New York"
                    error={!!errors.city}
                    hint={errors.city?.message}
                  />
                </div>
                <div>
                  <Input
                    {...register('state')}
                    label="State/Province *"
                    placeholder="NY"
                    error={!!errors.state}
                    hint={errors.state?.message}
                  />
                </div>
                <div>
                  <Input
                    {...register('postalCode')}
                    label="Postal Code *"
                    placeholder="10001"
                    error={!!errors.postalCode}
                    hint={errors.postalCode?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Country *"
                        options={COUNTRIES.map(c => ({ value: c.code, label: `${c.name} (${c.code})` }))}
                        error={!!errors.country}
                        hint={errors.country?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <Input
                    {...register('phone')}
                    label="Phone"
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    error={!!errors.phone}
                    hint={errors.phone?.message}
                  />
                </div>
              </div>

              <div>
                <Input
                  {...register('email')}
                  label="Email"
                  placeholder="email@example.com"
                  type="email"
                  error={!!errors.email}
                  hint={errors.email?.message}
                />
              </div>

              {activeTab === 'consignees' && (
                <div>
                  <Input
                    {...register('attention')}
                    label="Attention (Optional)"
                    placeholder="Shipping Department"
                    error={!!errors.attention}
                    hint={errors.attention?.message}
                  />
                </div>
              )}

              <div>
                <Input
                  {...register('instructions')}
                  label="Delivery Instructions (Optional)"
                  placeholder="Leave at front door, ring bell, etc."
                  error={!!errors.instructions}
                  hint={errors.instructions?.message}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...register('isDefault')}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <Label htmlFor="isDefault">Set as default {activeTab.slice(0, -1)}</Label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Add'} {activeTab.slice(0, -1)}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'shippers' | 'consignees')} className="space-y-4">
          <TabsList>
            <TabsTrigger value="shippers">
              <User className="h-4 w-4 mr-2" />
              Shippers ({shippers.length})
            </TabsTrigger>
            <TabsTrigger value="consignees">
              <Building className="h-4 w-4 mr-2" />
              Consignees ({consignees.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shippers" forceMount>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shippers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No shippers saved</h3>
                  <p className="text-muted-foreground mb-4">Add your first shipper to speed up label creation.</p>
                  <Button onClick={() => openDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shipper
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                  <Card key={item.id} className={cn(item.isDefault && 'ring-2 ring-primary/20')}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            {item.company && <p className="text-sm text-muted-foreground">{item.company}</p>}
                          </div>
                        </div>
                        {item.isDefault && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Default
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.street1}</span>
                        {item.street2 && <span>, {item.street2}</span>}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.city}, {item.state} {item.postalCode}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{item.email}</span>
                      </div>

                      <Separator />

                      <div className="flex items-center gap-2">
                        {!item.isDefault && (
                          <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleSetDefault(item)}>
                            <Star className="h-4 w-4 mr-1" />
                            Set Default
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openDialog(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="consignees" forceMount>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search consignees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No consignees saved</h3>
                  <p className="text-muted-foreground mb-4">Add your first consignee to speed up label creation.</p>
                  <Button onClick={() => openDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Consignee
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                  <Card key={item.id} className={cn(item.isDefault && 'ring-2 ring-primary/20')}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            {item.company && <p className="text-sm text-muted-foreground">{item.company}</p>}
                          </div>
                        </div>
                        {item.isDefault && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Default
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.street1}</span>
                        {item.street2 && <span>, {item.street2}</span>}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.city}, {item.state} {item.postalCode}</span>
                      </div>
                      {activeTab === 'consignees' && (item as Consignee).attention && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>Attn: {(item as Consignee).attention}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex items-center gap-2">
                        {!item.isDefault && (
                          <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleSetDefault(item)}>
                            <Star className="h-4 w-4 mr-1" />
                            Set Default
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openDialog(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}