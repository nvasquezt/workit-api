const socketio = require('socket.io');

const socket = {};

function connectSocket(server) {
  const options = {
    cors: {
      origin: true,
    },
  };
  const io = socketio(server, options);
  io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })});
  socket.io = io;
}

module.exports = {
  connectSocket,
  socket,
};
