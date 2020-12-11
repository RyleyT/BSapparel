const express = require("express"),
    app = express(),
    PORT = process.env.PORT || 5000,
    mongoose = require("mongoose"),
    morgan = require('morgan'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    auth = require('./auth'),
    appRequestId = require('express-request-id')(),
    logger = require('./logController');

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
    console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
});

const User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/BSapparel?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('User-Service\: :method :url :status :res[content-length] - :response-time ms'));
app.use(appRequestId);

app
    .get("/api/user", (req, res) => {
        User.find()
            .then((Users) => {

                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with all users",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(Users);
            })
            .catch((err) => {
                res.json(err.message);
            });
    })
    .post("/api/user", (req, res) => {
        /*
            console.log(req.body);
            User.create(req.body)
                .then(user => {
                    //res.json(user);
                    res.redirect('http://localhost:3000/login'); // send them to the login page instead of printing their json data back.
                })
                .catch(err => {
                    res.json(err.message);
        */
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    // Log response with log-service
                    let log = {
                        service: "User",
                        route: "/api/user/",
                        responseId: res.getHeader(`x-request-id`),
                        message: "responding with error: unable to create user with provided info",
                        date: Date.now
                    }
                    // Send log to log controller
                    logger.logResponse(log);

                    return res.status(409).json({
                        message: 'Unable to create user with provided information'
                    });
                } else {
                    // salt and hash password for db storing
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) {
                            // Log response with log-service
                            let log = {
                                service: "User",
                                route: "/api/user/",
                                responseId: res.getHeader(`x-request-id`),
                                message: "responding with error: status code 500 creating user",
                                date: Date.now
                            }
                            // Send log to log controller
                            logger.logResponse(log);
                            return res.status(500).json(err.message)
                        } else {
                            const user = new User({
                                email: req.body.email,
                                name: req.body.name,
                                password: hash,
                                username: req.body.username,
                                address: req.body.address,
                            })
                            user.save()
                                .then(result => {
                                    // Log response with log-service
                                    let log = {
                                        service: "User",
                                        route: "/api/user/",
                                        responseId: res.getHeader(`x-request-id`),
                                        message: "created new user instance in db",
                                        date: Date.now
                                    }
                                    // Send log to log controller
                                    logger.logResponse(log);

                                    res.status(201).json({
                                        message: 'User created'
                                    }, result);
                                })
                                .catch(error => {
                                    // Log response with log-service
                                    let log = {
                                        service: "User",
                                        route: "/api/user/",
                                        responseId: res.getHeader(`x-request-id`),
                                        message: "responding with error: status code 500 creating user",
                                        date: Date.now
                                    }
                                    // Send log to log controller
                                    logger.logResponse(log);
                                    res.status(500).json(error.message);
                                });
                        }
                    });
                }
            });
    });

app
    .get("/api/user/:userId", auth, (req, res) => {
        User.findById(req.params.userId)
            .then(user => {
                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user/:userId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with user specified by id",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(user);
            })
            .catch(err => {
                res.json(err.message);
            });
    })
    .put("/api/user/:userId", auth, (req, res) => {
        updateUser = User.findById(req.params.userId);
        User.update(updateUser, req.body)
            .then(user => {
                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user/:userId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "updating user specified by id",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(user)
            })
            .catch(err => {
                res.json(err);
            });

    })
    .delete("/api/user/:userId", auth, (req, res) => {
        User.findByIdAndDelete(req.params.userId)
            .then(user => {
                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user/:userId",
                    responseId: res.getHeader(`x-request-id`),
                    message: "deleting user specified by id",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(user);
            })
            .catch(err => {
                res.json(err.message);
            });
    });

app.post("/api/user/login", (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user/login",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with error, login unsuccessful",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);
                return res.status(401).json({
                    message: "Auth failed"
                });
            } else {

                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        // Log response with log-service
                        let log = {
                            service: "User",
                            route: "/api/user/login",
                            responseId: res.getHeader(`x-request-id`),
                            message: "responding with user specified by credentials",
                            date: Date.now
                        }
                        // Send log to log controller
                        logger.logResponse(log);

                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                            username: user[0].username,
                            address: user[0].address,
                            name: user[0].name
                        },
                            "thisI$th3$3cretSTRING",
                            {
                                expiresIn: "1h"
                            });
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                    // Log response with log-service
                    let log = {
                        service: "User",
                        route: "/api/user/login",
                        responseId: res.getHeader(`x-request-id`),
                        message: "responding with error, login unsuccessful",
                        date: Date.now
                    }
                    // Send log to log controller
                    logger.logResponse(log);
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                })
            }
        })
        .catch(error => {
            // Log response with log-service
            let log = {
                service: "User",
                route: "/api/user/login",
                responseId: res.getHeader(`x-request-id`),
                message: "responding with error, login unsuccessful",
                date: Date.now
            }
            // Send log to log controller
            logger.logResponse(log);
            res.status(500).json({
                message: error.message
            });
        });
});

app.listen(PORT, () => {
    console.log(`User-service listening on port ${PORT}`);
});