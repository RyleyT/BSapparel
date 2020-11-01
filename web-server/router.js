var express = require('express');
var router = express.Router();
//const appid = process.env.APPID; 

router.get('/', function (req, res) {
  // res.send(`appid: ${appid} hope page: says hello!`)
  res.render('index.html', {title: 'BSApparel Home'});
})

router.get('/info', function (req, res) {
  res.render('info.html', {title: 'About Us'});
})

router.get('/register', function(req,res) {
  res.render('register.html', {title: 'Register'})
})

router.post('/register', function(req, res) { 
  // after the user registers send them to the profile page
  res.render('/profile.html', {title: 'View Profile'})
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

router.get('/search', function(req,res)
{
  res.render('search.html', {title: 'Item Search'})
})

module.exports = router;