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
   * Method sets or gets HTML string
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
   * Method cleans HTML string
   * @return {instance}
   */
  clearHTML() {
    this.html('');
    return this;
  }
  /**
   * Method appends DOM elements
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
  /**
   * Method for adds listen event
   * @param {string} eventType
   * @param {function} callback
   * @return {void}
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  /**
   * Method for remove listen event
   * @param {string} eventType
   * @param {function} callback
   * @return {void}
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

/**
 * Function instance object class Dom
 * @param {string | DOMnode} selector
 * @return {Object}
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
