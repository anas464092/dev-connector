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
import ProfilePage from './Pages/ProfilePage';
import Dashboard from './Pages/Dashboard';
import store from './store/store';
import { Provider } from 'react-redux';

const Root = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route element={<Protected />}>
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/post/:id' element={<SinglePost />} />
                    <Route path='/add-post' element={<AddPost />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route index path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/developers' element={<Developers />} />
                <Route path='/profile' element={<ProfilePage />} />
            </Route>
        </Routes>
    </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Root />
    </Provider>
);
