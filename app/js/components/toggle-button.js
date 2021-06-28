import Component from './component.js';

const TOGGLE_BUTTON_TEMPLATE = `
  <button><slot></slot></button>
`;

export default class ToggleButton extends Component {
  constructor() {
    super({ template: TOGGLE_BUTTON_TEMPLATE });

    this.toggled = this.getAttribute('toggled');
  }

  bindElements() {
    this.registerUiBlocks({
      button: 'button',
      text: '#text',
    });
  }

  get toggleText() {
    return this.getAttribute('toggle-text');
  }

  get untoggleText() {
    return this.getAttribute('untoggle-text');
  }

  bindEvents() {
    this.ui.button.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.toggled = !this.toggled;
    if (this.toggled) {
      this.ui.button.innerHTML = this.untoggleText;
      this.setAttribute('toggled', '');
      this.triggerEvent('toggle');
    } else {
      this.ui.button.innerHTML = this.toggleText;
      this.removeAttribute('toggled');
      this.triggerEvent('untoggle');
    }
    this.triggerEvent('toggleChanged', { toggled: this.toggled });
  }
}
