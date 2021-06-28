import Component from './component.js';

export default class MessageRouter extends Component {
  constructor() {
    super();
    this.connection = null;
  }

  listen(connection) {
    this.connection = connection;

    this.connection.onmessage = (event) => {
      console.log('Message received', event.data);
      this.triggerEvent('messageReceived', {
        data: event.data,
        userid: event.userid,
      });
      if (event.data.action) {
        const { action, data } = event.data;
        this.triggerEvent(action, {
          data,
          userid: event.userid,
        });
      }
    };

    this.connection.onstream = (event) => {
      this.triggerEvent('userJoin', {
        video: event.mediaElement,
        name: event.userid,
        id: event.userid,
      });
    };

    // eslint-disable-next-line no-multi-assign
    this.connection.onleave = this.connection.streamended = this.connection.onclose = (event) => {
      this.triggerEvent('userLeave', {
        id: event.userid,
      });
    };
  }

  send(action, data) {
    this.connection.send({ action, data: { ...data, from: this.connection.userid } });
    this.triggerEvent(action, {
      data: { ...data, from: this.connection.userid },
    });
  }
}
