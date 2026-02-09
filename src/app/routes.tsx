import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AppLayout from './layouts/AppLayout';
import Profile from './pages/Profile';
import AuthProtectedWrapper from '@/features/auth/components/AuthProtectedWrapper';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Folder from './pages/Folder';
import Home from './pages/Home';
import ProtectedPageWrapper from '@/shared/components/wrapper/ProtectedPageWrapper';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            element: <ProtectedPageWrapper />,
            children: [
              {
                path: 'folder/:id',
                element: <Folder />,
              },
              {
                path: 'profile',
                element: <Profile />,
              },
            ],
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthProtectedWrapper children={<AuthLayout />} />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);

export default router;
