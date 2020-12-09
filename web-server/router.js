const express = require('express'),
  router = express.Router(),
  ///TEMP DATABASE ACCESS
  mongoose = require('mongoose');

//Home page route
router.get('/', function (req, res) {
  res.render('index.html', { title: 'BSrouterarel Home' });
// router.get('/register', function(req,res) {
//   res.render('register.html', {title: 'Register'})
})

// router.post('/register', function(req, res) { 
//   // after the user registers send them to the profile page
//   res.render('/profile.html', {title: 'View Profile'})
// })

//Info route
router.get('/info', function (req, res) {
    // req.setHeader("ID", Math.random() * (1000000 - 100) + 100);

    // Log response with log-service
    let log = {
      service: "Client",
      route: "/info",
      // requestId: req.ID,
      message: "showing client info page",
      date: Date.now
    }
    console.log(log);
    // Send to log-service
    // fetch(logUrl, log);
    
  res.render('info.html', { title: 'About Us' });
})

//Register routes
router.get('/register', function (req, res) {
  // req.setHeader("ID", Math.random() * (1000000 - 100) + 100);

    // Log response with log-service
    let log = {
      service: "Client",
      route: "/register",
      // requestId: req.ID,
      message: "showing client register page",
      date: Date.now
    }
    console.log(log);
    // Send to log-service
    // fetch(logUrl, log);
  res.render('register.html', { title: 'Register' })
})

router.get('/login', function (req, res) {
  // req.setHeader("ID", Math.random() * (1000000 - 100) + 100);

    // Log response with log-service
    let log = {
      service: "Client",
      route: "/login",
      // requestId: req.ID,
      message: "showing client login page",
      date: Date.now
    }
    console.log(log);
    // Send to log-service
    // fetch(logUrl, log);
  res.render('login.html', { title: 'Login' })
})
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
router.get('/profile', (req, res) => {
  // req.setHeader("ID", Math.random() * (1000000 - 100) + 100);

    // Log response with log-service
    let log = {
      service: "Client",
      route: "/profile",
      // requestId: req.ID,
      message: "showing client profile page",
      date: Date.now
    }
    console.log(log);
    // Send to log-service
    // fetch(logUrl, log);
  res.render('profile.ejs')
})

router.get('/search', function(req,res)
{
  // req.setHeader("ID", Math.random() * (1000000 - 100) + 100);

    // Log response with log-service
    let log = {
      service: "Client",
      route: "/search",
      // requestId: req.ID,
      message: "showing client search page",
      date: Date.now
    }
    console.log(log);
    // Send to log-service
    // fetch(logUrl, log);
  res.render('search.html', {title: 'Item Search'})
})

module.exports = router;