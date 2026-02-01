import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
