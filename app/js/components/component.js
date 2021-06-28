export default class Component extends HTMLElement {
  constructor({ template } = {}) {
    super();
    this.ui = {};

    if (template) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = template;
    }

    if (this.bindElements) {
      this.bindElements();
    }
  }

  registerUiBlock(name, selector) {
    const self = this;

    this.ui = {
      ...this.ui,
      get [name]() {
        return self.querySelector(selector);
      },
    };
  }

  registerUiBlocks(blocks) {
    Object.entries(blocks).map(([name, selector]) => this.registerUiBlock(name, selector));
  }

  querySelector(params) {
    return this.shadowRoot ? this.shadowRoot.querySelector(params) : super.querySelector(params);
  }

  triggerEvent(type, data) {
    const event = new CustomEvent(type, { detail: data });
    this.dispatchEvent(event);
  }

  connectedCallback() {
    if (this.bindEvents) {
      this.bindEvents();
    }

    if (this.onReady) {
      this.onReady();
    }
  }
}
