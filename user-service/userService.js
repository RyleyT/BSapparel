const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const APIgateway = require('../api-gateway/api');

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
});

const User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Userdb", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/user", (req, res) => {
    res.send("API-GATEWAY SUCCESSFUL. USER SERVICE REACHED.");
});

app.get("/user/:userId", (req, res, next) => {
    User.findById(req.params.userId)
        .then((User) => {
            res.json(User);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

app.post("/user", (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});