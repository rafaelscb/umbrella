/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.SpinButton} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The spin button widget allows the user to select from a given range through
 * the use of an up and down button.
 *
 * @param {Element} dom Root element for the spin button.
 * @param {number} min The minimum value allowed.
 * @param {number} max The maximum value allowed.
 * @param {number} incr The incrementation factor.
 * @param {number} incrp The incremantation factor for page up|down.
 * @param {number} val The initial value.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.SpinButton = function(dom, min, max, incr, incrp, val) {
  Widgets.Base.call(this, dom);

  incrp = (!incrp) ? incr : incrp;
  val = (val != undefined) ? val : min;

  if (Math.ceil(min) != min ||
      Math.ceil(max) != max ||
      Math.ceil(incr) != incr ||
      Math.ceil(incrp) != incrp) {
    this.hasDecimal = true;
  } else {
    this.hasDecimal = false; 
  }

  this.setMin(min); this.setMax(max); this.setValue(val);
  this.incr = incr; this.incrp = incrp;

  this.listen('upclick', this.onUpClick, this);
  this.listen('downclick', this.onDownClick, this);
  this.listen('keydown', this.onKeyDown, this);
};
inherit(Widgets.SpinButton, Widgets.Base);

/**
 * The label element.
 *
 * @type {Element}
 * @protected
 */
Widgets.SpinButton.prototype.label;

/**
 * The up element.
 *
 * @type {Element}
 * @protected
 */
Widgets.SpinButton.prototype.up;

/**
 * The down element.
 *
 * @type {Element}
 * @protected
 */
Widgets.SpinButton.prototype.down;

/**
 * The increment factor.
 *
 * @type {number}
 * @protected
 */
Widgets.SpinButton.prototype.incr;

/**
 * The increment (for page) factor.
 *
 * @type {number}
 * @protected
 */
Widgets.SpinButton.prototype.incrp;

/**
 * The flag that indicates the spin button has numbers with decimal places.
 *
 * @type {boolean}
 * @protected
 */
Widgets.SpinButton.prototype.hasDecimal;

/**
 * Gets the minimum allowed value.
 *
 * @return {number} The aria-valuemin property.
 * @public
 */
Widgets.SpinButton.prototype.getMin = function() {
  return Number(this.dom.getAttribute('aria-valuemin'));
};

/**
 * Sets the minimum allowed value.
 *
 * @param {number} val The value to be set to aria-valuemin.
 * @return {void}
 * @public
 */
Widgets.SpinButton.prototype.setMin = function(val) {
  this.dom.setAttribute('aria-valuemin', val);
};

/**
 * Gets the maximum allowed value.
 *
 * @return {number} The aria-valuemax property.
 * @public
 */
Widgets.SpinButton.prototype.getMax = function() {
  return Number(this.dom.getAttribute('aria-valuemax'));
};

/**
 * Sets the maximum allowed value.
 *
 * @param {number} val The value to be set to aria-valuemax.
 * @return {void}
 * @public
 */
Widgets.SpinButton.prototype.setMax = function(val) {
  this.dom.setAttribute('aria-valuemax', val);
};

/**
 * Get the numeric value.
 *
 * @return {number} The aria-valuenow property.
 * @public
 */
Widgets.SpinButton.prototype.getNumValue = function() {
  return Number(this.dom.getAttribute('aria-valuenow'));
};

/**
 * Gets the value.
 *
 * @return {number} The aria-valuenow property.
 * @public
 */
Widgets.SpinButton.prototype.getValue = function() {
  return this.dom.getAttribute('aria-valuenow');
};

/**
 * Sets the value.
 *
 * @param {number} val The value to be set to aria-valuenow.
 * @return {void}
 * @public
 */
Widgets.SpinButton.prototype.setValue = function(val) {
  if (this.hasDecimal) {
    val = val.toFixed(2);
  }
  this.label.innerHTML = val;
  this.dom.setAttribute('aria-valuenow', val);
};

/**
 * Decrements the current value (using the {@code incr} factor.
 *
 * @return {void}
 * @protected
 */
Widgets.SpinButton.prototype.decrement = function() {
  var min = this.getMin();
  var nextValue = this.getNumValue() - this.incr;
  if (nextValue < min) {
    nextValue = min;
  }
  this.setValue(nextValue);
};

/**
 * Increments the current value (using the {@code incr} factor.
 *
 * @return {void}
 * @protected
 */
Widgets.SpinButton.prototype.increment = function() {
  var max = this.getMax();
  var nextValue = this.getNumValue() + this.incr;
  if (nextValue > max) {
    nextValue = max;
  }
  this.setValue(nextValue);
};

/**
 * Decrements the current value (using the {@code incrP} factor.
 *
 * @return {void}
 * @protected
 */
Widgets.SpinButton.prototype.decrementP = function() {
  var min = this.getMin();
  var nextValue = this.getNumValue() - this.incrp;
  if (nextValue < min) {
    nextValue = min;
  }
  this.setValue(nextValue);
};

/**
 * Increments the current value (using the {@code incrP} factor.
 *
 * @return {void}
 * @protected
 */
Widgets.SpinButton.prototype.incrementP = function() {
  var max = this.getMax();
  var nextValue = this.getNumValue() + this.incrp;
  if (nextValue > max) {
    nextValue = max;
  }
  this.setValue(nextValue);
};

/**
 * Occurs when the up button is clicked.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.SpinButton.prototype.onUpClick = function(e) {
  if (e.which == 1) {
    this.increment();
  }
};

/**
 * Occurs when the down button is clicked.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.SpinButton.prototype.onDownClick = function(e) {
  if (e.which == 1) {
    this.decrement();
  }
};

/**
 * Occurs when a key is pressed down. We're mostly interested in navigation
 * movements.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.SpinButton.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var nav = false;

  switch (e.keyCode) {
  case 38: // up
    this.increment();
    nav = true;
    break;
  case 40: // down
    this.decrement();
    nav = true;
    break;
  case 33: // pg up
    this.incrementP();
    nav = true;
    break;
  case 34: // pg down
    this.decrementP();
    nav = true;
    break;
  }

  if (nav) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  return true;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.SpinButton.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'upclick':
    this.addListener(type, func, obj);
    this.up.addEventListener('mousedown', this.listeners[type], false);
    return;
  case 'downclick':
    this.addListener(type, func, obj);
    this.down.addEventListener('mousedown', this.listeners[type], false);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.SpinButton.prototype.unlisten = function(type, func, obj) {
  switch (type) {
  case 'upclick':
    this.up.removeEventListener('click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'downclick':
    this.down.removeEventListener('click', this.listeners[type], false);
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.SpinButton.prototype.flourish = function() {
  this.dom.setAttribute('role', 'spinbutton');
  if (!this.dom.hasAttribute('tabindex')) {
    this.dom.setAttribute('tabindex', '0');
  }
  this.dom.innerHTML = "\
<div class='spinlabel'>0</div>\
<div class='spinup'>&#x25B2;</div>\
<div class='spindown'>&#x25BC;</div>";

  this.label = this.dom.children[0];
  this.up = this.dom.children[1];
  this.down = this.dom.children[2];
};

/**
 * @inheritDoc
 * @override
 */
Widgets.SpinButton.prototype.destroy = function() {
  this.unlisten('upclick');
  this.unlisten('downclick');
  this.unlisten('keydown');

  this.label = null;
  this.up = null;
  this.down = null;
  this.incr = null;
  this.incrp = null;
  this.hasDecimal = null;

  Widgets.Base.prototype.destroy.call(this);
};