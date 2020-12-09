const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-parser'); // testing

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
});

const Item = require("./models/item");
const { json } = require("express");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('Inventory-Service\: :method :url :status :res[content-length] - :response-time ms'));

app.get("/api/items", (req, res) => {
    Item.find()
        .then((items) => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "Inventory",
                route: "/api/items",
                // reponseId: res.ID,
                message: "returning all items in db.",
                date: Date.now
            }
            console.log(log);
            // Send to log-service
            // fetch(logUrl, log);

            res.json(items);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

/*
// retrieve a specific item back 
app.get('/api/items/:itemID', function(req, res) {
    Item.findById(req.params.itemID)
        .then((item) => {
            if(item) res.json(item);
            else res.json("item not found");
        })
        .catch((error) => {
            res.json(error.message)
        });
});
*/

app.get('/api/items/search', function(req, res, next) {
    var query = String(req.originalUrl); 
    query = query.substring(29); // Remove the path /api/items/search/?searchBox=
    query = query.replace("+", " "); // if they search for something with a space the url is appended with + so remove that

    var response = "<form action= \"http://localhost:7000/api/orders\" method=\"GET\" id=\"myform\"</form><table style=\"width:75%\"><th style=\"text-align:left\">Item</th><th style=\"text-align:left\">Price</th><th style=\"text-align:left\">Description</th></th><th style=\"text-align:left\">Purchase</th>";

    Item.find({title: query})
        .then((item) => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "Inventory",
                route: "/api/items/search",
                // reponseId: res.ID,
                message: "returning searched itmes from db.",
                date: Date.now
            }
            console.log(log);
            // Send to log-service
            // fetch(logUrl, log);

            if(item)
            {
                item.forEach(indivItem =>{
                    response += `<tr> <td>${indivItem.title}</td> <td>$${indivItem.price}</td> <td>${indivItem.description}</td><td><button type=\"button\" form=\"myform\">Purchase</button></tr>`;
                });
                response += '</table>'
                res.send(response); // doesnt work like I want on button press because sending a response back. 
                //res.send(JSON.stringify(item, null, 2));
            } 
            else 
            {
                res.json("item not found");
            }
        })
        .catch((error) => {
            res.json(error.message)
        });
});

// add an item to the database.
app.post("/api/items", function (req, res) {
    Item.create(req.body)
        .then((item) => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "Inventory",
                route: "/api/items",
                // reponseId: res.ID,
                message: "creating new item in db.",
                date: Date.now
            }
            console.log(log);
            // Send to log-service
            // fetch(logUrl, log);

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
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "Inventory",
                route: "/api/items/:itemId",
                // reponseId: res.ID,
                message: "updating item in db.",
                date: Date.now
            }
            console.log(log);
            // Send to log-service
            // fetch(logUrl, log);

            res.json(updateData)
        })
        .catch(err => {
            res.json(err);
        });

});

app.delete("/api/items/:itemId", (req, res) => {
    Item.findByIdAndDelete(req.params.itemId)
        .then(itemData => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "Inventory",
                route: "/api/items/:itemId",
                // reponseId: res.ID,
                message: "deleting item in db.",
                date: Date.now
            }
            console.log(log);
            // Send to log-service
            // fetch(logUrl, log);

            res.json(itemData);
        })
        .catch(err => {
            res.json(err.message);
        });
});

app.listen(PORT, () => {
    console.log(`Inventory service listening on port ${PORT}`);
});