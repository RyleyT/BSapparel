const express = require('express'),
  router = express.Router(),
  userController = require('./controllers/userController'),
  ///TEMP DATABASE ACCESS
  mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/BSapparel?retryWrites=true&w=majority", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

//Home page route
router.get('/', function (req, res) {
  res.render('index.html', { title: 'BSrouterarel Home' });
})

//Info route
router.get('/info', function (req, res) {
  res.render('info.html', { title: 'About Us' });
})

//Register routes
router.get('/register', function (req, res) {
  res.render('register.html', { title: 'Register' })
})
router.post('/register', userController.validate, userController.create, userController.redirectView)

//Login routes
router.get('/login', userController.login);
router.post('/login', userController.authenticate, userController.redirectView);
router.get('/logout', userController.logout);

//Users routes
router.get('/users', userController.index, userController.indexView);
router.get('/users/:id', userController.show, userController.showView);
router.get('/users/:id/edit', userController.edit);
router.put('/users/:id/update', userController.update, userController.redirectView);
router.delete('/users/:id/delete', userController.delete, userController.redirectView);

//Profile routes
router.get('/profile', (req, res) => {
  res.render('profile.ejs')
})

module.exports = router;