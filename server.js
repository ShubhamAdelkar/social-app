const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));

// ... rest of your server code
