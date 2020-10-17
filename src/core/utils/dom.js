/**
 * Class Dom its wrapper for native DOM
 */
class Dom {
  /**
   * Class wrapper constructor for work whith native DOM
   * @param {string | DOMnode} selector
   */
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }
  /**
   * Set css style
   * @param {object} styles
   */
  css(styles={}) {
    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        this.$el.style[key] = styles[key];
      }
    }
  }
  /**
   * Getter for data attr
   * @return {string}
   */
  get data() {
    return this.$el.dataset;
  }
  /**
   * Get id for data attr
   * @param {bool} parse
   * @return {string}
   */
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
  /**
   * Add attr class for DOM element
   * @param {string} className
   * @return {void}
   */
  addClass(className) {
    this.$el.classList.add(className);
  }
  /**
   * Remove attr class for DOM element
   * @param {string} className
   * @return {void}
   */
  removeClass(className) {
    this.$el.classList.remove(className);
  }
  /**
   * ReturnDOM element by selector
   * @param {string} selector
   * @return {DOMCollections}
   */
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  /**
   * Return all DOM elements by selector
   * @param {string} selector
   * @return {DOMCollections}
   */
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  /**
   * Sets or gets HTML string
   * @param {string | false} html
   * @return {instance}
   */
  html(html='') {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }
  /**
   * Cleans HTML string
   * @return {instance}
   */
  clearHTML() {
    this.html('');
    return this;
  }
  /**
   * Appends DOM elements
   * @param {DOMnode} DOMnode
   * @return {instance}
   */
  append(DOMnode) {
    if (DOMnode instanceof Dom) {
      DOMnode = DOMnode.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(DOMnode);
    } else {
      this.$el.appendChild(DOMnode);
    }
    return this;
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  /**
   * Return coords DOM element
   * @return {object}
   */
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  /**
   * Adds listen event
   * @param {string} eventType
   * @param {function} callback
   * @return {void}
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  /**
   * Remove listen event
   * @param {string} eventType
   * @param {function} callback
   * @return {void}
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

/**
 * Instance object class Dom
 * @param {string | DOMnode} selector
 * @return {object}
 */
export const $ = (selector) => new Dom(selector);

/**
 * Custom method for create native DOM element
 * @param {string} tagName
 * @param {string} classes
 * @return {DOMelement}
 */
$.create = (tagName, classes='') => {
  const $el = document.createElement(tagName);
  if (classes) {
    $el.classList.add(classes);
  }
  return $($el);
};
