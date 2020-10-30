const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
    name: {
        // required: true,
        trim: true,
        type: String
    },
    username: {
        // required: true,
        trim: true,
        type: String
    },
    email: {
        // required: true,
        trim: true,
        type: String
    },
    address: {
        // required: true,
        trim: true,
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

const User = model("User", UserSchema);

module.exports = User;
