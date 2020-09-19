import { getElementCount, getMostRecentElements } from '../database/stats';

export default async function (socket: SocketIO.Socket) {
  // Send the most recent elements when they connect.
  socket.emit('most-recent-elements', await getMostRecentElements(10));

  // Send the total element count when they connect.
  socket.emit('element-count', await getElementCount());
}
