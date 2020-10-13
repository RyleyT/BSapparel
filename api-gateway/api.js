const express = require('express');
const app = express();
const userServiceUrl = "https://localhost:5000/api/user/";
app.set('port', process.env.PORT || 4000);

//

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});

// display the current request to the console
app.use( (req, res, next) => {
  console.log("Request made: " + req.path);
  next();
})

// Routers for users and items
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);

// User login request
app.get('/user/:userId', (req, res) => {
  res.json(https.get(userServiceUrl + req.params.userId, (req, res) => {
  }).then((user) => {
    return user.json();
  }).catch((error => {
    console.log("Error: " + error.message);
  })));
});

// Proxy registration request
app.post('/user', (req, res) => {
  res.json(https.post(userServiceUrl, (req, res) => {
  }).then((user) => {
    return user.json();
  }).catch((error => {
    console.log("Error: " + error.message);
  })));
});

//Start application
app.listen(app.get('port'), () =>  {
  console.log(`Express started on http://localhost: ${app.get('port')} press Ctrl-C to terminate.`);
});