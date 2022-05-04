const { socket } = require('../../config/socket');

function eventCreateMessage(Message) {
  socket.io.emit('Message:create', Message);
}

function eventReceivedMessage(Messages) {
  socket.io.emit('Message:getAll', Messages);
}

function eventUpdateMessage(Message) {
  socket.io.emit('Message:update', Message);
}

function eventDeleteMessage(Message) {
  socket.io.emit('Message:delete', Message);
}

module.exports = {
  eventCreateMessage,
  eventReceivedMessage,
  eventUpdateMessage,
  eventDeleteMessage,
};
