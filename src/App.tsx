import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from './components/ErrorBoundary';
import { Layout } from './components/layout/Layout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import Generator from './pages/Generator';
import NotFound from './pages/NotFound';

// Lazy-loaded heavy pages
const Gallery = lazy(() => import('./pages/Gallery'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Avatars = lazy(() => import('./pages/Avatars'));
const PostCreator = lazy(() => import('./pages/PostCreator'));
const Privacy = lazy(() => import('./pages/Privacy'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/generator',
        element: <Generator />,
      },
      {
        path: '/create',
        element: <Generator />,
      },
      {
        path: '/dashboard',
        element: <Suspense fallback={<PageFallback />}><Dashboard /></Suspense>,
      },
      {
        path: '/gallery',
        element: <Suspense fallback={<PageFallback />}><Gallery /></Suspense>,
      },
      {
        path: '/modeliai',
        element: <Suspense fallback={<PageFallback />}><Avatars /></Suspense>,
      },
      {
        path: '/post-creator',
        element: <Suspense fallback={<PageFallback />}><PostCreator /></Suspense>,
      },
      {
        path: '/privacy',
        element: <Suspense fallback={<PageFallback />}><Privacy /></Suspense>,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <Analytics />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
