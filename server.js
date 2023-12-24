const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://socialapp-imbachhu.vercel.app/',
    credentials: true,
}));

// ... rest of your server code
