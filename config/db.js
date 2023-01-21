const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://localhost/ChatApp')
        .then(() => console.log('Connected to database successfully...'))
        .catch(() => console.log('Could not connected to database...'))
}