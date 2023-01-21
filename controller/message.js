const responseHandler = require("../middleware/responseHandler");
const { Message } = require("../model/message");

// sendMessage event
const sendMessage = async (data, socket) => {
    try {

        const { id, message } = data;
        const user = socket.handshake.auth.user

        if (user && user.id) {
            const messageData = await Message.create({
                sender: user.id,
                receiver: id,
                message
            });
            // console.log(messageData);
            // console.log((messageData.receiver.toString()));
            // socket.to(messageData.receiver.toString()).emit('res', { data })
            return responseHandler(socket, 'sendMessage', { success: true, message: 'Message sent...', data: messageData });
        }


    } catch (error) {
        return responseHandler(socket, 'sendMessage', { success: false, message: error.message, data: {} });
    }
}


module.exports = { sendMessage }