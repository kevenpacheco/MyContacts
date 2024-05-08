export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    if (!this.listeners.has(event)) {
      return;
    }

    const filteredListeners = this.listeners.get(event).filter(
      (listener) => listener !== listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
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
