const { data } = require('jquery');
const dataController = require('./controllers/dataController');

const express = require('express'),
  router = express.Router(),
  ///TEMP DATABASE ACCESS
  mongoose = require('mongoose'),
  logger = require('./controllers/logController');

//Home page route
router.get('/', function (req, res) {
  // Log response with log-service
  let log = {
    service: "Client",
    route: "/",
    responseId: res.getHeader(`x-request-id`),
    message: "showing client home page",
    date: Date.now
  }
  // Send log to log controller
  logger.logResponse(log);

  res.render('index.html', { title: 'BS Apparel Home' });
  // router.get('/register', function(req,res) {
  //   res.render('register.html', {title: 'Register'})
})

//Info route
router.get('/info', function (req, res) {
  // Log response with log-service
  let log = {
    service: "Client",
    route: "/info",
    responseId: res.getHeader(`x-request-id`),
    message: "showing client info page",
    date: Date.now
  }
  // Send log to log controller
  logger.logResponse(log);

  res.render('info.html', { title: 'About Us' });
})

//Register routes
router
  .get('/register', function (req, res) {
    // Log response with log-service
    let log = {
      service: "Client",
      route: "/register",
      responseId: res.getHeader(`x-request-id`),
      message: "showing client register page",
      date: Date.now
    }
    // Send log to log controller
    logger.logResponse(log);

    res.render('register.html', { title: 'Register' })
  })
  .post('/register', dataController.register, function (req, res) {
    // Log response with log-service
    let log = {
      service: "Client",
      route: "/register",
      requestId: res.getHeader(`x-request-id`),
      message: "requesting to add new client to user service",
      date: Date.now
    }
    // Send log to log controller
    logger.logResponse(log);
    // after the user registers send them to the profile page
    res.render('profile.ejs', { title: 'View Profile' })
  });

//Login
router.get('/login', function (req, res) {
  // Log response with log-service
  let log = {
    service: "Client",
    route: "/login",
    responseId: res.getHeader(`x-request-id`),
    message: "showing client login page",
    date: Date.now
  }
  // Send log to log controller
  logger.logResponse(log);

  res.render('login.html', { title: 'Login' })
})

router.post('/login', dataController.login)

//Logout
router.get('/logout', dataController.logout);

// router.post('/register', userController.validate, userController.create, userController.redirectView)

// //Login routes
// router.get('/login', userController.login);
// router.post('/login', userController.authenticate, userController.redirectView);
// router.get('/logout', userController.logout);

// //Users routes
// router.get('/users', userController.index, userController.indexView);
// router.get('/users/:id', userController.show, userController.showView);
// router.get('/users/:id/edit', userController.edit);
// router.put('/users/:id/update', userController.update, userController.redirectView);
// router.delete('/users/:id/delete', userController.delete, userController.redirectView);

//Profile routes
router.get('/profile', function (req, res) {
  // Log response with log-service
  let log = {
    service: "Client",
    route: "/profile",
    responseId: res.getHeader(`x-request-id`),
    message: "showing client profile page",
    date: Date.now
  }
  // Send log to log controller
  logger.logResponse(log);

  res.render('profile.ejs')
})

router.get('/edit', function(req, res) { 
  res.render('edit.ejs') 
}).post('/edit', dataController.edit);

//Search
router.get('/search', function (req, res) {
  // Log response with log-service
  let log = {
    service: "Client",
    route: "/search",
    responseId: res.getHeader(`x-request-id`),
    message: "showing client search page",
    date: Date.now
  }
  // Send log to log controller
  logger.logResponse(log);

  res.render('search.ejs', { title: 'Item Search' })
}).post('/search', dataController.search)

// router.post('/search', dataController.purchase);

module.exports = router;