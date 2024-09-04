import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../Pages/Login';
import { useSelector } from 'react-redux';

function Protected() {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Login />;
}

export default Protected;
