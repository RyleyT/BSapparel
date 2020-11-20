const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        // Get the incoming request token from headers.authorization
        const token = req.headers.authorization;
        // Decode the incoming request token
        const decodedToken = jwt.verify(token, "thisI$th3$3cretSTRING");
        // add a new field to the request for the next handlers
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}