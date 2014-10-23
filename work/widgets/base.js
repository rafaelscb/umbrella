/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Base} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

/**
 * A widget is a piece that contributes to the visual appearance of a
 * JavaScript application.
 *
 * A widget normally is associated with a DOM element.
 * A widget can listen to 0 or more events.
 * An event handler may not be part of the widget's class.
 * An event can be either logical or physical:
 *   - A logical event IS NOT attached to a DOM element.
 *   - A physical event IS attached to a DOM element.
 * If an event is logical, the widget should know when to dispatch it.
 *
 * @param {Element=|string=} dom Root element for the widget (or its ID).
 * @constructor
 */
widgets.Base = function(dom) {
  this.listeners = new Object();
  this.disabledListeners = new Object();
  if (dom) {
    this.dom = (dom.nodeType) ? dom : document.getElementById(dom);
    this.flourish();
    this.tabIndex = this.dom.getAttribute('tabindex') || '-1';
  }
};

/**
 * Contains a collection of events that the given widget is listening to.
 *
 * @type {Object.<string, Function>}
 * @protected
 */
widgets.Base.prototype.listeners;

/**
 * Contains a collection of disabled events.
 *
 * @type {Object.<string, Function>}
 * @protected
 */
widgets.Base.prototype.disabledListeners;

/**
 * Contains the tabindex of the element.
 *
 * @type {string}
 * @protected
 */
widgets.Base.prototype.tabIndex;

/**
 * Contains the root element for the widget.
 *
 * @type {Element}
 * @public
 */
widgets.Base.prototype.dom;

/**
 * Exclusively adds a listener to the listeners collection.
 *
 * @param {string} type The event to be added.
 * @param {Function} func The function that will handle the event.
 * @param {Object} obj Optional object that is relevant to the function
 *    handler.
 * @return {void}
 */
widgets.Base.prototype.addListener = function(type, func, obj) {
  this.listeners[type] = (obj ? func.bind(obj) : func);
};

/**
 * Exclusively removes a listener from the listeners collection.
 *
 * @param {string} type The event to be remove.
 * @return {void}
 */
widgets.Base.prototype.removeListener = function(type, func, obj) {
  delete this.listeners[type];
};

/**
 * Adds a given event to the listeners collection. Notice that every change in
 * the DOM element(s) should occur through the widgets' classes. That's why
 * we're adding a {@code func.bind(obj)}.
 *
 * @param {string} type The event to be added.
 * @param {Function} func The function that will handle the event.
 * @param {Object} obj The object that is relevant to the function handler.
 * @return {void}
 */
widgets.Base.prototype.listen = function(type, func, obj) {
  this.addListener(type, func, obj);
  this.dom.addEventListener(type, this.listeners[type], false);
};

/**
 * Removes a given event from the listeners collection.
 *
 * @param {string} type The event to be removed.
 * @return {void}
 */
widgets.Base.prototype.unlisten = function(type) {
  this.dom.removeEventListener(type, this.listeners[type], false);
  this.removeListener(type);
};

/**
 * Dispatches a given event.
 *
 * @param {string} type The event to be dispatched.
 * @return {void}
 */
widgets.Base.prototype.dispatch = function(type) {
  var func = this.listeners[type];
  if (func) {
    func.apply(this, Array.prototype.slice.call(arguments, 1));
  }
};

/**
 * Disables a given listener.
 *
 * @param {string} type The event to be disabled.
 * @public
 */
widgets.Base.prototype.disableListener = function(type) {
  this.disabledListeners[type] = this.listeners[type];
  this.unlisten(type);
};

/**
 * Enables a given listener.
 *
 * @param {string} type The event to be enabled.
 * @public
 */
widgets.Base.prototype.enableListener = function(type) {
  this.listen(type, this.disabledListeners[type]);
  delete this.disabledListeners[type];
};

/**
 * Gets the existing value of the {@code aria-disabled} attribute.
 *
 * @return {boolean} true = is disabled; false = not disabled.
 * @public
 */
widgets.Base.prototype.getDisabled = function() {
  return this.dom.getAttribute('aria-disabled') == 'true';
};

/**
 * Sets the {@code aria-disabled} attribute.
 *
 * @param {boolean} val true = is disabled; false = is not disabled.
 * @public
 */
widgets.Base.prototype.setDisabled = function(val) {
  var elem; val = !!val;
  if (val) {
    if (this.dom.hasAttribute('tabindex')) {
      this.dom.setAttribute('tabindex', '-1');
    }
    for (elem in this.listeners) {
      this.disableListener(elem);
    }
  } else {
    if (this.dom.hasAttribute('tabindex')) {
      this.dom.setAttribute('tabindex', this.tabIndex);
    }
    for (elem in this.disabledListeners) {
      this.enableListener(elem);
    }
  }
  this.dom.setAttribute('aria-disabled', val);
};

/**
 * Gets the existing value of the {@code aria-hidden} attribute.
 *
 * @return {boolean} true = is hidden; false = is not hidden.
 * @public
 */
widgets.Base.prototype.getHidden = function() {
  return this.dom.getAttribute('aria-hidden') == 'true';
};

/**
 * Sets the {@code aria-hidden} attribute.
 *
 * @param {boolean} val true = is hidden; false = is not hidden.
 * @public
 */
widgets.Base.prototype.setHidden = function(val) {
  this.dom.setAttribute('aria-hidden', !!val);
};

/**
 * Gets the {@code aria-invalid} attribute.
 *
 * @return {boolean|string} true = is invalid;
 *    grammar = a grammatical error was detected;
 *    spelling = a spelling error was detected;
 *    otherwise = is valid.
 * @public
 */
widgets.Base.prototype.getInvalid = function() {
  var val = this.dom.getAttribute('aria-invalid');
  if (val == 'grammar' || val == 'spelling') {
    return val;
  } else {
    return val == 'true';
  }
};

/**
 * Sets the {@code aria-hidden} attribute.
 *
 * @param {boolean|string} val true = is invalid;
 *    grammar = a grammatical error was detected;
 *    spelling = a spelling error was detected;
 *    otherwise = is valid.
 * @public
 */
widgets.Base.prototype.setInvalid = function(val) {
  if (val == 'grammar' || val == 'spelling') {
    this.dom.setAttribute('aria-invalid', val);
  } else {
    this.dom.setAttribute('aria-invalid', !!val);
  }
};

/**
 * Gets the {@code aria-required} attribute.
 *
 * @return {boolean|string} true = is required; false = is not required.
 * @public
 */
widgets.Base.prototype.getRequired = function() {
  return this.dom.getAttribute('aria-required') == 'true';
};

/**
 * Sets the {@code aria-required} attribute.
 *
 * @param {boolean|string} val true = is required; false = is not required.
 * @public
 */
widgets.Base.prototype.setRequired = function(val) {
  this.dom.setAttribute('aria-required', !!val);
};

/**
 * Expands the widget's DOM structure.
 *
 * @return {void}
 */
widgets.Base.prototype.flourish = function() {};

/**
 * Destroys the current object of this class.
 *
 * @return {void} Nothing.
 */
widgets.Base.prototype.destroy = function() {
  this.listeners = null;
  this.disabledListeners = null;
  this.tabIndex = null;
  if (this.dom) this.dom.innerHTML = "";
  this.dom = null;
};
