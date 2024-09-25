const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Initializes socket.io on the server

app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('newuser', (username) => {
        socket.broadcast.emit('update', `${username} joined the conversation`);
    });

    socket.on('exituser', (username) => {
        socket.broadcast.emit('update', `${username} left the conversation`);
    });

    socket.on('chat', (message) => {
        socket.broadcast.emit('chat', message);
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
