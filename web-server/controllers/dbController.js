const User = require('../models/schemas');

module.exports = register = (userName, password, email, address, name) => {
    User.create(
        {
            userName,
            password,
            email,
            address,
            name
        },
        function(error, savedDocument) {
            if(error) console.log(error);
            console.log(savedDocument)
        }
    );
}