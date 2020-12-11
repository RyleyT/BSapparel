const express = require("express");
app = express(),
    PORT = process.env.PORT || 6000,
    mongoose = require("mongoose"),
    morgan = require('morgan'),
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

const Item = require("./models/item");
const { json } = require("express");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(appRequestId);
app.use(morgan('Inventory-Service\: :method :url :status :res[content-length] - :response-time ms'));

app
    .get("/api/items", (req, res) => {
        Item.find()
            .then((items) => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with all items in db",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(items);
            })
            .catch((err) => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error: status code 500 unable to get items",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                res.json(err.message);
            });
    })
    // add an item to the database.
    .post("/api/items", function (req, res) {
        Item.create(req.body)
            .then((item) => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/",
                    responseId: res.getHeader(`x-request-id`),
                    message: "creating item in db",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(item);
            })
            .catch((err) => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error: status code 500 unable to create item",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                res.json(err.message);
            });
    });


// retrieve a specific item back 
app
    .get('/api/items/:itemId', function (req, res) {
        Item.findById(req.params.itemId)
            .then((item) => {
                if (item) {
                    // Log response with log-service
                    let log = {
                        service: "Inventory",
                        route: "/api/items/:itemId",
                        responseId: res.getHeader(`x-request-id`),
                        message: "responding with item specified by id",
                        date: Date.now
                    }
                    // Send log to log controller
                    logger.logResponse(log);
                    res.json(item);
                }
                else {
                    // Log response with log-service
                    let log = {
                        service: "Inventory",
                        route: "/api/items/:itemId",
                        responseId: res.getHeader(`x-request-id`),
                        message: "responding with error: unable to get item with specified id",
                        date: Date.now
                    }
                    // Send log to log controller
                    logger.logResponse(log);
                    res.json("item not found");
                }
            })
            .catch((error) => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/:itemId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error: status code 500 unable to retrieve item",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                res.json(error.message)
            });
    })
    // update item by id
    .put("/api/items/:itemId", (req, res) => {
        const updateItem = Item.findById(req.params.itemId);
        Item.update(updateItem, req.body)
            .then(updateData => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/:itemId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "updating item specified by id",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(updateData)
            })
            .catch(err => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/:itemId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error: status code 500 unable to retrieve item for update",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                res.json(err);
            });

    })
    //delete item by id
    .delete("/api/items/:itemId", (req, res) => {
        Item.findByIdAndDelete(req.params.itemId)
            .then(itemData => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/:itemId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "deleting item specified by id",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(itemData);
            })
            .catch(err => {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/:itemId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error: status code 500 unable to retrieve item for delete",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                res.json(err.message);
            });
    });

app.get('/api/search/:searchBox', function (req, res, next) {
    // var query = String(req.originalUrl);
    // query = query.substring(29); // Remove the path /api/items/search/?searchBox=
    // query = query.replace("+", " "); // if they search for something with a space the url is appended with + so remove that

    //var response = "<form action= \"http://localhost:7000/api/orders\" method=\"GET\" id=\"myform\"</form><table style=\"width:75%\"><th style=\"text-align:left\">Item</th><th style=\"text-align:left\">Price</th><th style=\"text-align:left\">Description</th></th><th style=\"text-align:left\">Purchase</th>";
    console.log(req.body);

    Item.find( {title: req.params.searchBox} )
        .then((items) => {
            if (items) {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/search",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with list of items specified by search",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                // item.forEach(indivItem => {
                //     response += `<tr> <td>${indivItem.title}</td> <td>$${indivItem.price}</td> <td>${indivItem.description}</td><td><button type=\"button\" form=\"myform\">Purchase</button></tr>`;
                // });
                // response += '</table>'
                console.log(items);
                res.json(items);             
            }
            else {
                // Log response with log-service
                let log = {
                    service: "Inventory",
                    route: "/api/items/:itemId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error: no items found by search",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                res.json("item not found");
            }
        })
        .catch((error) => {
            // Log response with log-service
            let log = {
                service: "Inventory",
                route: "/api/items/:itemId",
                responseId: res.getHeader(`x-request-id`),
                message: "responding with error: status code 500 unable to search items",
                date: Date.now
            }
            // Send log to log controller
            logger.logResponse(log);
            res.json(error.message)
        });
});

app.listen(PORT, () => {
    console.log(`Inventory service listening on port ${PORT}`);
});