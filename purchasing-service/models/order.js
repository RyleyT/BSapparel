const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{type: Schema.Types.ObjectId, ref: 'Item', required: true}],
    total: {
        required: true,
        trim: true,
        type: Number
    },
    date: {type: Date, default: Date.now}
});

const Order = model("Order", OrderSchema);

module.exports = Order;