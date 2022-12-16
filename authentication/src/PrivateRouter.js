import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const PrivateRouter = () => {
    const token = localStorage.getItem('Token');
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
