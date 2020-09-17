import { io } from 'fullstack-system';

export default function (socket: SocketIO.Socket) {
  // Send the current player count when someone connects.
  io.sockets.emit('player-count', Object.keys(io.sockets.sockets).length);

  socket.on('disconnect', () => {
    // Update the player count for everyone else.
    io.sockets.emit('player-count', Object.keys(io.sockets.sockets).length);
  });
}
