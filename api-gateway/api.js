const express = require('express');
const app = express();
const userServiceUrl = "https://localhost:5000";

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});

// User login request
app.get('/users/:userId', (req, res, next) => {
  res.json(https.get(userServuceUrl + req.params.userId, (req, res) => {
    console.log(res.json());
  }).then((user) => {
    return user.json();
  }).catch((error => {
    console.log("Error: " + error.message);
  })));
});

// Proxy registration request
app.post('/users', (req, res, next) => {
    userServiceProxy(req, res, next);
});