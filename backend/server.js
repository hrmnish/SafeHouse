const express = require('express');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`SafeHouse server starting on port: ${port}...`);
});

