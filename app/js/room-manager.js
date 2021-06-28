/* globals RTCMultiConnection */
import Room from './room.js';

const createConnection = () => {
  const connection = new RTCMultiConnection();
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  connection.session = {
    audio: true,
    video: true,
    data: true,
  };
  connection.enableLogs = false;
  return connection;
};

export default class RoomManager {
  constructor() {
    this.connection = createConnection();
    this.rooms = {};
  }

  open(id) {
    if (this.rooms[id]) {
      return this.rooms[id];
    }

    const room = new Room(this.connection);
    room.open(id);
    this.rooms[id] = room;
    return room;
  }

  getStream(id) {
    return this.connection.streamEvents.selectFirst({
      userid: id,
    }).stream;
  }
}
