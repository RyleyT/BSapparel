const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),

app = http.createServer();

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

const routeResponseMap = { //Define mapping of routes with responses
    "/info": "<h1>Info Page</h1>",
    "/Contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us</h1>",
    "/hello": "<h1>Hello Universe!</h1>",
    "/error": "<h1>Sorry this page does not exist.</h1>",
    "/item": "<h1>Here is your Item</h1>"
};

app.on("request", (req,res) => { //Listen for requests   
    res.writeHead(200, {
        "Content_Type": "text/html"
    });

    if(routeResponseMap[req.url]) {
        res.end(routeResponseMap[req.url]);
    } else {
        res.end("<h1>Welcome!</h1>")
    } 
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);