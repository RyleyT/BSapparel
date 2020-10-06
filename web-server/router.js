var express = require('express');
var router = express.Router();
var dbController = require('./controllers/dbController');

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
  //POST REQUEST FOR REGISTRATION GOES HERE
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