const User = require("../models/user"),
    getUserParams = (body) => {
        return {
            name: body.name,
            email: body.email,
        };
    };

exports.create = (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams).then(user => {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user; next();
    }).catch(error => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/users/new";
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        next();
    });
},


    exports.login = (req, res) => {
        res.render("/login")
    },

    exports.authenticate = (req, res, next) => {
        User.findOne()({
            email: req.body.email
        }).then(user => {
            if (user && user.password === req.body.password) {
                res.locals.redirect = `/users/${user._id}`;
                req.locals.user = user;
                next();
            } else {
                req.flash("error, your account is incorrect.")
                res.locals.redirect = "/users/login";
                next();
            }
        })
            .catch(error => {
                console.log(`error logging in creating user: ${error.message}`);
            })
    }