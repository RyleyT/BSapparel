const fetch = require('node-fetch');
const decoder = require('jwt-decode');
const store = require('store');
const passport = require("passport");
const logger = require("./logController")

module.exports = {
    register: async (req, res) => {
            // Log response with log-service
        let log = {
        service: "Client",
        route: "/register",
        requestId: res.getHeader(`x-request-id`),
        message: "requesting to add new client to user service",
        date: Date.now
      }
      // Send log to log controller
      logger.logResponse(log);
        await fetch('http://localhost:4000/api/user', {
            method: 'POST',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify(req.body)
        })
        .then(apiResponse => apiResponse.json())
        .then(user => {
            console.log(user);
            res.render('login.html');
        })
        .catch((error) => {
            console.log(error);
        })
    },

    login: async (req, res) => {
        console.dir(req.body);
            // Log response with log-service
        let log = {
        service: "Client",
        route: "/register",
        requestId: res.getHeader(`x-request-id`),
        message: "requesting to add new client to user service",
        date: Date.now
      }
      // Send log to log controller
      logger.logResponse(log);
        await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify(req.body)
        })
        .then(apiResponse => apiResponse.json())
        .then(apiJson => {
            var token = apiJson.token;
            store.set('token', token);
            let decoded = decoder(token);
            store.set('user', decoded)
            res.locals.currentUser = decoded;
            store.set('loggedIn', true)
            res.redirect('/profile');
        })
        .catch((error) => {
            console.log(error);
        })
    },

    logout: (req, res) => {
        store.remove('user');
        store.remove('loggedIn');
        store.set('loggedIn', false);
        res.redirect('/')
    },

    edit: async (req, res) => {
        console.log(req.body);
            // Log response with log-service
        let log = {
        service: "Client",
        route: "/register",
        requestId: res.getHeader(`x-request-id`),
        message: "requesting to add new client to user service",
        date: Date.now
      }
      // Send log to log controller
      logger.logResponse(log);
        var userId = store.get('user').userId;
        await fetch(`http://localhost:4000/api/user/${userId}`, {
            method: 'PUT',
            headers: { "content-type": 'application/json', "authorization": store.get('token') },
            body: JSON.stringify(req.body)
        })
        .then(apiResponse => apiResponse.json())
        .then(apiJson => {
            store.set('user', req.body)
            console.log(apiJson);
        })
        .catch((error) => {
            console.log(error);
        })
    },

    search: async (req, res) => {
        console.log(req.body);
            // Log response with log-service
        let log = {
        service: "Client",
        route: "/register",
        requestId: res.getHeader(`x-request-id`),
        message: "requesting to add new client to user service",
        date: Date.now
      }
      // Send log to log controller
      logger.logResponse(log);
        await fetch(`http://localhost:4000/api/search/${req.body.searchBox}`, {
            method: 'GET',
            headers: { "content-type": 'application/json' },
        })
        .then(apiResponse => apiResponse.json())
        .then(apiJson => {
            store.set('items', apiJson);
            res.redirect('/search');
            console.log(apiJson);
        })
        .catch((error) => {
            console.log(error);
        })
    },

    // purchase: async(req, res) => {
    //     console.log(req.body);
    //     await fetch(`http://localhost:4000/api/orders`, {
    //         method: 'POST',
    //         headers: { "content-type": 'application/json' },
    //     })
    //     .then(apiResponse => apiResponse.json())
    //     .then(apiJson => {
    //         console.log(apiJson);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // } 

}