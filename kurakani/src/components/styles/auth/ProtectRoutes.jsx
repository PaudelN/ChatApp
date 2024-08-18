import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect}></Navigate>;
  return children ? children : <Outlet />;
};

export default ProtectRoutes;
