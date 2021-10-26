// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Step 1

const routes = require('./routes/index');

// Step 2
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.kxsmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('ProyectoMinTIC/build'));
}


// HTTP request logger
app.use(morgan('tiny'));
app.use('/index', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
