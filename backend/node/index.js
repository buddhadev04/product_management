const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const app = express();
dotenv.config()
url = process.env.DB_CONNECTION_URL
port = process.env.PORT
mongoose.connect(url)
.then(() => console.log('Mongodb Connected Successfully'))
.catch((err) => console.log("Connection Error", err))

app.use(express.json());
app.use(cors());
app.use(productRouter);
app.listen(port, () => {
    console.log(`server running on localhost:${port}`)
})