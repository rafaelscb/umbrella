/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Option} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The option widget is an item of a listbox, where one or more options
 * can selected.
 *
 * @param {string} caption Option's caption.
 * @param {string} val Option's value.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Option = function(caption, val) {
  this.dom = document.createElement('div');
  Widgets.Base.call(this, this.dom);
  this.setCaption(caption);
  this.setValue(val);
};
inherit(Widgets.Option, Widgets.Base);

/**
 * Gets the selected property, if selected returns true, false otherwise.
 *
 * @return {boolean} The selected property.
 */
Widgets.Option.prototype.getSelected = function() {
  return this.dom.className == 'selected';
};

/**
 * Sets the selected property. true for selected, false otherwise.
 *
 * @param {boolean} val true to be selected, false otherwise.
 * @return {void}
 */
Widgets.Option.prototype.setSelected = function(val) {
  this.dom.className = (val) ? 'selected': '';
};

/**
 * Gets the inner content.
 *
 * @return {string} the inner caption.
 */
Widgets.Option.prototype.getCaption = function() {
  return this.dom.innerHTML;
};

/**
 * Sets the inner content.
 *
 * @param {string} caption The caption to be added.
 * @return {void}
 */
Widgets.Option.prototype.setCaption = function(caption) {
  this.dom.innerHTML = caption;
};

/**
 * Gets the data-value.
 *
 * @return {string} the data-value attribute.
 * @public
 */
Widgets.Option.prototype.getValue = function() {
  return this.dom.getAttribute('data-value');
};

/**
 * Sets the data-value.
 *
 * @param {string} val the value to be set into the 
 *    data-value attribute.
 * @return {void}
 * @public
 */
Widgets.Option.prototype.setValue = function(val) {
  this.dom.setAttribute('data-value', val);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Option.prototype.flourish = function() {
  this.dom.setAttribute('role', 'option');
};