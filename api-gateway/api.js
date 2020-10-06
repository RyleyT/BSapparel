const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const userService = require('../user-service');

const userServiceProxy = httpProxy('https://127.0.0.1:4000');

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});

// Proxy login request
app.get('/users/:userId', (req, res, next) => {
  userServiceProxy(req, res, next);
});

// Proxy registration request
app.post('/users', (req, res, next) => {
    userServiceProxy(req, res, next);
});