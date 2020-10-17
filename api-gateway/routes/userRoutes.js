const { response } = require('express');
var express = require('express');
var userRoutes = express.Router();

const apiAdapter = require('../apiAdapter');
const userServiceUrl = "http://localhost:5000";
const userService = apiAdapter(userServiceUrl);

// define the user route
userRoutes.get('/api/user', (req, res) => {
    // make request to user-service to get all users
    userService.get(req.path)
        .then(resp => {
            res.json(resp.data);
        }).catch(error => {
            res.json(error);
        });
});

// define the userId route
userRoutes.get('/api/user/:userId', (req, res) => {
    // Make user-service request to get user by userId

});

// define the user registration
userRoutes.post('/api/user', (req, res) => {
    // Make user-service request to post new user info
    userService.post(req.path, req.body)
        .then(resp => {
            res.json(resp.data);
        }).catch(error => {
            res.json(error);
        });
});

module.exports = userRoutes