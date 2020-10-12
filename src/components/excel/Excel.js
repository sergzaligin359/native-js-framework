import {$} from '@core/utils/dom';

// Main class for parent ExelComponent class
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }
  /**
   * create DOM elements and structure formation this DOM elements
   * @return {DOMnode}
   */
  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
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
}
