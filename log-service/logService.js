var createError = require('http-errors');
var express = require('express');
var morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
});

const Log = require("./models/log");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var app = express();

app.use(morgan('Log-Service\: :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// receive all logs from db
app.get("/api/logs/", (req, res) => {
  Log.find()
  .then((logs) => {
    res.json(logs);
  })
  .catch((err) => {
    res.json(err.message);
  })
});

// receive all logs from db by service name
app.get("/api/logs/:service", (req, res) => {
  Log.find({service: req.params.service})
  .then((logs) => {
    res.json(logs);
  })
  .catch((err) => {
    res.json(err.message);
  })
});

// receive all logs from db by request id
app.get("/api/logs/:reqId", (req, res) => {
  Log.find({request: req.params.reqId})
  .then((logs) => {
    res.json(logs);
  })
  .catch((err) => {
    res.json(err.message);
  })
});

// receive all logs from db by response id
app.get("/api/logs/:resId", (req, res) => {
  Log.find({response: req.params.resId})
  .then((logs) => {
    res.json(logs);
  })
  .catch((err) => {
    res.json(err.message);
  })
});

// receive all logs from db by date
app.get("/api/logs/:date", (req, res) => {
  Log.find({date: req.params.date})
  .then((logs) => {
    res.json(logs);
  })
  .catch((err) => {
    res.json(err.message);
  })
});

// create new log history in db
app.post("/api/logs", function (req, res) {
  // console.log(req.body);
  Log.create(req.body)
      .then((log) => {
          res.json(log);
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
  console.log(`Logging service listening on port ${PORT}`);
});
