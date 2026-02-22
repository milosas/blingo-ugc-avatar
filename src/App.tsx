import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import Generator from './pages/Generator';
import Gallery from './pages/Gallery';
import Dashboard from './pages/Dashboard';
import Avatars from './pages/Avatars';
import PostCreator from './pages/PostCreator';
import Privacy from './pages/Privacy';

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
        element: <Dashboard />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/modeliai',
        element: <Avatars />,
      },
      {
        path: '/post-creator',
        element: <PostCreator />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
