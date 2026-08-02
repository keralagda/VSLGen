'use client';

import { Package, FileText, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/utils/helpers';

interface DashboardCardsProps {
  className?: string;
}

export function DashboardCards({ className }: DashboardCardsProps) {
  const history = useAppStore(state => state.history);
  const shippers = useAppStore(state => state.shippers);
  const consignees = useAppStore(state => state.consignees);

  const totalLabels = history.length;
  const printedLabels = history.filter(h => h.status === 'printed').length;

  const thisMonth = history.filter(h => {
    const created = new Date(h.createdAt);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  const lastMonth = history.filter(h => {
    const created = new Date(h.createdAt);
    const now = new Date();
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return created.getMonth() === lastMonthDate.getMonth() && created.getFullYear() === lastMonthDate.getFullYear();
  }).length;

  const monthlyChange = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

  const stats = [
    {
      title: 'Total Labels',
      value: totalLabels,
      change: monthlyChange,
      changeLabel: 'vs last month',
      trend: monthlyChange >= 0 ? 'up' as const : 'down' as const,
      icon: <FileText className="h-8 w-8" />,
    },
    {
      title: 'Printed This Month',
      value: printedLabels,
      change: printedLabels > 0 ? ((printedLabels / totalLabels) * 100) : 0,
      changeLabel: 'of total',
      trend: 'up' as const,
      icon: <CheckCircle className="h-8 w-8" />,
    },
    {
      title: 'Saved Shippers',
      value: shippers.length,
      trend: 'neutral' as const,
      icon: <Package className="h-8 w-8" />,
    },
    {
      title: 'Saved Consignees',
      value: consignees.length,
      trend: 'neutral' as const,
      icon: <Package className="h-8 w-8" />,
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}