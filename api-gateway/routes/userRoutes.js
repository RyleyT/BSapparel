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
    userService.get(req.path)
        .then(resp => {
            res.json(resp.data);
        }).catch(error => {
            res.json(error);
        });
});

// define the user registration
userRoutes.post('/api/user', (req, res) => {
    // Make user-service request to post new user info
    userService.post(req)
        .then(resp => {
            res.json(resp.data);
        }).catch(error => {
            res.json(error);
        });
});

//define user update route
userRoutes.put('/api/user/:userId', (req, res) => {
    //Make user-service request to update user by Id
    userService.put(req)
        .then(resp => {
            res.json(resp);
        })
        .catch(err => { 
            res.json(err);
        });
});

//define delete user route
userRoutes.delete('/api/user/:userId', (req, res) => {
    //Make user-service request to update user by Id
    userService.delete(req.path)
        .then(resp => {
            res.json(resp); //sends back an empty object
        })
        .catch(err => { 
            res.json(err);
        });
});

module.exports = userRoutes