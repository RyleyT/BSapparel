const passport = require("passport");

const User = require("../models/user"),
    getUserParams = (body) => {
        return {
            name: body.name,
            username: body.username,
            email: body.email,
            address: body.address
        };
    };


module.exports = {

    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "failed to login",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    create: (req, res, next) => {
        if (req.skip) next();
        let newUser = new User(getUserParams(req.body))
        User.register(newUser, req.body.password, (e, user) => {
            if (user) {
                req.flash("success", `${user.username}'s account created successfully!`);
                res.locals.redirect = "users";
                res.locals.user = user;
                next();
            } else {
                req.flash("error", `Failed to create user account because: ${e.message}.`);
                res.locals.redirect = "register";
                next();
            }
        })
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by Id: ${error.message}`)
                next(error);
            })
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/edit", {
                    user: user
                });
            })
            .catch(error => {
                console.log(`Error fetching user by Id: ${error.message}`);
                next(error);
            });
    },

    index: (req, res, next) => {

        User.find()
            .then(users => {
                res.locals.users = users;
                res.render("users/users.ejs")
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            })
    },

    indexView: (req, res) => {
        res.render("users/users.ejs");
    },

    login: (req, res) => {
        console.log("login page called");
        res.render("users/login");
    },

    logout: (req, res) => {
        console.log("logout called");
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },

    new: (req, res) => {
        res.render("users/new")
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    show: (req, res, next) => {
        var userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by Id: ${error.message}`);
                next(error);
            })
    },

    showView: (req, res) => {
        res.render("users/show.ejs");
    },

    update: (req, res, next) => {
        let userId = req.params.id;
        userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `/users`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by Id: ${error.message}`);
                next(error);
            })
    },

    validate: (req, res, next) => {
        req
            .sanitizeBody("email")
            .normalizeEmail({
                all_lowercase: true
            })
            .trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = '/register';
                next();
            } else {
                next();
            }
        });
    }
}
