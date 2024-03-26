import React, { FC } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import Dashboard from "../pages/auth/Dashboard/Dashboard";
import Profile from "../pages/auth/Profile/Profile";

interface AuthNavigatorProps {
  children?: React.ReactNode;
}

const AuthNavigator: FC<AuthNavigatorProps> = () => (
  <BrowserRouter>
    <SlideRoutes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </SlideRoutes>
  </BrowserRouter>
);

export default AuthNavigator;
