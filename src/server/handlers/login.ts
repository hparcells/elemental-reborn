import { io } from 'fullstack-system';

export default function (socket: SocketIO.Socket) {
  io.sockets.emit('player-count', Object.keys(io.sockets.sockets).length);

  socket.on('disconnect', () => {
    // Update th player count for everyone else.
    io.sockets.emit('player-count', Object.keys(io.sockets.sockets).length);
  });
}
