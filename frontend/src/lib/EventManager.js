export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit(event, payload) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    if (!this.listeners[event]) {
      return;
    }

    const filteredListeners = this.listeners[event].filter(
      (listener) => listener !== listenerToRemove,
    );

    this.listeners[event] = filteredListeners;
  }
}

const toastEventManager = new EventManager();

function addtoast1(payload) {
  console.log('addtoast listener1', payload);
}

function addtoast2(payload) {
  console.log('addtoast listener2', payload);
}

toastEventManager.on('addtoast', addtoast1);
toastEventManager.on('addtoast', addtoast2);
toastEventManager.emit('addtoast', { type: 'danger', text: 'Opaa' });

toastEventManager.removeListener('addtoast', addtoast1);

toastEventManager.emit('addtoast', 'depois da remoção...');

console.log({ toastEventManager });
