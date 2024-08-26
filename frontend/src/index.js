// import './assets/styles/bootstrap.custom.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Developers from './Pages/Developers';
import Posts from './Pages/Posts';
import SinglePost from './Pages/SinglePost';
import Protected from './components/Protected';
import AddPost from './Pages/AddPost';

const Root = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route element={<Protected />}>
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/post/:id' element={<SinglePost />} />
                    <Route path='add-post' element={<AddPost />} />
                </Route>
                <Route index path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/developers' element={<Developers />} />
            </Route>
        </Routes>
    </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
