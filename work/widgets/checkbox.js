/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Checkbox} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The checkbox widget handles checked/unchecked/mixed states.
 * This widget provides the following event(s): change.
 *
 * @param {Element} dom Root element for the checkbox.
 * @param {?boolean} checked Optional value for the {@code aria-checked}'s
 *    state: true = 'true'; false = 'false'; otherwise = 'mixed'.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Checkbox = function(dom, checked) {
  Widgets.Base.call(this, dom);
  this.setChecked(checked);
  this.listen('click', this.onClick, this);
  this.listen('keyup', this.onKeyUp, this);
};
inherit(Widgets.Checkbox, Widgets.Base);

/**
 * Value to be used when it is checked.
 *
 * @type {mixed}
 * @protected
 */
Widgets.Checkbox.prototype.checkedValue;

/**
 * Value to be used when it is unchecked.
 *
 * @type {mixed}
 * @protected
 */
Widgets.Checkbox.prototype.uncheckedValue;

/**
 * Gets the {@code aria-checked} attribute.
 *
 * @return {?boolean} 'true' = true; 'false' = false; 'mixed' = null.
 * @public
 */
Widgets.Checkbox.prototype.getChecked = function() {
  var checked = this.dom.getAttribute('aria-checked');
  if (checked === 'true' || checked === 'false') {
    return (checked === 'true');
  }
  return null;
};

/**
 * Sets the {@code aria-checked} attribute.
 *
 * @param {?boolean} checked true = 'true'; false = 'false';
 *    otherwise = 'mixed'.
 * @public
 */
Widgets.Checkbox.prototype.setChecked = function(checked) {
  this.dom.setAttribute('aria-checked',
      ((typeof(checked) === 'boolean') ? checked : 'mixed'));
};

/**
 * Gets the current value.
 *
 * @return {?boolean}
 * @public
 */
Widgets.Checkbox.prototype.getValue = function() {
  if (this.getChecked()) {
    return this.checkedValue;
  } else {
    return this.uncheckedValue;
  }
};

/**
 * Sets the current value.
 *
 * @param {?boolean} val
 * @public
 */
Widgets.Checkbox.prototype.setValue = function(val) {
  this.setChecked(val == this.checkedValue);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Checkbox.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'change':
    this.addListener(type, func, obj);
    return; 
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Checkbox.prototype.unlisten = function(type) {
  switch (type) {
  case 'change':
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Handler function in response of the click event. Every time a
 * click event occurs a {@code change} event is dispatched, cause its state
 * changes.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Checkbox.prototype.onClick = function(e) {
  var nextState = !(this.getChecked() === true);

  this.setChecked(nextState);
  this.dispatch('change', e);
};

/**
 * Handler function to send the click event every time the element has focus
 * and the {@code space} character is hit.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Checkbox.prototype.onKeyUp = function(e) {
  if (e.keyCode === 32) {
    this.dispatch('click', e);
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Checkbox.prototype.flourish = function() {
  this.dom.setAttribute('role', 'checkbox');
  if (!this.dom.hasAttribute('tabindex')) {
    this.dom.setAttribute('tabindex', '0');
  }

  if (this.dom.hasAttribute('data-checked')) {
    this.checkedValue = this.dom.getAttribute('data-checked');
  } else {
    this.checkedValue = true;
  }

  if (this.dom.hasAttribute('data-unchecked')) {
    this.uncheckedValue = this.dom.getAttribute('data-unchecked');
  } else {
    this.uncheckedValue = false;
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Checkbox.prototype.destroy = function() {
  this.unlisten('click');
  this.unlisten('keyup');
  Widgets.Base.prototype.destroy.call(this);
};