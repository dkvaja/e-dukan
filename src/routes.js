import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { getRoutes } from "./constants/routesItems";
import { useAuth } from "./hooks/use-auth-listener";
import { useProfile } from "./hooks/use-profile-listener";
import DashBoardLayOut from "./layouts/DashBoardLayout";
import PublicLayOut from "./layouts/PublicLayOut";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";

export const Router = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  const isValid = user && profile;

  return useRoutes([
    {
      path: "/",
      element: isValid ? <DashBoardLayOut /> : <Navigate to="/auth/login" />,
      children: getRoutes(profile.userType),
    },
    {
      path: "auth",
      element: !isValid ? <PublicLayOut /> : <Navigate to="/" />,
      children: [
        { path: "login", element: <LogIn /> },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
};

export default Router;
