const express = require('express'),
    router = require('./router'),
    path = require('path'),
    layouts = require('express-ejs-layouts'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    expressValidator = require('express-validator'),
    cors = require('cors'),
    passport = require("passport"),
    connectFlash = require('connect-flash'),
    methodOverride = require('method-override'),
    addRequestId = require('express-request-id')();  

let app = express();
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '/public')));
app.use(layouts);
app.use(express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(cors());


///Sessions and cookies added here
// app.use(cookieParser("secret_passcode"));
// app.use(expressSession({
//   secret: "secret_passcode",
//   cookie: {
//     maxAge: 400000
//   },
//   resave: false,
//   saveUninitalized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use(expressValidator());

app.use(connectFlash()); //Use connect-flash to enable flash messages
app.use(addRequestId); //Add request Id
// app.use((req, res, next) => { //Middleware function to pass local variables to views
//   // res.locals.flashMessages = req.flash();
//   res.locals.loggedIn = req.isAuthenticated();
//   res.locals.currentUser = req.user;
//   next();
// });

//Routes
app.use('/', router);
app.use('/info', router);
app.use('/register', router);
app.use('/login', router);
app.use('/users', router)
app.use('/profile', router);
app.use('/edit', router);
app.use('/search', router);

//Middleware
// app.use(errorHandler.logErrors);
// app.use(errorHandler.respondPageNotFound);
// app.use(errorHandler.respondInternalError);

//Start application
app.listen(app.get('port'), () => {
    console.log(`Web-server started on http://localhost: ${app.get('port')} press Ctrl-C to terminate.`);
});


