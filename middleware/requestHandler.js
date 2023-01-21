const { sendMessage } = require("../controller/message");
const { register, login } = require("../controller/user");
const auth = require("./auth");

const requestHandler = async(eventName, data, socket) =>{

    const {token} = data

    switch (eventName) {
        case 'register':
            await register(data, socket);
            break;

        case 'login':
            await login(data, socket);
            break;

        case 'sendMessage':
            await auth(socket, token);
            await sendMessage(data, socket);
            break
    
        default:
            break;
    }

}

module.exports = requestHandler