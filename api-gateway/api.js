const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 4000;
const { createProxyMiddleware } = require('http-proxy-middleware'); // testing

morgan.token('host', function(req, res) {
  return req.headers.host
})
// log requests via morgan
app.use(morgan('API-GATEWAY\: :method :url :host'));

// Authentication
/*
app.use((req, res, next) => {
  // TODO: my authentication logic
  next();
});
*/

// display the current request to the console

// app.use( (req, res, next) => {
//   console.log("Request made: " + req.path);
//   next();
// });

app.use('/api/user', createProxyMiddleware({
  target: 'http://localhost:5000/',
  headers: {
    accept: "application/json",
    method: "GET"
  },
  changeOrigin: true 
}));

app.use('/api/items', createProxyMiddleware({
  target: 'http://localhost:6000/',
  headers: {
    accept: "application/json",
    method: "GET"
  },
  changeOrigin: true 
}));

app.use('/api/search', createProxyMiddleware({
  target: 'http://localhost:6000/',
  headers: {
    accept: "application/json",
    method: "GET"
  },
  changeOrigin: true 
}));


app.use('/api/orders', createProxyMiddleware({
  target: 'http://localhost:7000/',
  headers: {
    accept: "application/json",
    method: "GET"
  },
  changeOrigin: true 
}));


/*
var userRoutes = require('./routes/userRoutes');
var itemRoutes = require('./routes/itemRoutes');

// Routers for users and items
app.use(userRoutes);
app.use(itemRoutes);
*/

//Start application
app.listen(PORT, () =>  {
  console.log(`API-Gateway listening on port ${PORT}`);
});