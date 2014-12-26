/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Textbox} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The textbox widget handles text input related states.
 *
 * @param {Element} dom Root element for the textbox.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Textbox = function(dom) {
  widgets.Base.call(this, dom);
  this.setMultiline(this.dom.tagName == 'TEXTAREA');
};
inherit(Widgets.Textbox, Widgets.Base);

/**
 * Gets the {@code aria-multiline} attribute.
 *
 * @return {boolean} true = is multiline; false = is simple.
 * @public
 */
Widgets.Textbox.prototype.getMultiline = function() {
  return this.dom.getAttribute('aria-multiline') == 'true';  
};

/**
 * Sets the {@code aria-multiline} attribute.
 *
 * @param {boolean} multiline true = is multiline; false = is simple.
 * @public
 */
Widgets.Textbox.prototype.setMultiline = function(multiline) {
  this.dom.setAttribute('aria-multiline', !!multiline);
};

/**
 * Gets the {@code aria-readonly} attribute.
 *
 * @return {boolean} true = is readonly; false = is editable.
 * @public
 */
Widgets.Textbox.prototype.getReadonly = function() {
  return !!this.dom.getAttribute('aria-readonly');
};

/**
 * Sets the {@code aria-readonly} attribute.
 *
 * @param {boolean} val true = is readonly; false = is editable.
 * @public
 */
Widgets.Textbox.prototype.setReadonly = function(val) {
  val = !!val;
  this.dom.setAttribute('aria-readonly', val);
  if (val) {
    this.dom.setAttribute('readonly', val);
  } else {
    this.dom.removeAttribute('readonly');
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Textbox.prototype.setDisabled = function(val) {
  Widgets.Base.prototype.setDisabled.call(this, val);
  if (!!val) {
    this.dom.setAttribute('disabled', 'true');
  } else {
    this.dom.removeAttribute('disabled'); 
  }
};

/**
 * Gets its value.
 *
 * @return {string} The value of the textbox.
 * @public
 */
Widgets.Textbox.prototype.getValue = function() {
  return this.dom.value;
};

/**
 * Sets its value.
 *
 * @param {string} value The value to be set.
 * @return {void} Nothing.
 * @public
 */
Widgets.Textbox.prototype.setValue = function(value) {
  this.dom.value = value;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Textbox.prototype.flourish = function() {
  this.dom.setAttribute('role', 'textbox');
  if (!this.dom.hasAttribute('tabindex')) {
    this.dom.setAttribute('tabindex', '0');
  }
};