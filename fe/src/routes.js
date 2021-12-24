import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

//components
import {
  HomePage,
  AuthPage,
  ProfilePage,
  CartPage,
  CheckoutPage,
  ManagerPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "./pages";

//layouts
import { MainLayout } from "./layouts";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";

// ----------------------------------------------------------------------

export default function Router() {
  const isAuth = Cookies.get("__N12-token") || "";
  const cUser = useSelector((state) => state.user.user);
  const openResetPwdPage = window.localStorage.getItem(
    "open-reset-password-page"
  );

  const isLoggedIn = Boolean(isAuth);

  const isLoggedInAdmin = Boolean(isAuth && cUser.is_admin);

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
        {
          path: "/manager",
          element: isLoggedInAdmin ? <ManagerPage /> : <Navigate to="/404" />,
        },
      ],
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reset-password",
      element: openResetPwdPage ? (
        <ResetPasswordPage />
      ) : (
        <Navigate to="/404" />
      ),
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
}
