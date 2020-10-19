import {DOMListener} from '@core/DOMListener';

// Main class for Excel app first page
export class ExcelComponent extends DOMListener {
  constructor($root, options={}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribes = [];
    this.prepare();
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsubscribe = this.emitter.subscribe(event, fn);
    this.unsubscribes.push(unsubscribe);
  }

  /**
   * Adds listeners
   * @return {void}
   */
  init() {
    this.initDOMListeners();
  }

  /**
   * Destroy listeners
   * @return {void}
   */
  destroy() {
    this.removeDOMListeners();
    this.unsubscribes.forEach((unsubsribe) => unsubsribe());
  }

  /**
   * To return component template
   * @return {string}
   */
  toHTML() {
    return '';
  }
}
