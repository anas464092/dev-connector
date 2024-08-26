import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/api/userAuth.routes.js';
import postsRoute from './routes/api/posts.routes.js';
import profileRoute from './routes/api/profile.routes.js';

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);

app.get('/', (req, res) => {
    res.send('Hello from the server....');
});

// Global Error handler....
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'Something went wrong',
    });
});

export default app;
