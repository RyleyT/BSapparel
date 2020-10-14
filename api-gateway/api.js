const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 4000;

// log requests via morgan
app.use(morgan('combined'));

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});

// display the current request to the console and time
app.use( (req, res, next) => {
  console.log("Request made: " + req.path);
  next();
})

var userRoutes = require('./routes/userRoutes');
var itemRoutes = require('./routes/itemRoutes');

// Routers for users and items
app.use(userRoutes);
app.use(itemRoutes);

//Start application
app.listen(PORT, () =>  {
  console.log(`API-Gateway listening on port ${PORT}`);
});