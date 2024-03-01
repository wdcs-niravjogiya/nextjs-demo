const express = require('express');
const next = require('next');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Use the port from environment variable or default to 3000
    const port = process.env.PORT || 3000;

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server is running on http://localhost:${port}`);
    });
});
