const responseHandler =async (socket, event, data) => {
    // console.log(messageData);
    io.to(data.data.receiver.toString()).emit('res', { event, data })
    socket.emit('res', { event, data })
}

module.exports = responseHandler