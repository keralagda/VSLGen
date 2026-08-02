import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import { AppShell } from '@/components/layout/AppShell';
import { Dashboard } from '@/pages/Dashboard';
import { GenerateLabel } from '@/pages/GenerateLabel';
import { Templates } from '@/pages/Templates';
import { AddressBook } from '@/pages/AddressBook';
import { History } from '@/pages/History';
import { Settings } from '@/pages/Settings';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <AppShell />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const generateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/generate',
  component: GenerateLabel,
});

const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/templates',
  component: Templates,
});

const addressBookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/address-book',
  component: AddressBook,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: History,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  generateRoute,
  templatesRoute,
  addressBookRoute,
  historyRoute,
  settingsRoute,
]);

export const router = createRouter({ routeTree });

export { RouterProvider };

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}