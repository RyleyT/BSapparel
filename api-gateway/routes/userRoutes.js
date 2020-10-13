var express = require('express');
var userRouter = express.Router();

// define the user route
userRouter.get('/', (req, res) => {
  // Make user-service request to get all users

});

// define the userId route
userRouter.get('/:userId', (req, res) => {
  // Make user-service request to get user by userId

});

// define the user registration
userRouter.post('/', (req, res) => {
  // Make user-service request to post new user info

});

module.exports = userRouter