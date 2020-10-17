import {DOMListener} from '@core/DOMListener';

// Main class for Excel app first page
export class ExcelComponent extends DOMListener {
  constructor($root, options={}) {
    super($root, options.listeners);
    this.name = options.name || '';

    this.prepare();
  }
  prepare() {}

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
  }
  /**
   * To return component template
   * @return {string}
   */
  toHTML() {
    return '';
  }
}
