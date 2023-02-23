import React from 'react';
import { Navigate } from "react-router-dom";

const RequireAuth = ({ Component, userId }) => {
  return userId ? <Component /> : <Navigate to="/login" replace />;
};

export default RequireAuth;