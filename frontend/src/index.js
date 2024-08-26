import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/styles/bootstrap.custom.css';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Developers from './Pages/Developers';
import Posts from './Pages/Posts';
import SinglePost from './Pages/SinglePost';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<Home />} />
            <Route index={true} path='/login' element={<Login />} />
            <Route index={true} path='/register' element={<Register />} />
            <Route index={true} path='/developers' element={<Developers />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/post/:id' element={<SinglePost />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
