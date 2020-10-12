import {capitalize} from './utils/common';
export class DOMListener {
  constructor($root, listeners=[]) {
    if (!$root) throw new Error(`No ${$root} provided for DOMListeners!`);
    this.$root = $root;
    this.listeners = listeners;
  }
  /**
   * Forms a string for events methods
   * @param {string} eventName
   * @return {string}
   */
  getMethodName(eventName) {
    return 'on' + capitalize(eventName);
  }
  /**
   * Adds listeners for components
   * @return {void}
   */
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${this[method]} ist implement in ${this.name || ''} component!`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  /**
   * Removes listeners from components
   * @return {void}
   */
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
