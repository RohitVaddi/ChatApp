const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const User = mongoose.model('Users', userSchema);

function validateUser(user){
    return Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(7).max(20).email().required(),
        password: Joi.string().min(8).max(15).required()
    }).validate(user);
}


module.exports = { User, validateUser }