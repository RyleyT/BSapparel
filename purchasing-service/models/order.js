const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    total: {
        required: true,
        trim: true,
        type: Number
    },
    date: Date.now()
});

const Order = model("Order", OrderSchema);

module.exports = Order;