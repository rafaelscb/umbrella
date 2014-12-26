/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Combobox} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/base.js');

/**
 * The combobox widget is to be used when an unique option must be selected.
 *
 * @param {Element} dom Root element for the combobox.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Combobox = function(dom) {
  this.index = -1;
  this.options = new Array();
  this.chosen = null;

  this.mouseInList = false;

  Widgets.Base.call(this, dom);

  this.listen('blur', this.onBlur, this);
  this.listen('input', this.onInput, this);
  this.listen('keydown', this.onKeyDown, this);
  this.listen('mousedown', this.onMouseDown, this);
  this.listen('mouseenterlist', this.onMouseEnterList, this);
  this.listen('mouseleavelist', this.onMouseLeaveList, this);
};
inherit(Widgets.Combobox, Widgets.Base);

/**
 * Contains the index to access the current option (selected|highlighted).
 *
 * @type {number}
 * @protected
 */
Widgets.Combobox.prototype.index;

/**
 * Contains the collection of options.
 *
 * @type {Array.<widgets.Option>}
 * @protected
 */
Widgets.Combobox.prototype.options;

/**
 * Contains the chosen option.
 *
 * @type {widgets.Option}
 * @protected
 */
Widgets.Combobox.prototype.chosen;

/**
 * The input element associated with the combobox.
 *
 * @type {Element}
 * @protected
 */
Widgets.Combobox.prototype.input;

/**
 * The arrow element.
 *
 * @type {Element}
 * @protected
 */
Widgets.Combobox.prototype.arrow;

/**
 * The list element.
 *
 * @type {Element}
 * @protected
 */
Widgets.Combobox.prototype.list;

/**
 * Flag indicating if the mouse is in the list.
 *
 * @type {Element}
 * @protected
 */
Widgets.Combobox.prototype.mouseInList;

/**
 * Adds a new option to the options collection.
 *
 * @param {widgets.Option} option A new option to be added.
 * @param {number} index The index position where the item will be added to. If
 *    no value is specified, it adds the option to the end of the list.
 * @return {void}
 */
Widgets.Combobox.prototype.addOption = function(option, index) {
  index = (index == undefined) ? this.options.length : index;
  this.options.splice(index, 0, option);

  option.listen('mousedown', this.onOptionClick, this);
  option.listen('mouseover', this.onOptionHover, this);

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
Widgets.Combobox.prototype.removeOption = function(index) {
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
Widgets.Combobox.prototype.isListOpened = function() {
  return this.list.getAttribute('aria-hidden') != 'true';
};

/**
 * Filters and maybe opens the list.
 *
 * @param {boolean} restrictive If true, it will hide the options that don't
 *    match the input. If false, it will show all options, but select the
 *    one that matches the input.
 * @return {void}
 * @public
 */
Widgets.Combobox.prototype.filterAndMaybeShowList = function(restrictive) {
  var first = false, mustShow = false, caption = '';
  var token = this.input.value.trim().toLowerCase();

  if (this.options[this.index]) {
    this.options[this.index].setSelected(false);
  }

  for (var i = 0; i < this.options.length; i++) {
    caption = this.options[i].getCaption().toLowerCase();

    if (this.matchFunction(caption, token)) {
      if (!first) {
        this.options[this.index = i].setSelected(true);
        first = true;
      }
      this.options[i].setHidden(false);
    } else {
      this.options[i].setHidden(restrictive);
    }
  }

  mustShow = first || !restrictive;

  if (mustShow) {
    if (!this.list.style.top) {
      this.list.style.top =
        (this.input.offsetTop + this.input.offsetHeight) + 'px';
      this.list.style.left = (this.input.offsetLeft - 1) + 'px';
      this.list.style.width = this.dom.clientWidth + 'px';
    }

    if (!first) this.options[this.index = 0].setSelected(true);
    if (token.length == 0) this.list.scrollTop = 0;
    this.list.style.zIndex = 100;
  }

  this.list.setAttribute('aria-hidden', !mustShow);
};

/**
 * Hides the list.
 *
 * @return {void}
 * @public
 */
Widgets.Combobox.prototype.closeList = function() {
  this.list.style.zIndex = 0;
  this.list.setAttribute('aria-hidden', true);
};

/**
 * The match function. The first argument for the match function will be
 * an Option's caption and the second will be the token to evaluate.
 *
 * @param {string} caption The caption to check.
 * @param {string} token A string to look for at the start of {@caption}.
 */
Widgets.Combobox.prototype.matchFunction = function(caption, token) {
  return caption.lastIndexOf(token, 0) == 0;
};

/**
 * Find the previous index. If the option is hidden, it will be discarded.
 *
 * @return {number} the previous index.
 */
Widgets.Combobox.prototype.previousIndex = function() {
  var currentIndex = this.index;

  while (currentIndex > 0) {
    if (!this.options[--currentIndex].getHidden()) {
      return currentIndex;
    }
  }

  return this.index;
};

/**
 * Find the next index. If the option is hidden, it will be discarded.
 *
 * @return {number} the next index.
 */
Widgets.Combobox.prototype.nextIndex = function() {
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
Widgets.Combobox.prototype.commit = function() {
  this.chosen = this.options[this.index];
  this.input.value = this.chosen.getCaption();
  this.input.select();
  this.dispatch('change', this);
};

/**
 * Releases the chosen option.
 *
 * @return {void}
 * @protected
 */
Widgets.Combobox.prototype.release = function() {
  this.chosen = null;
};

/**
 * Occurs when the focus is lost.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Combobox.prototype.onBlur = function(e) {
  if (!this.mouseInList) {
    this.closeList();
  }
};

/**
 * Occurs everytime a new character is added or removed from the input.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Combobox.prototype.onInput = function(e) {
  this.release();
  this.filterAndMaybeShowList(true);
};

/**
 * Occurs when a key is pressed down. We're mostly interested in navigation
 * movements.
 *
 * @param {Event} e Event information.
 * @public
 */
Widgets.Combobox.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var diff = 0, total = 0;
  var nav = false, prevIndex = this.index;

  if (!this.isListOpened()) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      this.filterAndMaybeShowList(false);
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
 * Occurs when the mouse is "clicked" on the combobox.
 *
 * @param {Event} e Event information.
 * @return {boolean} false to stop it as soon as captured.
 */
Widgets.Combobox.prototype.onMouseDown = function(e) {
  this.input.focus();
  if (e.target == this.dom ||
      e.target == this.input || e.target == this.arrow) {
    if (!this.isListOpened()) {
      this.filterAndMaybeShowList(false);
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
Widgets.Combobox.prototype.onOptionClick = function(e) {
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
Widgets.Combobox.prototype.onOptionHover = function(e) {
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
Widgets.Combobox.prototype.onMouseEnterList = function(e) {
  this.mouseInList = true;
};

/**
 * Occurs when the mouse leaves the list area. This event is being used
 * due to a bug in IE that loses the focus everytime the scrollbar is hit.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.Combobox.prototype.onMouseLeaveList = function(e) {
  this.mouseInList = false;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Combobox.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'blur':
    this.addListener(type, func, obj);
    this.input.addEventListener(type, this.listeners[type], false);
    return;
  case 'input':
    this.addListener(type, func, obj);
    this.input.addEventListener(type, this.listeners[type], false);
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
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Combobox.prototype.unlisten = function(type) {
  switch (type) {
  case 'blur':
    this.input.removeEventListener(type, this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'input':
    this.input.removeEventListener(type, this.listeners[type], false);
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
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Combobox.prototype.flourish = function() {
  this.dom.setAttribute('role', 'combobox');
  this.dom.innerHTML = "\
<input type='text'><span class='combobox-arrow'>&#x25BC;</span>\
<div class='combobox-list'></div>";

  this.input = this.dom.children[0];
  this.arrow = this.dom.children[1];
  this.list = this.dom.children[2];
  this.closeList();
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Combobox.prototype.destroy = function() {
  this.unlisten('blur');
  this.unlisten('input');
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
  this.input = null;
  this.arrow = null;
  this.list = null;
  this.mouseInList = null;

  Widgets.Base.prototype.destroy.call(this);
};