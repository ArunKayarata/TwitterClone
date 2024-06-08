const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Controllers/UserController'); // Path to your user routes
const tweetRoutes = require('./Controllers/TweetsController'); // Path to your tweet routes

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Routes

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error connecting to MongoDB', error);
});



app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);


