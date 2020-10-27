const express = require('express'),
    router = require('./router'),
    path = require('path'),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    errorHandler = require('./controllers/errorHandler'),
    connectFlash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

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

//Adding on sessions and flash messages
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 400000
    },
    resave: false,
    saveUninitalized: false
}));
router.use(connectFlash());

//Routes
app.use('/', router);
app.use('/info', router);
app.use('/register', router);
app.use('/login', router);
app.use('/profile', router);
app.use('/edit', router);

//Middleware
app.use(errorHandler.respondPageNotFound);
app.use(errorHandler.respondInternalError);

//Start application
app.listen(app.get('port'), () =>  {
    console.log(`Web-server started on http://localhost: ${app.get('port')} press Ctrl-C to terminate.`);
});


