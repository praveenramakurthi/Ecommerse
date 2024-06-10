const express = require('express');
const connectDB = require('./db');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
const routes=require('./routes');

app.use('/api',routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async() => {
    await connectDB();
    console.log(`app is listening on port ${PORT}`);
});




