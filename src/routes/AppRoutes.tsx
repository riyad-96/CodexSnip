import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ClientLayout from '../layouts/ClientLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/client/home/Home';
import CodeFolder from '../pages/client/code/CodeFolder';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import AppContexts from '../contexts/AppContexts';
import AuthProtectedWrapper from './protected-wrapper/AuthProtectedWrapper';
import ProtectedPageWrapper from './protected-wrapper/ProtectedPageWrapper';
import LoadingLayout from '../layouts/LoadingLayout';
import NotFound from '../pages/notfound/NotFound';
import CodeContext from '../contexts/CodeContext';
import Profile from '@/pages/client/profile/Profile';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AppContexts children={<LoadingLayout children={<App />} />} />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: (
          <CodeContext>
            <ClientLayout />
          </CodeContext>
        ),
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'code/:id',
            element: <ProtectedPageWrapper children={<CodeFolder />} />,
          },
          {
            path: 'profile',
            element: <ProtectedPageWrapper children={<Profile />} />,
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

export default AppRoutes;
