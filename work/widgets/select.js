/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Select} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The select widget is to be used when a unique option must be selected, but
 * differently from a combobox, it does not use a text field.
 *
 * @param {Element} dom Root element for the select.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Select = function(dom, index) {
  this.index = (index > 0) ? index : 0;
  this.options = new Array();
  this.chosen = null;

  this.mouseInList = false;

  widgets.Base.call(this, dom);

  this.listen('blur', this.onBlur, this);
  this.listen('keydown', this.onKeyDown, this);
  this.listen('mousedown', this.onMouseDown, this);
  this.listen('mouseenterlist', this.onMouseEnterList, this);
  this.listen('mouseleavelist', this.onMouseLeaveList, this);
};
inherit(widgets.Select, widgets.Base);

/**
 * Contains the index to access the current option (selected|highlighted).
 *
 * @type {number}
 * @protected
 */
widgets.Select.prototype.index;

/**
 * Contains the collection of options.
 *
 * @type {Array.<widgets.Option>}
 * @protected
 */
widgets.Select.prototype.options;

/**
 * Contains the chosen option.
 *
 * @type {widgets.Option}
 * @protected
 */
widgets.Select.prototype.chosen;

/**
 * The button element associated with the select.
 *
 * @type {Element}
 * @protected
 */
widgets.Select.prototype.button;

/**
 * The list element.
 *
 * @type {Element}
 * @protected
 */
widgets.Select.prototype.list;

/**
 * Flag indicating if the mouse is in the list.
 *
 * @type {Element}
 * @protected
 */
widgets.Select.prototype.mouseInList;

/**
 * Adds a new option to the options collection.
 *
 * @param {widgets.Option} option A new option to be added.
 * @param {number} index The index position where the item will be added to. If
 *    no value is specified, it adds the option to the end of the list.
 * @return {void}
 */
widgets.Select.prototype.addOption = function(option, index) {
  index = (index == undefined) ? this.options.length : index;
  var pOpt = this.options[index];

  option.listen('mousedown', this.onOptionClick, this);
  option.listen('mouseover', this.onOptionHover, this);

  this.options.splice(index, 0, option);
  if (index == this.index) {
    if (pOpt) pOpt.dom.className = '';
    option.dom.className = 'selected';
    this.commit();
  }
  this.list.insertBefore(option.dom, this.list.children[index]);
};

/**
 * Removes a given option from the options collection.
 *
 * @param {number} index The index position where the option will be removed
 *    from. If no value is specified, it removes the option from the end of the
 *    list.
 * @return {void}
 */
widgets.Select.prototype.removeOption = function(index) {
  index = (index == undefined) ? this.options.length-1 : index;

  this.options[index].unlisten('mousedown');
  this.options[index].unlisten('mouseover');

  this.list.removeChild(this.options[index].dom);

  this.options[index].destroy();
  this.options.splice(index, 1);
};

/**
 * Checks if the list is opened.
 *
 * @return {boolean} true if opened, false otherwise.
 * @public
 */
widgets.Select.prototype.isListOpened = function() {
  return this.list.getAttribute('aria-hidden') != 'true';
};

/**
 * Opens the list.
 *
 * @return {void}
 * @protected
 */
widgets.Select.prototype.showList = function() {
  if (!this.list.style.top) {
    this.list.style.top =
      (this.button.offsetTop + this.button.offsetHeight) + 'px';
    this.list.style.left = (this.button.offsetLeft - 1) + 'px';
    this.list.style.width = (this.dom.clientWidth + 'px');
  }

  this.list.style.zIndex = 100;
  this.list.setAttribute('aria-hidden', false);
};

/**
 * Hides the list.
 *
 * @return {void}
 * @public
 */
widgets.Select.prototype.closeList = function() {
  this.list.style.zIndex = 0;
  this.list.setAttribute('aria-hidden', true);
};

/**
 * Finds the previous index. If the option is hidden, it will be discarded.
 *
 * @return {number} The previous index.
 */
widgets.Select.prototype.previousIndex = function() {
  var currentIndex = this.index;
  
  while (currentIndex > 0) {
    if (!this.options[--currentIndex].getHidden()) {
      return currentIndex;
    }
  }
  
  return this.index;
};

/**
 * Finds the next index. If the option is hidden, it will be discarded.
 *
 * @return {number} The next index.
 */
widgets.Select.prototype.nextIndex = function() {
  var currentIndex = this.index;
  
  while (currentIndex < (this.options.length - 1)) {
    if (!this.options[++currentIndex].getHidden()) {
      return currentIndex;
    }
  }
  
  return this.index;
};

/**
 * Commits the selected option.
 *
 * @return {void}
 * @protected
 */
widgets.Select.prototype.commit = function() {
  this.chosen = this.options[this.index];
  this.button.children[0].innerHTML = this.chosen.getCaption();
  this.dispatch('change', this);
};

/**
 * Releases the chosen option.
 *
 * @return {void}
 * @protected
 */
widgets.Select.prototype.release = function() {
  this.chosen = null;
};

/**
 * Gets the current value.
 *
 * @return {string} The current value.
 * @public
 */
widgets.Select.prototype.getValue = function() {
  if (this.chosen) {
    return this.chosen.getValue();
  }
  return null;
};

/**
 * Sets value.
 *
 * @param {string} val The value to be set.
 * @return {void}
 * @public
 */
widgets.Select.prototype.setValue = function(val) {
  if (this.index >= 0) {
    this.chosen.dom.className = '';
  }

  for (var i = 0; i < this.options.length; i++) {
    if (val == this.options[i].getValue()) {
      this.index = i;
      this.commit();
      this.chosen.dom.className = 'selected';
    }
  }
};

/**
 * Occurs when the focus is lost.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.Select.prototype.onBlur = function(e) {
  if (!this.mouseInList) {
    this.closeList();
  }
};

/**
 * Occurs when a key is pressed down. We're mostly interested in navigation
 * movements.
 *
 * @param {Event} e Event information.
 * @public
 */
widgets.Select.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var diff = 0, total = 0;
  var nav = false, prevIndex = this.index;

  if (!this.isListOpened()) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      this.showList();
      nav = true;
    }
  } else {
    switch (e.keyCode) {
    case 38: // up
      this.index = this.previousIndex();
      nav = true;
      break;
    case 40: // down
      this.index = this.nextIndex();
      nav = true;
      break;
    case 33: // pg up
      var total = 0, index = this.previousIndex();
      while ((index < this.index) && 
             (total < this.list.offsetHeight)) {
        this.index = index;
        total += this.options[this.index].dom.offsetHeight;
        index = this.previousIndex();
      }
      nav = true;
      break;
    case 34: // pg down
      var total = 0, index = this.nextIndex();
      while ((index > this.index) &&
             (total < this.list.offsetHeight)) {
        this.index = index;
        total += this.options[this.index].dom.offsetHeight;
        index = this.nextIndex();
      }
      nav = true;
      break;
    case 13: // enter
      this.commit();
      this.closeList();
      return;
    case 27: // esc
      this.closeList();
      return;
    }
  }

  if (nav) {
    if (prevIndex != this.index) {
      if (prevIndex <= this.index) {
        diff = (this.options[this.index].dom.offsetTop +
                this.options[this.index].dom.offsetHeight) -
               (this.list.offsetHeight + this.list.scrollTop);
        diff = (diff > 0) ? diff + 2 : 0;
      } else {
        diff = this.options[this.index].dom.offsetTop - this.list.scrollTop;
        diff = (diff < 0) ? diff : 0;
      }
      var prevOption = this.options[prevIndex];
      if (prevOption) {
        prevOption.dom.className = '';
      }
      this.list.scrollTop += diff;
      this.options[this.index].dom.className = 'selected';
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};

/**
 * Occurs when the mouse is "clicked" on the select button.
 *
 * @param {Event} e Event information.
 * @return {boolean} false to stop it as soon as captured.
 */
widgets.Select.prototype.onMouseDown = function(e) {
  this.button.focus();
  
  if (e.target == this.button || e.target.parentNode == this.button) {
    if (!this.isListOpened()) {
      this.showList();
    } else {
      this.closeList();
    }    
  }
  e.preventDefault();
  e.stopPropagation();
  return false;
};

/**
 * Occurs when a given option is clicked.
 *
 * @param {Event} e Event information.
 * @public
 */
widgets.Select.prototype.onOptionClick = function(e) {
  if (e.which == 1 || (e.buttons == 1 || e.buttons == 3)) {
    for (var i = 0; i < this.options.length; i++) {
      if (e.currentTarget == this.options[i].dom) {
        this.index = i;
        this.commit();
        this.closeList();
      }
    }
  }
};

/**
 * Occurs when the mouse is over a given option.
 *
 * @param {Event} e Event information.
 * @protected
 */
widgets.Select.prototype.onOptionHover = function(e) {
  if (this.options[this.index]) {
    this.options[this.index].dom.className = '';
  }
  for (var i = 0; i < this.options.length; i++) {
    if (this.options[i].dom == e.currentTarget) {
      this.options[this.index = i].dom.className = 'selected';
    }
  }
};

/**
 * Occurs when the mouse enters the list area. This event is being used
 * due to a bug in IE that loses the focus everytime the scrollbar is hit.
 *
 * @param {Event} e Event information.
 * @protected
 */
widgets.Select.prototype.onMouseEnterList = function(e) {
  this.mouseInList = true;
};

/**
 * Occurs when the mouse leaves the list area. This event is being used
 * due to a bug in IE that loses the focus everytime the scrollbar is hit.
 *
 * @param {Event} e Event information.
 * @protected
 */
widgets.Select.prototype.onMouseLeaveList = function(e) {
  this.mouseInList = false;
};

/**
 * @inheritDoc
 * @override
 */
widgets.Select.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'blur':
    this.addListener(type, func, obj);
    this.button.addEventListener(type, this.listeners[type], false);
    return;
  case 'change':
    this.addListener(type, func, obj);
    return;
  case 'mouseenterlist':
    this.addListener(type, func, obj);
    this.list.addEventListener('mouseenter', this.listeners[type], false);
    return;
  case 'mouseleavelist':
    this.addListener(type, func, obj);
    this.list.addEventListener('mouseleave', this.listeners[type], false);
    return;
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Select.prototype.unlisten = function(type) {
  switch (type) {
  case 'blur':
    this.button.removeEventListener(type, this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'change':
    this.removeListener(type);
    return;
  case 'mouseenterlist':
    this.list.removeEventListener(type, this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'mouseleavelist':
    this.list.removeEventListener(type, this.listeners[type], false);
    this.removeListener(type);
    return;
  }
  widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Select.prototype.flourish = function() {
  this.dom.className = 'select';
  this.dom.innerHTML = "\
<div class='button' tabindex='0'>\
  <div class='caption'>&nbsp;</div>\
  <div class='arrow'>&#x25BC;</div>\
</div>\
<div class='select-list'></div>";

  this.button = this.dom.children[0];
  this.list = this.dom.children[1];
  this.closeList();
};

/**
 * @inheritDoc
 * @override
 */
widgets.Select.prototype.destroy = function() {
  this.unlisten('blur');
  this.unlisten('keydown');
  this.unlisten('mousedown');
  this.unlisten('mouseenterlist');
  this.unlisten('mouseleavelist');
  for (var i = this.options.length-1; i >= 0; i--) {
    this.removeOption();
  }
  this.index = null;
  this.options = null;
  this.chosen = null;
  this.button = null;
  this.list = null;
  this.mouseInList = null;

  widgets.Base.prototype.destroy.call(this);
};
