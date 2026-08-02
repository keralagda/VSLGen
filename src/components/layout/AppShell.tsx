'use client';

import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/utils/helpers';
import { useAppStore } from '@/store/appStore';

export function AppShell() {
  const collapsed = useAppStore(state => state.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn('transition-all duration-300', collapsed ? 'lg:pl-16' : 'lg:pl-64')}>
        <Header />
        <main className="p-4 md:p-6 lg:p-8" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}