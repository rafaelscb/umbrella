/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.AutoComplete} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Textbox.js');

/**
 * The autocomplete widget handles selections from database.
 * This widget provides the following event(s): validate.
 *
 * @param {Element} dom Root element for the autocomplete.
 * @param {number} delay How many milliseconds to wait after
 *    the input is changed.
 * @param {boolean} clientFilter Who filters? The server of the client?
 * @param {posters.Base} poster The poster associated with the autocomplete.
 * @extends {Widgets.Textbox}
 * @constructor
 */
Widgets.AutoComplete = function(dom, delay, clientFilter, poster) {
  Widgets.Textbox.call(this, dom);

  this.delay = delay;
  this.clientFilter = !!clientFilter;
  this.timeoutId = 0;
  this.index = -1;

  this.poster = poster;
  this.poster.listen('response', this.onServerResponse, this);

  this.listen('_input', this.onInput, this);
  this.listen('keydown', this.onKeyDown, this);
  this.listen('_blur', this.onBlur, this);
  this.listen('mouseenterlist', this.onMouseEnterList, this);
  this.listen('mouseleavelist', this.onMouseLeaveList, this);
  this.listen('mouseenterrow', this.onMouseEnterRow, this);
  this.listen('mousedownrow', this.onMouseDownRow, this);
};
inherit(Widgets.AutoComplete, Widgets.Textbox);

/**
 * Stores the timeout ID so we can clear if the input event did not expire.
 *
 * @type {number}
 * @protected
 */
Widgets.AutoComplete.prototype.timeoutId;

/**
 * Contains how many milliseconds to wait before we call the search function.
 *
 * @type {number}
 * @protected
 */
Widgets.AutoComplete.prototype.delay;

/**
 * The filtering occur in the client side or in the server side?
 *
 * @type {boolean}
 * @protected
 */
Widgets.AutoComplete.prototype.clientFilter;

/**
 * The poster associated with the autocomplete.
 *
 * @type {posters.Base}
 * @protected
 */
Widgets.AutoComplete.prototype.poster;

/**
 * Data containing an array of records.
 *
 * @type {array}
 * @protected
 */
Widgets.AutoComplete.prototype.data;

/**
 * Flag indicating if the mouse is in the list.
 *
 * @type {Element}
 * @protected
 */
Widgets.AutoComplete.prototype.mouseInList;

/**
 * The list element.
 *
 * @type {Element}
 * @protected
 */
Widgets.AutoComplete.prototype.list;

/**
 * Contains the index to access the current row.
 *
 * @type {number}
 * @protected
 */
Widgets.AutoComplete.prototype.index;

/**
 * The selected row.
 *
 * @type {Element}
 * @protected
 */
Widgets.AutoComplete.prototype.chosen;

/**
 * Occurs when a response comes from the server.
 *
 * @param {string} code The code of the response.
 * @param {string} from The receiver address.
 * @param {string} action The name of the requested action.
 * @param {object} message The response message.
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.onServerResponse =
function(code, from, action, message) {
  if (code == 'OK') {
    this.onRead(message);
    return;
  }
  this.onError(code, message);
};

/**
 * Occurs when a read response comes from the server.
 *
 * @param {Object} message The response message with the rows.
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.onRead = function(message) {
  this.clear();
  if (this.clientFilter) {
    this.data = message['rows'];
  } else {
    for (var i = 0; i < message['rows'].length; i++) {
      this.addRow(message['rows'][i]);
    }
    if (this.list.firstChild.rows.length > 0) {
      this.open();
    }
  }
};

/**
 * Occurs when the message comes with errors.
 *
 * @param {string} code If there is no explicit error message,
 *    it will assume the resulting code is the error message.
 * @param {object} message The error message.
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.onError = function(code, message) { };

/**
 * Reads data from the server.
 * The client class is in charge of calling this method.
 *
 * @param {string} pQuery Query prefix to be used.
 * @param {object?} ord Optional ordering.
 * @return {void}
 * @public
 */
Widgets.AutoComplete.prototype.read = function(pQuery, ord) {
  if (!ord) ord = {'desc': 'asc'};
  var query = '';
  if (pQuery) query += pQuery + ';';
  query += 'term=' + this.dom.value + '*';
  this.poster.readAC(query, ord, 0, 0, 0);
};

/**
 * In case we choose to filter in the client side, we should implement this
 * method with the filtering algorithm.
 *
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.filter = function() {
  if (this.data) {
    var result = 0;
    
    for (var i = 0; i < this.data.length; i++) {
      if (result = this.match(this.data[i])) {
        this.addRow(this.data[i]);
        if (result == 2 && this.index == -1) {
          this.index = this.list.firstChild.rows.length - 1;
        }
      }
    }
    if (this.index >= 0) this.commit();
    if (this.list.firstChild.rows.length > 0) {
      this.open();
    }
  }
};

/**
 * Test if the record matches the input value.
 *
 * @param {object} record The record to be tested.
 * @return {number} 1 if it matches; 2 if it matches exactly; 0 otherwise.
 * @protected
 */
Widgets.AutoComplete.prototype.match = function(record) {
  var token = this.dom.value.toLowerCase(); var val;
  for (var field in record) {
    val = record[field].toLowerCase();
    if (val.lastIndexOf(token, 0) == 0) {
      if (val == token) return 2;
      return 1;
    }
  }
  return 0;
};

/**
 * Renders the record in a given row.
 *
 * @param {Element} tr The table row element.
 * @param {object} record The record to be rendered.
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.renderRecord = function(tr, record) {
  tr.setAttribute('data-value', record['value']);
  var td = tr.insertCell(-1);
  td.innerHTML = record['desc'];
};

/**
 * Adds a new row to the autocomplete list.
 *
 * @param {object] record The record to be added.
 * @param {number} index The position where the row should be added.
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.addRow = function(record, index) {
  index = (index != undefined) ? index : -1;

  var tr = this.list.firstChild.insertRow(index);
  tr.className = 'ac-row';
  tr.addEventListener(
      'mouseenter', this.listeners['mouseenterrow'], false);
  tr.addEventListener(
      'mousedown', this.listeners['mousedownrow'], false);

  this.renderRecord(tr, record);
};

/**
 * Clear list table.
 *
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.clear = function() {
  this.close();

  var table = this.list.firstChild;
  this.chosen = null; this.index = -1;
  for (var i = table.rows.length-1; i >= 0; i--) {
    table.rows[i].removeEventListener(
        'mouseenter', this.listeners['mouseenterrow'], false);
    table.rows[i].removeEventListener(
        'mousedown', this.listeners['mousedownrow'], false);
    table.deleteRow(i);
  }
};

/**
 * |Closes|Opens|Tests if| the list element.
 *
 * @return {void|void|boolean}
 * @protected
 */
Widgets.AutoComplete.prototype.close = function() {
  this.list.setAttribute('aria-hidden', true);
  this.dispatch('close');
};
Widgets.AutoComplete.prototype.open = function() {
  this.list.style.top =
    (this.dom.offsetTop + this.dom.offsetHeight - 1) + 'px';
  this.list.style.left = this.dom.offsetLeft + 'px';
  this.list.style.width = this.dom.clientWidth + 'px';
  this.list.setAttribute('aria-hidden', false);
};
Widgets.AutoComplete.prototype.isOpened = function() {
  return this.list.getAttribute('aria-hidden') == 'false';
};

/**
 * Commits the selected option.
 *
 * @return {void}
 * @protected
 */
Widgets.AutoComplete.prototype.commit = function() {
  this.chosen = this.list.firstChild.rows[this.index];
  this.chosen.className = 'ac-row selected';
  this.dom.value = this.getDesc();

  this.dispatch('commit');
};

/**
 * Finds the previous|next index.
 *
 * @return {number} The previous|next index.
 * @protected
 */
Widgets.AutoComplete.prototype.previousIndex = function() {
  var currentIndex = this.index;
  if (this.list.firstChild.rows[--currentIndex]) {
    return currentIndex;
  }
  return this.index;
};
Widgets.AutoComplete.prototype.nextIndex = function() {
  var currentIndex = this.index;
  if (this.list.firstChild.rows[++currentIndex]) {
    return currentIndex;
  }
  return this.index;
};

/**
 * Gets the description|value of the chosen row.
 *
 * @return {string}
 * @public
 */
Widgets.AutoComplete.prototype.getDesc = function() {
  if (this.chosen) {
    return this.chosen.cells[0].innerHTML;
  }
  return '';
};
Widgets.AutoComplete.prototype.getValue = function() {
  if (this.chosen) {
    return this.chosen.getAttribute('data-value');
  }
  return null;
};

/**
 * Sets a given value to be selected.
 *
 * @param {string} value Vaue to be selected.
 * @return {void}
 * @public
 */
Widgets.AutoComplete.prototype.setValue = function(val) {
  this.clear();
  this.dom.value = '';
  if (!val) return;

  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i]['value'] == val) {
      this.addRow(this.data[i]);
      this.index = 0;
      this.commit();
    }
  }
};

/**
 * Sets the description|value for the chosen row.
 *
 * @param {string} val Description|Value to be set.
 * @return {void}
 * @public
 */
Widgets.AutoComplete.prototype.setDesc = function(val) {
  this.dom.value = val;
};

/**
 * Occurs when the input value has changed.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.AutoComplete.prototype.onInput = function(e) {
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(function() {
    this.clear();
    if (this.dom.value) {
      if (this.clientFilter) this.filter();
      else this.read();
    }
  }.bind(this), this.delay);
  this.dispatch('input', e);
};

/**
 * Occurs when a key is pressed down. We're mostly interested in navigation
 * movements.
 *
 * @param {Event} e Event information.
 * @public
 */
Widgets.AutoComplete.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var diff = 0, total = 0;
  var nav = false, oldIndex = this.index;
  if (!this.isOpened()) {
    if (this.list.firstChild.rows.length > 0) {
      if (e.keyCode == 38 || e.keyCode == 40 ||
          e.keyCode == 33 || e.keyCode == 34) {
        this.open(); nav = true;
      }
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
             (total < this.list.firstChild.offsetHeight)) {
        this.index = index;
        total += this.list.firstChild.rows[this.index].offsetHeight;
        index = this.previousIndex();
      }
      nav = true;
      break;
    case 34: // pg down
      var total = 0, index = this.nextIndex();
      while ((index > this.index) &&
             (total < this.list.firstChild.offsetHeight)) {
        this.index = index;
        total += this.list.firstChild.rows[this.index].offsetHeight;
        index = this.nextIndex();
      }
      nav = true;
      break;
    case 13: // enter
      this.commit();
      this.close();
      return;
    case 27: // esc
      this.close();
      return;
    }
  }

  if (nav) {
    if (oldIndex != this.index) {
      if (oldIndex <= this.index) {
        diff = (this.list.firstChild.rows[this.index].offsetTop +
                this.list.firstChild.rows[this.index].offsetHeight) -
               (this.list.offsetHeight + this.list.scrollTop);
        diff = (diff > 0) ? diff + 2 : 0;
      } else {
        diff = this.list.firstChild.rows[this.index].offsetTop - this.list.scrollTop;
        diff = (diff < 0) ? diff : 0;
      }
      var oldRow = this.list.firstChild.rows[oldIndex];
      if (oldRow) {
        oldRow.className = 'ac-row';
      }
      this.list.scrollTop += diff;
      this.list.firstChild.rows[this.index].className = 'ac-row selected';
      this.commit();
    }
    return false;
  }
};

/**
 * Occurs when the mouse enters|leaves the list area. This event is being used
 * due to a bug in IE that loses the focus everytime the scrollbar is hit.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.AutoComplete.prototype.onMouseEnterList = function(e) { this.mouseInList = true; };
Widgets.AutoComplete.prototype.onMouseLeaveList = function(e) { this.mouseInList = false; };
Widgets.AutoComplete.prototype.onBlur = function(e) {
  if (!this.mouseInList) this.close();
  this.dispatch('blur', e);
};

/**
 * Occurs when the mouse is over a list row.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.AutoComplete.prototype.onMouseEnterRow = function(e) {
  if (e.target.className == 'ac-row') {
    if (this.index >= 0) {
      this.list.firstChild.rows[this.index].className = 'ac-row';
    }
    this.index = e.target.rowIndex;
    this.list.firstChild.rows[this.index].className = 'ac-row selected';
  }
};

/**
 * Occurs when the mouse is pressed down over a list row.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.AutoComplete.prototype.onMouseDownRow = function(e) {
  this.dom.focus();
  this.commit();
  this.close();
  return false;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.AutoComplete.prototype.listen = function(type, func, obj) {
  switch (type) {
  case '_input': // Internal input
    this.addListener(type, func, obj);
    this.dom.addEventListener('input', this.listeners[type], false);
    return;
  case 'input': // External input
    this.addListener(type, func, obj);
    return;
  case '_blur': // Internal blur
    this.addListener(type, func, obj);
    this.dom.addEventListener('blur', this.listeners[type], false);
    return;
  case 'blur': // External blur
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
  case 'mouseenterrow':
    this.addListener(type, func, obj);
    return;
  case 'mousedownrow':
    this.addListener(type, func, obj);
    return;
  case 'commit':
    this.addListener(type, func, obj);
    return;
  case 'close':
    this.addListener(type, func, obj);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.AutoComplete.prototype.unlisten = function(type) {
  switch (type) {
  case '_input': // Internal input
    this.dom.removeEventListener('input', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'input': // External input
    this.removeListener(type);
    return;
  case '_blur': // Internal blur
    this.dom.removeEventListener('blur', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'blur': // External blur
    this.removeListener(type);
    return;
  case 'mouseenterlist':
    this.list.removeEventListener('mouseenter', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'mouseleavelist':
    this.list.removeEventListener('mouseleave', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'mouseenterrow':
    this.removeListener(type);
    return;
  case 'mousedownrow':
    this.removeListener(type);
    return;
  case 'commit':
    this.removeListener(type);
    return;
  case 'close':
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.AutoComplete.prototype.flourish = function() {
  Widgets.Textbox.prototype.flourish.call(this);

  this.list = document.createElement('div');
  this.list.className = 'ac-list';
  this.list.appendChild(document.createElement('table'));
  this.dom.parentNode.appendChild(this.list);
  this.close();
};
