/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Option} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The option widget is an item of a listbox, where one or more options
 * can selected.
 *
 * @param {string} caption Option's caption.
 * @param {string} val Option's value.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Option = function(caption, val) {
  this.dom = document.createElement('div');
  widgets.Base.call(this, this.dom);
  this.setCaption(caption);
  this.setValue(val);
};
inherit(widgets.Option, widgets.Base);

/**
 * Gets the selected property, if selected returns true, false otherwise.
 *
 * @return {boolean} The selected property.
 */
widgets.Option.prototype.getSelected = function() {
  return this.dom.className == 'selected';
};

/**
 * Sets the selected property. true for selected, false otherwise.
 *
 * @param {boolean} val true to be selected, false otherwise.
 * @return {void}
 */
widgets.Option.prototype.setSelected = function(val) {
  this.dom.className = (val) ? 'selected': '';
};

/**
 * Gets the inner content.
 *
 * @return {string} the inner caption.
 */
widgets.Option.prototype.getCaption = function() {
  return this.dom.innerHTML;
};

/**
 * Sets the inner content.
 *
 * @param {string} caption The caption to be added.
 * @return {void}
 */
widgets.Option.prototype.setCaption = function(caption) {
  this.dom.innerHTML = caption;
};

/**
 * Gets the data-value.
 *
 * @return {string} the data-value attribute.
 * @public
 */
widgets.Option.prototype.getValue = function() {
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
widgets.Option.prototype.setValue = function(val) {
  this.dom.setAttribute('data-value', val);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Option.prototype.flourish = function() {
  this.dom.setAttribute('role', 'option');
};
