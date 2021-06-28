import Component from './component.js';

const CHAT_BOX_TEMPLATE = `
  <style>

  </style>
  <ol></ol>
  <textarea rows="3" width="100%"></textarea>
`;

export default class ChatBox extends Component {
  constructor() {
    super({ template: CHAT_BOX_TEMPLATE });
  }

  bindElements() {
    this.registerUiBlocks({
      messages: 'ol',
      input: 'textarea',
    });
  }

  bindEvents() {
    /**
     * @type {{input: HTMLTextAreaElement}}
     */
    const { input } = this.ui;

    input.addEventListener('keyup', (/** @type {KeyboardEvent} */ e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = input.value;
        this.triggerSendMessageEvent(message);
        input.value = '';
      }
    });
  }

  addMessage(message) {
    /**
     * @type {{messages: HTMLOListElement}}
     */
    const { messages } = this.ui;

    const newMessageListItem = document.createElement('li');
    newMessageListItem.textContent = message;
    messages.appendChild(newMessageListItem);
  }

  triggerSendMessageEvent(message) {
    this.triggerEvent('sendMessage', { message });
  }
}
