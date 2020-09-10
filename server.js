const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),
router = require("./router")
fs = require("fs");

plainTextContentType = {
    "Content-Type": "text/plain"
},
htmlContentType = {
    "Content-Type": "text/html"
},
cssContentType = {
    "Content-Type": "text/css"
},
jsContentType = {
    "Content-Type": "text/javascript"
}
jpgContentType = {
    "Content-Type": "image/jpg"
},
pngContentType = {
    "Content-Type": "image/png"
},


customReadFile = (file, res) => { //A custom read file to reduce repetition
    fs.readFile(`./${file}`, (errors, data) => {
        if(errors) {
            console.log("Error reading the file...");
        }
        res.end(data);
    });
};

router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

// Adds information to the about us page.
router.get("/info", (req,res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile("views/info.html",res);
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

router.get("/sampleImage.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, )
})

router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, plainTextContentType);
    res.end("POSTED");
});

http.createServer(router.handle).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);