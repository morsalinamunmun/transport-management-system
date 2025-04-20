// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If the user is not logged in, redirect to the Login page
    return <Navigate to="/Login" />;
  }

  return children;
};

export default PrivateRoute;
