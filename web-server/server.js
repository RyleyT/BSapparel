const express = require('express');
path = require('path'),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    errorHandler = require('./controllers/errorHandler'),
    router = require('./router');
    //appid = process.env.APPID;

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
app.use('/login', router);
app.use('/profile', router);
app.use('/edit', router);

//MICROSERVICE TESTING
// app.get('/app1', (req, res) => {
//     res.send(`appid: ${appid} app1 page: says hello!`)
// });
// app.get('/app2', (req, res) => {
//     res.send(`appid: ${appid} app2 page: says hello!`)
// });
// app.get('/admin', (req, res) => {
//     res.send(`appid: ${appid} admin page: very few people should see this`)
// });


//Middleware
app.use(errorHandler.respondPageNotFound);
app.use(errorHandler.respondInternalError);

//Start application
app.listen(app.get('port'), () =>  {
    console.log(`Express started on http://localhost: ${app.get('port')} press Ctrl-C to terminate.`);
});


