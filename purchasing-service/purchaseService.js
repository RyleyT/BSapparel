const express = require('express'),
  createError = require('http-errors'),
  morgan = require('morgan'),
  PORT = process.env.PORT || 7000,
  mongoose = require('mongoose'),
  appRequestId = require('express-request-id')(),
  logger = require('./logController');

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
app.use(appRequestId);

// receive all orders from db
app
  .get("/api/orders", (req, res) => {
    Order.find()
      .then((orders) => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders",
          responseId: res.getHeader(`x-request-id`),
          message: "responding with all orders",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);

        res.json(orders);
      })
      .catch((err) => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders",
          responseId: res.getHeader(`x-request-id`),
          message: "responding with error: unable to get orders",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);
        res.json(err.message);
      })
  })
  // create new order history in db
  .post("/api/orders", function (req, res) {
    // console.log(req.body);
    Order.create(req.body)
      .then((order) => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders",
          responseId: res.getHeader(`x-request-id`),
          message: "creating a new order",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);

        res.json(order);
      })
      .catch((err) => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders",
          responseId: res.getHeader(`x-request-id`),
          message: "responding with error: unable to create order",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);
        res.json(err.message);
      });
  });

  app
    .get('/api/orders/:id', function(req, res) {
      //get orders with the specified id
      Order.find({ $or:[{user: req.params.id},{_id: req.params.id}] })
      .then(orders => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders/:id",
          responseId: res.getHeader(`x-request-id`),
          message: "responding with orders by user or order id provided",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);
        res.json(orders);
      }).catch(error => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders/:id",
          responseId: res.getHeader(`x-request-id`),
          message: "responding with error: unable to get specified orders",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);
        res.json(error);
      })
    })
    .put('/api/orders/:id', function(req,res) {
      //update the order specified by the id
      Order.findByIdAndUpdate(req.params.id, req.body)
      .then(result => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders/:id",
          responseId: res.getHeader(`x-request-id`),
          message: "updated order with the specified id",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);
        res.json(result);
      }).catch(error => {
        // Log response with log-service
        let log = {
          service: "Purchase",
          route: "/api/orders",
          responseId: res.getHeader(`x-request-id`),
          message: "responding with error: unable to get specified order for update",
          date: Date.now
        }
        // Send log to log controller
        logger.logResponse(log);
        res.json(error);
      })
    })
    // .delete('api/orders/:id', function(req,res) {
    //   Order.findByIdAndDelete(req.params.id)
    //   .then(result => {
    //     res.json({
    //       message: "order with id " + req.params.id + " deleted"
    //     }).catch(error => {
    //       res.json(error);
    //     })
    //   })
    // })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

app.listen(PORT, () => {
  console.log(`Purchasing service listening on port ${PORT}`);
});
