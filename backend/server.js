const express = require('express');
const errorMiddleware = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectToDB = require('./config/db');
const port = process.env.PORT || 5000;

connectToDB();

const app = express();

app.use( express.json() );
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', require('./routes/todoRoutes'));

app.use(errorMiddleware);

app.listen(port, () => {
    console.log( `Server is starting on ${port}`)
})