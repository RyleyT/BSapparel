const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
    title: {
        required: true,
        trim: true,
        type: String
    },
    description: {
        required: true,
        trim: true,
        type: String
    },
    price: {
        required: true,
        trim: true,
        type: Number
    }
});

const Item = model("Item", ItemSchema);

module.exports = Item;
