const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import Routes
const userRoutes = require('./routes/user');

// App
const app = express();

// Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database is Connected")
})

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})  