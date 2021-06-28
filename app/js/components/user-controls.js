import Component from './component.js';

const USER_CONTROLS_TEMPLATE = `
  <style>
    :host {
      display: block;
    }
  </style>
  <section>
    <toggle-button id="audio" toggle-text="Mute" untoggle-text="Unmute">Mute</toggle-button>
    <toggle-button id="video" toggled toggle-text="Disable camera" untoggle-text="Enable camera">Disable camera</toggle-button>
    <toggle-button id="hand" toggle-text="Raise your hand" untoggle-text="Stop raising your hand">Raise your hand</toggle-button>
    <button id="shareScreen">Share my screen</button>
  </section>
`;

export default class UserControls extends Component {
  constructor() {
    super({ template: USER_CONTROLS_TEMPLATE });
  }

  bindElements() {
    this.registerUiBlocks({
      controlsContainer: 'section',
      audioToggle: '#audio',
      videoToggle: '#video',
      handToggle: '#hand',
      shareScreen: '#shareScreen',
    });
  }

  bindEvents() {
    /**
     * @type {{
     *  audioToggle: HTMLButtonElement,
     *  videoToggle: HTMLButtonElement,
     *  handToggle: HTMLButtonElement,
     *  shareScreen: HTMLButtonElement
     * }}
     */
    const {
      audioToggle,
      videoToggle,
      handToggle,
      shareScreen,
    } = this.ui;

    audioToggle.addEventListener('toggleChanged', ({ detail: { toggled } }) => this.triggerEvent('audioToggleClicked', { toggled }));
    videoToggle.addEventListener('toggleChanged', ({ detail: { toggled } }) => this.triggerEvent('videoToggleClicked', { toggled }));
    handToggle.addEventListener('toggleChanged', ({ detail: { toggled } }) => this.triggerEvent('handToggleClicked', { toggled }));
    shareScreen.addEventListener('click', () => this.triggerEvent('shareScreenClicked'));
  }
}
