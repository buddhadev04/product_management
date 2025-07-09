const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');
const app = express();
dotenv.config()
url = process.env.DB_CONNECTION_URL
port = process.env.PORT
mongoose.connect(url)
.then(() => console.log('Mongodb Connected Successfully'))
.catch((err) => console.log("Connection Error", err))

app.use(express.json());
let frontendUrl = 'https://ujjwal-dresses.onrender.com';
app.use(cors({ origin: frontendUrl }));
app.use(cors());
app.use(productRouter);
app.use(authRouter);
app.listen(port, () => {
    console.log('server started')
})