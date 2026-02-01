import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Privacy from './pages/Privacy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
