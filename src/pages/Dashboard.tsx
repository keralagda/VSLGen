'use client';

import { useNavigate } from '@tanstack/react-router';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, FileText, Package, Clock } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function Dashboard() {
  const navigate = useNavigate();
  const history = useAppStore(state => state.history);

  const recentLabels = history.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your shipping labels and activity</p>
        </div>
        <Button onClick={() => navigate({ to: '/generate' })}>
          <Plus className="h-4 w-4 mr-2" />
          New Label
        </Button>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Labels</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate({ to: '/history' })}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {recentLabels.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No labels yet. Create your first label to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLabels.map(label => (
                  <div
                    key={label.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate({ to: '/generate', search: { edit: label.id } })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{label.trackingNumber || 'Draft Label'}</p>
                        <p className="text-sm text-muted-foreground">
                          {label.shipper.name} → {label.consignee.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{label.status}</span>
                      <p className="text-xs text-muted-foreground">
                        {new Date(label.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate({ to: '/generate' })}
            >
              <FileText className="h-8 w-8 mx-auto" />
              <span>Create Label</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate({ to: '/templates' })}
            >
              <Package className="h-8 w-8 mx-auto" />
              <span>Browse Templates</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate({ to: '/address-book' })}
            >
              <Package className="h-8 w-8 mx-auto" />
              <span>Address Book</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => navigate({ to: '/history' })}
            >
              <Clock className="h-8 w-8 mx-auto" />
              <span>View History</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}