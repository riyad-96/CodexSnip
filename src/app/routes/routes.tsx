import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '@/app/pages/client/home/Home';
import ProtectedPageWrapper from './protected-wrapper/ProtectedPageWrapper';
import CodeFolder from '@/app/pages/client/code/CodeFolder';
import Profile from '@/app/pages/client/profile/Profile';
import AppLayout from '@/layouts/AppLayout';
import AuthProtectedWrapper from './protected-wrapper/AuthProtectedWrapper';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            element: <ProtectedPageWrapper />,
            children: [
              {
                path: 'code/:id',
                element: <CodeFolder />,
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
