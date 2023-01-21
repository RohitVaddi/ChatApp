const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    message: {
        type: String,
        require: true
    }
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = { Message }