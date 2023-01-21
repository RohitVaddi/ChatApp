const jwt = require('jsonwebtoken');
const responseHandler = require('./responseHandler');
require('dotenv').config();
const JWTPRIVATEKEY = process.env.JWTPRIVATEKEY;


module.exports = async function (socket, token) {

    try {

        let authToken = socket.handshake.headers.token

        if (!authToken) {
            socket.handshake.auth.user = {}
            return responseHandler(socket, '', { success: false, message: 'Token is require for authentication', data: {} });
        }

        const decoded = jwt.verify(authToken, JWTPRIVATEKEY);
        if (decoded) return socket.handshake.auth.user = decoded

        if (!decoded) {
            socket.handshake.auth.user = {}
            return responseHandler(socket, '', { success: false, message: 'Invalid token', data: {} });
        }

    } catch (error) {
        socket.handshake.auth.user = {}
        return responseHandler(socket, '', { success: false, message: 'Invalid token', data: {} });
    }
}