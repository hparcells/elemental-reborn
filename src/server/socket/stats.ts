import { getMostRecentElements } from '../database/stats';

export default async function (socket: SocketIO.Socket) {
  // Send the most recent elements when they connect.
  socket.emit('most-recent-elements', await getMostRecentElements(10));
}
