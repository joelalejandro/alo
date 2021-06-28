import Component from './components/component.js';
import ToggleButton from './components/toggle-button.js';
import MessageRouter from './components/message-router.js';
import WebcamContainer from './components/webcam-container.js';
import WebcamBox from './components/webcam-box.js';
import ChatBox from './components/chat-box.js';
import UserControls from './components/user-controls.js';
import RoomManager from './room-manager.js';

class AloApp extends Component {
  constructor() {
    super();
    this.lobby = new RoomManager();
  }

  onReady() {
    this.lobby.connection.videosContainer = this.ui.webcamContainer;
    this.ui.messageRouter.listen(this.lobby.connection);
    this.start();
  }

  get connection() {
    return this.lobby.connection;
  }

  bindElements() {
    this.registerUiBlocks({
      webcamContainer: 'webcam-container',
      chatBox: 'chat-box',
      userControls: 'user-controls',
      messageRouter: 'message-router',
    });
  }

  bindEvents() {
    /**
     * @type {{
     *  userControls: UserControls,
     *  chatBox: ChatBox,
     *  webcamContainer: WebcamContainer,
     *  messageRouter: MessageRouter
     * }}
     */
    const {
      userControls,
      chatBox,
      webcamContainer,
      messageRouter,
    } = this.ui;

    userControls.addEventListener('audioToggleClicked', ({ detail: { toggled } }) => {
      messageRouter.send(toggled ? 'mute' : 'unmute');
    });
    userControls.addEventListener('videoToggleClicked', ({ detail: { toggled } }) => {
      messageRouter.send(toggled ? 'enableCamera' : 'disableCamera');
    });
    userControls.addEventListener('handToggleClicked', ({ detail: { toggled } }) => {
      messageRouter.send(toggled ? 'raiseHand' : 'lowerHand');
    });
    userControls.addEventListener('shareScreenClicked', () => {
      console.log('Share screen clicked');
    });

    chatBox.addEventListener('sendMessage', (event) => {
      messageRouter.send('chat', { message: event.detail.message });
    });

    messageRouter.addEventListener('chat', ({ detail: { data } }) => {
      chatBox.addMessage(data.message);
    });

    messageRouter.addEventListener('mute', ({ detail: { data } }) => {
      const streamWithToggledMute = this.lobby.getStream(data.from);
      webcamContainer.getWebcam(data.from).setMute(true);
      streamWithToggledMute.mute('audio');
    });

    messageRouter.addEventListener('unmute', ({ detail: { data } }) => {
      const streamWithToggledMute = this.lobby.getStream(data.from);
      webcamContainer.getWebcam(data.from).setMute(false);
      streamWithToggledMute.unmute('audio');
    });

    messageRouter.addEventListener('enableCamera', ({ detail: { data } }) => {
      const streamWithToggledMute = this.lobby.getStream(data.from);
      webcamContainer.getWebcam(data.from).setCamera(true);
      // streamWithToggledMute.unmute('video');
    });

    messageRouter.addEventListener('disableCamera', ({ detail: { data } }) => {
      const streamWithToggledMute = this.lobby.getStream(data.from);
      webcamContainer.getWebcam(data.from).setCamera(false);
      // streamWithToggledMute.mute('video');
    });

    messageRouter.addEventListener('raiseHand', ({ detail: { data } }) => {
      webcamContainer.getWebcam(data.from).setHandRaised(true);
    });

    messageRouter.addEventListener('lowerHand', ({ detail: { data } }) => {
      webcamContainer.getWebcam(data.from).setHandRaised(false);
    });

    messageRouter.addEventListener('userJoin', ({ detail: { video, name, id } }) => {
      webcamContainer.addWebcam({ video, name, id });
    });

    messageRouter.addEventListener('userLeave', ({ detail: { id } }) => {
      webcamContainer.removeWebcam(id);
    });
  }

  start() {
    this.lobby.open('aula');
  }
}

// Register components
customElements.define('toggle-button', ToggleButton);
customElements.define('webcam-box', WebcamBox);
customElements.define('chat-box', ChatBox);
customElements.define('webcam-container', WebcamContainer);
customElements.define('user-controls', UserControls);
customElements.define('message-router', MessageRouter);
customElements.define('alo-app', AloApp);
