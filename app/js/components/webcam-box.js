import Component from './component.js';

const WEBCAM_BOX_TEMPLATE = `
  <style>
    :host {
      box-sizing: border-box;
      display: block;
      position: relative;
    }

    #video-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    #video-placeholder {
      position: absolute;
      display: none;
      place-items: center;
      background: #000;
      width: 100%;
      height: 100%;
    }

    #video-placeholder.visible {
      display: grid;
    }

    #avatar {
      border-radius: 50%;
      padding: 10px;
      background: #333;
    }

    #person-name {
      position: absolute;
      left: 0;
      bottom: 5px;
      z-index: 10;
      background: #000;
      color: #fff;
      font-size: 14px;
      display: grid;
      padding: 10px;
    }

    #controls {
      position: absolute;
      right: 0;
      bottom: 5px;
      z-index: 10;
      background: #000;
      padding: 10px;
      display: none;
    }
  </style>
  <div id="video-container">
    <div id="person-name">
      <span id="icon"></span>
      <span id="name"></span>
    </div>
    <div id="controls">
      <button id="mute">Mute</button>
    </div>
    <div id="video-placeholder">
      <div id="avatar">👤</div>
    </div>
  </div>
`;

export default class WebcamBox extends Component {
  constructor() {
    super({ template: WEBCAM_BOX_TEMPLATE });

    this.isMuted = false;
    this.isRaisingHand = false;
    this.showCamera = true;
  }

  bindElements() {
    this.registerUiBlocks({
      videoContainer: '#video-container',
      videoPlaceholder: '#video-placeholder',
      personName: '#person-name',
      controls: '#controls',
      mute: '#mute',
      name: '#name',
      icon: '#icon',
    });
  }

  bindEvents() {
    this.onmouseover = () => this.showControls();
    this.onmouseout = () => this.showControls(false);
  }

  showControls(visible = true) {
    /**
     * @type {{controls: HTMLDivElement}}
     */
    const { controls } = this.ui;
    controls.style.display = visible ? 'block' : 'none';
  }

  setVideo(/** @type {HTMLVideoElement} */ mediaElement) {
    /**
     * @type {{videoContainer: HTMLDivElement, controls: HTMLDivElement}}
     */
    const { videoContainer } = this.ui;
    videoContainer.appendChild(mediaElement);
    /* eslint-disable no-param-reassign */
    mediaElement.controls = false;
    videoContainer.style.width = `${mediaElement.videoWidth}px`;
    mediaElement.play();
    setTimeout(() => mediaElement.play(), 5000);
    this.ui.videoElement = mediaElement;
  }

  setPersonName(name) {
    this.ui.name.innerText = name;
  }

  setIcon(icon) {
    this.ui.icon.innerHTML = icon;
  }

  setHandRaised(raiseHand) {
    this.isRaisingHand = raiseHand;
    if (this.isRaisingHand) {
      this.setIcon('🤚');
    } else {
      this.setIcon('');
    }
  }

  setMute(mute) {
    this.isMuted = mute;
    if (this.isMuted) {
      this.setIcon('🤐');
    } else {
      this.setIcon('');
    }
  }

  setCamera(enabled) {
    this.showCamera = enabled;
    if (this.showCamera) {
      this.ui.videoElement.classList.add('hidden');
      this.ui.videoPlaceholder.classList.add('visible');
    } else {
      this.ui.videoElement.classList.remove('hidden');
      this.ui.videoPlaceholder.classList.remove('visible');
    }
  }
}
