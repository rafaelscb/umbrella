/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Checkbox} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The checkbox widget handles checked/unchecked/mixed states.
 * This widget provides the following event(s): change.
 *
 * @param {Element} dom Root element for the checkbox.
 * @param {?boolean} checked Optional value for the {@code aria-checked}'s
 *    state: true = 'true'; false = 'false'; otherwise = 'mixed'.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Checkbox = function(dom, checked) {
  widgets.Base.call(this, dom);
  this.setChecked(checked);
  this.listen('click', this.onClick, this);
  this.listen('keyup', this.onKeyUp, this);
};
inherit(widgets.Checkbox, widgets.Base);

/**
 * Value to be used when it is checked.
 *
 * @type {mixed}
 * @protected
 */
widgets.Checkbox.prototype.checkedValue;

/**
 * Value to be used when it is unchecked.
 *
 * @type {mixed}
 * @protected
 */
widgets.Checkbox.prototype.uncheckedValue;

/**
 * Gets the {@code aria-checked} attribute.
 *
 * @return {?boolean} 'true' = true; 'false' = false; 'mixed' = null.
 * @public
 */
widgets.Checkbox.prototype.getChecked = function() {
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
widgets.Checkbox.prototype.setChecked = function(checked) {
  this.dom.setAttribute('aria-checked',
      ((typeof(checked) === 'boolean') ? checked : 'mixed'));
};

/**
 * Gets the current value.
 *
 * @return {?boolean}
 * @public
 */
widgets.Checkbox.prototype.getValue = function() {
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
widgets.Checkbox.prototype.setValue = function(val) {
  this.setChecked(val == this.checkedValue);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Checkbox.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'change':
    this.addListener(type, func, obj);
    return; 
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Checkbox.prototype.unlisten = function(type) {
  switch (type) {
  case 'change':
    this.removeListener(type);
    return;
  }
  widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Handler function in response of the click event. Every time a
 * click event occurs a {@code change} event is dispatched, cause its state
 * changes.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.Checkbox.prototype.onClick = function(e) {
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
widgets.Checkbox.prototype.onKeyUp = function(e) {
  if (e.keyCode === 32) {
    this.dispatch('click', e);
  }
};

/**
 * @inheritDoc
 * @override
 */
widgets.Checkbox.prototype.flourish = function() {
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
widgets.Checkbox.prototype.destroy = function() {
  this.unlisten('click');
  this.unlisten('keyup');
  widgets.Base.prototype.destroy.call(this);
};
