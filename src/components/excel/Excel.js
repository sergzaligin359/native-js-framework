import {$} from '@core/utils/dom';
import {Emitter} from '../../core/Emitter';

// Main class for parent ExelComponent class
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter;
    this.store = options.store;
  }
  /**
   * create DOM elements and structure formation this DOM elements
   * @return {DOMnode}
   */
  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const componentOptions = {
        emitter: this.emitter,
        store: this.store,
      };
      const component = new Component($el, componentOptions);
      // Debug
      if (component.name) {
        window['c' + component.name] = component;
      }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  /**
   * render html components
   * @return {void}
   */
  render() {
    this.$el.append(this.getRoot());
    console.log('COMPONENTS', this.components);
    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
  }
}
