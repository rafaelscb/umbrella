/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.RadioGroup} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');
include('widgets/radio.js');

/**
 * The radiogroup widget handles a group o radio buttons.
 * This widget provides the following event(s): change.
 *
 * @param {Element} dom Root element for the radiogroup.
 * @param {number=} index The initial index for the radios.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.RadioGroup = function(dom, index) {
  this.radios = new Array();
  this.index = (index ? index : 0);
  widgets.Base.call(this, dom);  
  this.listen('keydown', this.onKeyDown, this);
};
inherit(widgets.RadioGroup, widgets.Base);

/**
 * The current index.
 *
 * @type {number}
 * @protected
 */
widgets.RadioGroup.prototype.index;

/**
 * Contains the collection of radio elements.
 *
 * @type {Array.<widgets.Radio>}
 * @protected
 */
widgets.RadioGroup.prototype.radios;

/**
 * Adds a new item to the radios collection.
 *
 * @param {widgets.Radio} item A new radio to be added.
 * @return {void}
 */
widgets.RadioGroup.prototype.addRadio = function(item) {
  for (var i = 0; i < this.radios.length; i++) {
    if (this.radios[i].dom.id == item.dom.id) return;
  }
  item.listen('change', this.onChange, this);  
  if (this.index == this.radios.length) {
    item.dom.setAttribute('tabindex', 0);
  }
  this.radios.push(item);
};

/**
 * Removes an existing item from the radios collection.
 *
 * @param {string} id IDREF of the radio to be removed.
 * @return {void}
 */
widgets.RadioGroup.prototype.removeRadio = function(id) {
  for (var i = 0; i < this.radios.length; i++) {
    if (this.radios[i].dom.id == id) {
      this.radios[i].unlisten('change');
      this.radios[i].destroy();
      this.radios[i].splice(i, 1);
    }
  }
};

/**
 * Gets the selected option.
 *
 * @return {widgets.Radio} The existing selected option, or null.
 */
widgets.RadioGroup.prototype.getOption = function() {
  var radio = this.radios[this.index];
  if (radio.getChecked()) {
    return radio;
  }
  return null;
};

/**
 * Handles when a given radio button changes.
 *
 * @param {Element} e The event information.
 * @return {void}
 */
widgets.RadioGroup.prototype.onChange = function(e) {
  for (var i = 0; i < this.radios.length; i++) {
    if (this.radios[i].dom.id !== e.target.id) {
      this.radios[i].setChecked(false);
      this.radios[i].dom.setAttribute('tabindex', '-1');
    } else {
      this.radios[i].dom.setAttribute('tabindex', '0');    
      this.index = i;
    }
  }
  this.dispatch('change', e);
};

/**
 * Handles the navigation entries.
 *
 * @param {Element} e The event information.
 * @return {boolean} Returns false if consuming event; true if propagating.
 */
widgets.RadioGroup.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var prevIdx = this.index;
  switch (e.keyCode) {
  case 37: case 38: // left | up
    if (this.index > 0) {
      this.index--;
    }
    break;
  case 39: case 40: // right | down
    if (this.index < (this.radios.length-1)) {
      this.index++;
    }
    break;
  }

  if (prevIdx != this.index) {
    this.radios[this.index].dom.focus();

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
widgets.RadioGroup.prototype.flourish = function() {
  var i = 0; var radio;
  var elems = this.dom.querySelectorAll('[role="radio"]');

  this.dom.setAttribute('role', 'radiogroup');
  for (i = 0; i < elems.length; i++) {
    this.addRadio(new widgets.Radio(elems[i]));
  }
};

/**
 * @inheritDoc
 * @override
 */
widgets.RadioGroup.prototype.destroy = function() {
  this.unlisten('keydown');
  for (var i = 0; i < this.radios.length; i++) {
    this.radios[i].unlisten('change');
    this.radios[i].destroy();
    this.radios[i] = null;
  }
  this.index = null;
  this.radios = null;
  widgets.Base.prototype.destroy.call(this);
};
