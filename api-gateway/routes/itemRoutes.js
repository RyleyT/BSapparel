var express = require('express');
var itemRouter = express.Router();

// define the item route
itemRouter.get('/', (req, res) => {
  // Make item-service request to get all items

});

// define the itemId route
itemRouter.get('/:itemId', (req, res) => {
  // Make item-service request to get item by itemId

});

// define the item route for posting new item
itemRouter.post('/', (req, res) => {
  // Make item-service request to post new item info

});

module.exports = itemRouter