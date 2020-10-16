const express = require("express");
const app = express();
const PORT = process.env.PORT || 6500;
const mongoose = require("mongoose");

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
});

const Item = require("./models/item");

// need another DB for inventory so we can add to it and retrieve from it.
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req,res) {
    res.send("You made it to the inventory service.");
})

// retrieve a specific item back 
app.get('/items/:itemID', function(req, res, next) {
    Item.findById(req.params.itemID)
        .then((item) => {
            res.json(item);
        })
        .catch((error) => {
            res.json(error.message)
        });
})

// add an item to the database.
app.post("/items/:itemID", function (req, res, next) {
    Item.create(req.body)
        .then((item) => {
            res.json(user);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

app.listen(PORT, () => {
    console.log(`Inventory service listening on port ${PORT}`);
});