import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../Pages/Login';

function Protected() {
    const loggedin = true;
    return loggedin ? <Outlet /> : <Login />;
}

export default Protected;
