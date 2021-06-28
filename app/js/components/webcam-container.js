import Component from './component.js';

const WEBCAM_CONTAINER_TEMPLATE = `
  <style>
    :host {
      padding: 10px;
      background: #eee;
      display: block;
    }

    main {
      display: grid;
      grid-auto-flow: columns;
      gap: 10px;
    }
  </style>
  <main></main>
`;

export default class WebcamContainer extends Component {
  constructor() {
    super({ template: WEBCAM_CONTAINER_TEMPLATE });

    this.webcams = {};
  }

  bindElements() {
    this.registerUiBlock('container', 'main');
  }

  addWebcam({
    /** @type {HTMLVideoElement} */ video,
    /** @type {string} */ name,
    /** @type {string} */ id,
  }) {
    /**
     * @type {{container: HTMLElement}}
     */
    const { container } = this.ui;

    /**
     * @type {import('./webcam-box').default} WebcamBox
     */
    const webcamBox = document.createElement('webcam-box');
    webcamBox.setVideo(video);
    webcamBox.setPersonName(name);
    container.appendChild(webcamBox);

    this.webcams[id] = webcamBox;
  }

  removeWebcam(id) {
    if (!this.webcams[id]) {
      return;
    }

    this.webcams[id].remove();
    delete this.webcams[id];
  }

  getWebcam(id) {
    return this.webcams[id];
  }
}
