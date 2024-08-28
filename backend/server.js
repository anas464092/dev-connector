import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/api/userAuth.routes.js';
import postsRoute from './routes/api/posts.routes.js';
import profileRoute from './routes/api/profile.routes.js';

const app = express();
app.use(
    express.json({
        limit: '10mb',
    })
);

app.use(
    cors({
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    })
);

app.use(
    express.urlencoded({
        limit: '10mb',
        extended: true,
    })
);
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
