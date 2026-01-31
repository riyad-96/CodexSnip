import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/client/Home";
import ProtectedPageWrapper from "@/shared/components/wrapper/ProtectedPageWrapper";
import CodeFolder from "./pages/client/CodeFolder";
import Profile from "./pages/client/Profile";
import AuthProtectedWrapper from "@/features/auth/components/AuthProtectedWrapper";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

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
