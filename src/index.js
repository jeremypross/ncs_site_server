require('./models/User');

// import express
const express = require('express');
// import mongoosee
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

// create app object
const app = express();

// parse incoming data into json using body-parser dependency:
app.use(bodyParser.json());

// tell app to use authRoutes.js file to handle routing:
app.use(authRoutes);

// connect to mongo cluster
const mongoUri = 'mongodb+srv://admin:LLLAUldzJ1y7ywA2@cluster0.7qgt3ml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// link mongo dependency to cluster URL
mongoose.connect(mongoUri);
// successful connection to mongo
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo instance');
});

// mongo error handling
mongoose.connection.on('error', () => {
    console.error('Error connecting to mongo', err);
});

// when you make a GET request to this route, call this function
// run middleware whenever someone makes a request to this route - authRoutes.js
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});

