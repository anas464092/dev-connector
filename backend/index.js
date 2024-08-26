import app from './server.js';
import dotenv from 'dotenv';
import connect_DB from './db/connect_db.js';

dotenv.config({
    path: './.env',
});

const port = process.env.PORT || 5000;

connect_DB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Serving at the server http://localhost:${port}/`);
        });
    })
    .catch((err) => console.log(err));
