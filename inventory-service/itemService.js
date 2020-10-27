const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;
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

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/items", (req, res) => {
    Item.find()
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

// retrieve a specific item back 
app.get('/api/items/:itemID', function(req, res, next) {
    Item.findById(req.params.itemID)
        .then((item) => {
            if(item) res.json(item);
            else res.json("item not found");
        })
        .catch((error) => {
            res.json(error.message)
        });
});

// add an item to the database.
app.post("/api/items", function (req, res) {
    Item.create(req.body)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

app.put("/api/items/:itemId", (req, res) => {
    const updateItem = Item.findById(req.params.itemId);
    Item.update(updateItem, req.body)
        .then(updateData => {
            res.json(updateData)
        })
        .catch(err => {
            res.json(err);
        });

});

app.delete("/api/items/:itemId", (req, res) => {
    Item.findByIdAndDelete(req.params.itemId)
        .then(itemData => {
            res.json(itemData);
        })
        .catch(err => {
            res.json(err.message);
        });
});

app.listen(PORT, () => {
    console.log(`Inventory service listening on port ${PORT}`);
});