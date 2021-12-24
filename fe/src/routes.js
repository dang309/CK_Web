import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

//components
import {
  HomePage,
  AuthPage,
  ProfilePage,
  CartPage,
  CheckoutPage,
} from "./pages";

//layouts
import { MainLayout } from "./layouts";

import Cookies from "js-cookie";

// ----------------------------------------------------------------------

export default function Router() {
  const isAuth = Cookies.get("__N12-token") || "";

  const isLoggedIn = Boolean(isAuth);

  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      // isAuth && remember ? <MainLayout /> : <Navigate to="/auth" />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: isLoggedIn ? <ProfilePage /> : <Navigate to="/auth" />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: isLoggedIn ? <CheckoutPage /> : <Navigate to="/auth" />,
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" /> },
  ]);
}
