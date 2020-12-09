const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const morgan = require('morgan');
// const bodyParser = require('body-parser'); // testing
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth');

// Setting up proxy server to listen for api-gateway.
var http = require('http');

server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
    console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
});

const User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('User-Service\: :method :url :status :res[content-length] - :response-time ms'));

app.get("/api/user", (req, res) => {
    User.find()
        .then((Users) => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "User",
                route: "/api/user",
                // reponseId: res.ID,
                message: "returning all users in db.",
                date: Date.now
            }
            console.log(log);

            res.json(Users);
        })
        .catch((err) => {
            res.json(err.message);
        });
});

app.get("/api/user/:userId", auth, (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "User",
                route: "/api/user/:userId",
                // reponseId: res.ID,
                message: "returning user specified by id in db.",
                date: Date.now
            }
            console.log(log);

            res.json(user);
        })
        .catch(err => {
            res.json(err.message);
        });
});

app.post("/api/user", (req, res) => {
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
                return res.status(409).json({
                    message: 'Unable to create user with provided information'
                });
            } else {
                // salt and hash password for db storing
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
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
                                // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

                                // Log response with log-service
                                let log = {
                                    service: "User",
                                    route: "/api/user",
                                    // reponseId: res.ID,
                                    message: "creating new user in db.",
                                    date: Date.now
                                }
                                console.log(log);

                                res.status(201).json({
                                    message: 'User created'
                                }, result);
                            })
                            .catch(error => {
                                res.status(500).json(error.message);
                            });
                    }
                });
            }
        });
    // User.create(req.body)
    //     .then(user => {
    //         res.json(user);
    //     })
    //     .catch(err => {
    //         res.json(err.message);
    //     });
});

app.post("/api/user/login", (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            } else {
                // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user/login",
                    // reponseId: res.ID,
                    message: "returning user specified by login credentials",
                    date: Date.now
                }
                console.log(log);

                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if(result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                            username: user[0].username
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
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
})

app.put("/api/user/:userId", auth, (req, res) => {
    updateUser = User.findById(req.params.userId);
    User.update(updateUser)
        .then(user => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "User",
                route: "/api/user/:userId",
                // reponseId: res.ID,
                message: "updating user specified by id in db.",
                date: Date.now
            }
            console.log(log);

            res.json(user)
        })
        .catch(err => {
            res.json(err);
        });

});

app.delete("/api/user/:userId", auth, (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then(user => {
            // res.setHeader("ID", Math.random() * (1000000 - 100) + 100);

            // Log response with log-service
            let log = {
                service: "User",
                route: "/api/user/:userId",
                // reponseId: res.ID,
                message: "deleting user specified by id in the db",
                date: Date.now
            }
            console.log(log);
            
            res.json(user);
        })
        .catch(err => {
            res.json(err.message);
        });
});

app.listen(PORT, () => {
    console.log(`User-service listening on port ${PORT}`);
});