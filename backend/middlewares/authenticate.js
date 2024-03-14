const jwt = require('jsonwebtoken');
const errorHandler = require('../utilities/errorHandler');

const authenticate = (request, response, next) => {
    const token = request.cookies.user_token;

    if (!token) throw errorHandler(401, 'Unauthorized');

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) throw errorHandler(401, 'Unauthorized');
        request.user = decoded;
        next();
    })
};

module.exports = authenticate;