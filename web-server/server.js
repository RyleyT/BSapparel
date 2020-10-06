const express = require('express');
    path = require('path'),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    errorHandler = require('./controllers/errorHandler'),
    router = require('./router'),
   // APIgateway = require('../api-gateway');

    //DB connection
    mongoose.connect("mongodb+srv://ryleyt:1qaz@cluster0.h0wyn.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true});
    const db = mongoose.connection;
    
    let app = express();
    
    app.set('views', (path.join(__dirname, '/views')));
    app.set('view engine', 'ejs');
    app.engine('.html', require('ejs').renderFile);
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(layouts);
    app.use(express.urlencoded({ //Added body-parser for processing URL-encoded and json parameters
        extended: false
        })
    );
    app.use(express.json());
    
    //Routes
    app.use('/', router);
    app.use('/info', router);
    app.use('/register', router);
    app.use('/login',router);
    app.use('/profile',router);
    app.use('/edit',router);

    //Middleware
    app.use(errorHandler.respondPageNotFound);
    app.use(errorHandler.respondInternalError);
    
    //Start application
    app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
    });

    
