export default class Room {
  constructor(connection) {
    this.connection = connection;
  }

  open(id) {
    this.connection.openOrJoin(id);
  }
}
