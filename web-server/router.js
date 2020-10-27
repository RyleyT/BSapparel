const express = require('express'),
  router = express.Router(),
  userController = require('./controllers/userController');

router.get('/', function (req, res) {
  res.render('index.html', {title: 'BSApparel Home'});
})

router.get('/info', function (req, res) {
  res.render('info.html', {title: 'About Us'});
})

router.get('/register', function(req,res) {
  res.render('register.html', {title: 'Register'})
})

router.post('/register', function(req, res) { 
  // request({ 
  //   uri: 'http://127.0.0.1:4000/api/user'
  // }).pipe(res);
  console.log("Post request sent to register page");
})

router.get('/login',function(req,res){
  res.render('login.html', {title: 'Log-In'})
})

router.get('/profile',function(req,res){
  res.render('profile.html', {title: 'View Profile'})
})

router.get('/edit',function(req,res){
  res.render('edit.html', {title: 'Edit Profile'})
})

module.exports = router;