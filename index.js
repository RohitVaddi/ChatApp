const express = require('express');
const app = express();
require('dotenv').config();
const server = require('http').createServer();
const io = require('socket.io')(server);
const requestHandler = require('./middleware/requestHandler');
app.use(express.json());

// database connection
require('./config/db')();

// Socket Connection
io.on('connection', async(socket) =>{
    socket.onAny((eventName, ...args) =>{
        global.io = io;
        requestHandler(eventName, args[0], socket, io);
    });
    // socket.on('disconnect', () =>{
    //     console.log('Socket disconnected...');
    // });
});


// Listening server
const port = process.env.PORT;
server.listen(port, () =>{
    console.log(`Server listening on port: ${port}`);
})