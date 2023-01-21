const responseHandler = require("../middleware/responseHandler");
const { User, validateUser } = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.JWTPRIVATEKEY

// user registration event
const register = async (data, socket) => {

    try {
        const { firstName, lastName, email, password } = data;

        const { error } = validateUser(data);
        if (error) return responseHandler(socket, 'register', { success: false, message: error.details[0].message, data: {} });

        const oldData = await User.findOne({ email });
        if (oldData) return responseHandler(socket, 'register', { success: false, message: 'User already exists...', data: {} });

        const encryptedPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        });

        const payloadData = { firstName, lastName, email }
        return responseHandler(socket, 'register', { success: true, message: 'User register successfully...', data: payloadData });

    } catch (error) {

        return responseHandler(socket, 'register', { success: false, message: error.message, data: {} });
    }
}


// user login event
const login = async (data, socket) => {

    try {

        const { email, password } = data;
        const userData = await User.findOne({ email });
        if (!userData) return responseHandler(socket, 'login', { success: false, message: 'Incorrect email or password', data: {} });

        if (await bcrypt.compare(password, userData.password)) {
            const token = jwt.sign({ id: userData._id, email: email }, SECRETKEY);
            const payloadData = {
                id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email,
                token
            }
            return responseHandler(socket, 'login', { success: true, message: 'User login successfully...', data: payloadData });
        }
        else {
            return responseHandler(socket, 'login', { success: false, message: 'Incorrect email or password', data: {} });
        }

    } catch (error) {

        return responseHandler(socket, 'login', { success: false, message: error.message, data: {} });
    }
}


module.exports = { register, login };