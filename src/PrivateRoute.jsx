import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check for the token

  if (!authToken) {
    // If no token found, redirect to login page
    return <Navigate to="/" />;
  }

  return children; // If authenticated, render the children (protected route)
};

export default PrivateRoute;
