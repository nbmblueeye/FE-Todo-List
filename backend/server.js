const path = require('path');
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

//Serve frontend
if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get('*', (req, res) => 
//    { 
//         res.sendFile(
//             path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
//         )
//         res.status(200).json({
//             message: 'Hello from DALL.E!',
//         });
//     } 
//)
    app.get('/', (req, res) => res.send("Hello from DALL.E!"))
}else{
    app.get('/', (req, res) => res.send("Please set to production"))
}

app.use(errorMiddleware);

app.listen(port, () => {
    console.log( `Server is starting on ${port}`)
})