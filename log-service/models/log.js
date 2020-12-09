const { Schema, model } = require("mongoose");

const LogSchema = new Schema({
    service: { type: String, required: true },
    route: {type: String, required: true},
    requestId?: {type: String},
    responseId?: {type: String},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const Log = model("Log", LogSchema);

module.exports = Log;