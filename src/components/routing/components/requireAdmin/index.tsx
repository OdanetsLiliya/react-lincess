import React from 'react';
import { Navigate } from "react-router-dom";

import ErrorPage from '../../../../pages/ErrorPage';

const RequireAdmin = ({ Component, userRole }) => {
    if (!userRole) {
        return <Navigate to="/login" replace />;
    }
    return userRole === 'admin' ? <Component /> : <ErrorPage description='У вас нет прав на посещение этой страницы. Обратитесь к администратору сайта.' />;
};

export default RequireAdmin;