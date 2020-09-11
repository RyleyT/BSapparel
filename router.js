var express = require('express');
var router = express.Router();

// Home page
router.get('/', function (req, res) {
  res.render('index.html', {title: 'BSApparel Home'});
})

// Info page
router.get('/info', function (req, res) {
  res.render('info.html', {title: 'About Us'});
})

module.exports = router;

// const httpStatus = require("http-status-codes"),
// htmlContentType = {
//     "Content-Type": "text/html"
// },

// routes = { //Here we define a routes object to store routes mapped to POST and GET requests.
// "GET": { //Our get requests stored here
//     "/info": (req, res) => {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type":"text/plain"
//         })
//         res.end("Welcome to the Info Page!")
//     }
// },
// 'POST': {} //Our post requests stored here
// };

// exports.handle = (req, res) => { //Create a handle function to process route and callback functions
//     try {
//         if(routes[req.method][req.url]) {
//             routes[req.method][req.url](req,res);
//         } else {
//             res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
//             res.end("<h1>File not found</h1>")
//         }
//     } catch (ex) {
//         console.log("Error: " + ex);
//     }
// };

// exports.get = (url, action) => { //Build get and post functions to register routes from main.js
//     routes["GET"][url] = action;
// };

// exports.post = (url, action) => {
//     routes["POST"][url] = action;
// };
