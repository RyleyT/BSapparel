const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        required: true,
        trim: true,
        type: String
    },
    username: {
        required: true,
        trim: true,
        type: String
    },
    password: {
        required: true,
        trim: true,
        type: String
    },
    email: {
        required: true,
        trim: true,
        type: String
    },
    address: {
        required: true,
        trim: true,
        type: String
    }
}, {
    timestamps: true
});

UserSchema.methods.getInfo = function () {
    return `Name: ${this.name} Email: ${this.email} address: ${this.address}`;
}

const User = model("User", UserSchema);

module.exports = User;
