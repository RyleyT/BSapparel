const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});

// display the current request to the console and time
app.use( (req, res, next) => {
  console.log("Request made: " + req.path);
  next();
})

var userRoutes = require('./routes/userRoutes');
var itemRoutes = require('./routes/itemRoutes');

// Routers for users and items
app.use(userRoutes);
app.use(itemRoutes);

// User login request
app.get('/user/:userId', (req, res) => {
  res.json(https.get(userServiceUrl + req.params.userId, (req, res) => {
  }).then((user) => {
    return user.json();
  }).catch((error => {
    console.log("Error: " + error.message);
  })));
});

// Proxy registration request
app.post('/user', (req, res) => {
  res.json(https.post(userServiceUrl, (req, res) => {
  }).then((user) => {
    return user.json();
  }).catch((error => {
    console.log("Error: " + error.message);
  })));
});

//Start application
app.listen(PORT, () =>  {
  console.log(`API-Gateway listening on port ${PORT}`);
});