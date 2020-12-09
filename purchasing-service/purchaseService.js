var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
const PORT = process.env.PORT || 7000;
const mongoose = require('mongoose');

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
});

const Order = require("./models/order");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var app = express();

app.use(morgan('Purchase-Service\: :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// receive all orders from db
app.get("/api/orders", (req, res) => {
  Order.find()
  .then((orders) => {
    // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

    // Log response with log-service
    let log = {
      service: "Purchase",
      route: "/api/orders",
      // reponseId: res.ID,
      message: "returning all orders in db.",
      date: Date.now
    }
    console.log(log);
    // Send to log-service
    // fetch(logUrl, log);

    res.json(orders);
  })
  .catch((err) => {
    res.json(err.message);
  })
});

// create new order history in db
app.post("/api/orders", function (req, res) {
  // console.log(req.body);
  Order.create(req.body)
      .then((order) => {
        // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders",
          // reponseId: res.ID,
          message: "creating order in db.",
          date: Date.now
        }
        console.log(log);
        // Send to log-service
        // fetch(logUrl, log);
    
        res.json(order);
      })
      .catch((err) => {
          res.json(err.message);
      });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Purchasing service listening on port ${PORT}`);
});
