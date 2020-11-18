var express = require('express');
var itemRouter = express.Router();

const apiAdapter = require('../apiAdapter');
const itemServiceUrl = "http://localhost:6000";
const itemService = apiAdapter(itemServiceUrl);

// define the item route
itemRouter.get('/api/items', (req, res) => {
  // Make item-service request to get all items
  itemService.get(req.path)
    .then(resp => {
      res.json(resp.data);
    }).catch(error => {
      res.json(error);
    });
});

// define the itemId route
itemRouter.get('/api/items/:itemId', (req, res) => {
  // Make item-service request to get item by itemId
  itemService.get(req.path)
        .then(resp => {
            res.json(resp.data);
        }).catch(error => {
            res.json(error);
        });
});

// define the item route for posting new item
itemRouter.post('/api/items', (req, res) => {
  // Make item-service request to post new item info
  itemService.post(req)
        .then(resp => {
            res.json(resp.data);
        }).catch(error => {
            res.json(error);
        });
});

//define user update route
itemRouter.put('/api/items/:itemId', (req, res) => {
  //Make inventory-service request to update item by Id
  itemService.put(req)
      .then(resp => {
          res.json(resp);
      })
      .catch(err => { 
          res.json(err);
      });
});

//define delete item route
itemRouter.delete('/api/items/:itemId', (req, res) => {
  //Make inventory-service request to update item by Id
  itemService.delete(req.path)
      .then(resp => {
          res.json(resp); //sends back an empty object
      })
      .catch(err => { 
          res.json(err);
      });
});

module.exports = itemRouter