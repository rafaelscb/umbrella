/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.MaskedEdit} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Textbox.js');

/**
 * The masked-edit widget handles text input that should obbey a specific format.
 *
 * @param {Element} dom Root element for the masked-edit.
 * @param {string} mask The format of the mask.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.MaskedEdit = function(dom, mask) {
  this.mask = mask;
  this.rawVal = "";

  Widgets.Textbox.call(this, dom);

  this.listen('focus', this.onFocus, this);
  this.listen('keydown', this.onKeyDown, this);
  this.listen('keypress', this.onKeyPress, this);
  this.listen('mousedown', this.onMouseDown, this);
};
inherit(Widgets.MaskedEdit, Widgets.Textbox);

/**
 * Mask format.
 *
 * @type {string}
 * @protected
 */
Widgets.MaskedEdit.prototype.mask;

/**
 * Current cursor position.
 *
 * @type {number}
 * @protected
 */
Widgets.MaskedEdit.prototype.pos;

/**
 * Raw value (with no format) from input.
 *
 * @type {string}
 * @protected
 */
Widgets.MaskedEdit.prototype.rawVal;

/**
 * (Re-)sets the cursor to a specific position.
 *
 * @param {number} pos The position where the cursor should be set.
 * @return {void}
 * @protected
 */
Widgets.MaskedEdit.prototype.resetCursor = function() {
  if (this.dom.createTextRange) {
    var range = this.dom.createTextRange();
    range.move('character', this.pos);
    range.select();
  } else {
    this.dom.setSelectionRange(this.pos, this.pos);
  }
};

/**
 * Reset mask in textbox.
 *
 * @protected
 */
Widgets.MaskedEdit.prototype.resetMask = function() {
  var mask = ''; this.pos = undefined;
  for (var j = 0, i = 0; i < this.mask.length; i++) {
    switch (this.mask[i]) {
    case '#': case '?': case 'c':
    case 'a': case 'A':
      if (this.rawVal[j]) {
        mask += this.rawVal[j++];
      } else {
        if (this.pos == undefined) {
          this.pos = i;
        }
        mask += '_';
      }
      break;
    default:
      mask += this.mask[i];
      break;
    }
  }
  this.dom.value = mask;
  if (this.pos == undefined) {
    this.pos = mask.length;
  }
};

/**
 * Inserts a character at a given cursor position.
 *
 * @param {string} chr The character to be added.
 * @return {void}
 * @protected
 */
Widgets.MaskedEdit.prototype.addChar = function(chr) {
  this.rawVal += chr;
  this.resetMask();
  this.resetCursor();
};

/**
 * Removes a character from the cursor position.
 *
 * @return {void}
 * @protected
 */
Widgets.MaskedEdit.prototype.backSpace = function() {
  if (this.rawVal.length > 0) {
    this.rawVal = this.rawVal.slice(0, -1);
    this.resetMask();
    this.resetCursor();
  }
};

/**
 * Occurs when the focus is detected.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.MaskedEdit.prototype.onFocus = function(e) {
  this.resetCursor();
  e.preventDefault();
  e.stopPropagation();
  return false;
};

/**
 * Occurs when a key is down. We're interested in preventing the cursor from
 * moving.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.MaskedEdit.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var nav = false;

  switch (e.keyCode) {
  case 37: // left
  case 38: // up
  case 39: // right
  case 40: // down
  case 33: // pg up
  case 34: // pg down
  case 46: // del
    nav = true;
    break;
  case 8: // backspace
    this.backSpace();
    nav = true;
    break;
  }

  if (nav) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};

/**
 * Occurs when a key is pressed. We're interested in detecting characters.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.MaskedEdit.prototype.onKeyPress = function(e) {
  var token = this.mask[this.pos];
  var chr = undefined;

  switch (token) {
  case '#':
    if (e.which >= 48 && e.which <= 57) {
      chr = String.fromCharCode(e.which);      
    }
    break;
  case '?':
    chr = String.fromCharCode(e.which);
    break;
  case 'c': case 'a': case 'A':
    if ((e.which >= 65 && e.which <= 90) ||
        (e.which >= 97 && e.which <= 122) ||
        (e.which >= 192 && e.which <= 255)) {
      chr = String.fromCharCode(e.which);
      if (token == 'a') {
        chr = chr.toLowerCase();
      } else if (token == 'A') {
        chr = chr.toUpperCase();
      }
    }
    break;
  }

  if (chr != undefined) {
    this.addChar(chr);
    this.resetCursor();
  }

  if (e.which > 0) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};

/**
 * Occurs when the mouse is clicked down over the masked-edit.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.MaskedEdit.prototype.onMouseDown = function(e) {
  this.dom.focus();
  e.preventDefault();
  e.stopPropagation();
  return false;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.MaskedEdit.prototype.flourish = function() {
  Widgets.Textbox.prototype.flourish.call(this);
  this.resetMask();
};

/**
 * @inheritDoc
 * @override
 */
Widgets.MaskedEdit.prototype.destroy = function() {
  this.unlisten('focus');
  this.unlisten('keydown');
  this.unlisten('keypress');
  this.unlisten('mousedown');

  this.mask = null;
  this.pos = null;
  this.rawVal = null;

  Widgets.Textbox.prototype.destroy.call(this);
};