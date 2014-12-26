/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.DatePicker} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The DatePicker widget is to be used when the user wants to pick a given
 * date.
 *
 * @param {Element} dom Root element for the date-picker.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.DatePicker = function(dom) {
  this.weeks = Array();
  this.days = Array();
  this.monthNames = new Array('January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December');
  this.weekNames = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

  Widgets.Base.call(this, dom);

  this.listen('blur', this.onBlur, this);
  this.listen('mousedown', this.onMouseDown, this);
  this.listen('gridclick', this.onGridClick, this);
  this.listen('prevmonthclick', this.onPrevMonthClick, this);
  this.listen('monthclick', this.onMonthClick, this);
  this.listen('nextmonthclick', this.onNextMonthClick, this);
  this.listen('prevyearclick', this.onPrevYearClick, this);
  this.listen('yearclick', this.onYearClick, this);
  this.listen('nextyearclick', this.onNextYearClick, this);
  this.listen('todayclick', this.onTodayClick, this);
  this.listen('noneclick', this.onNoneClick, this);
};
inherit(Widgets.DatePicker, Widgets.Base);

/**
 * The input element associated with the date-picker.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.input;

/**
 * The element where the calendar is presented.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.calendar;

/**
 * The element for the previous month button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.prevMonthButton;

/**
 * The element for the current month button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.monthButton;

/**
 * The element for the next month button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.nextMonthButton;

/**
 * The element for the previous year button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.prevYearButton;

/**
 * The element for the current year button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.yearButton;

/**
 * The element for the next year button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.nextYearButton;

/**
 * The grid where the collection of days are.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.grid;

/**
 * A collection of elements that represent the week numbers.
 *
 * @type {Array.<Element>}
 * @protected
 */
Widgets.DatePicker.prototype.weeks;

/**
 * A collection of elements that represent the day numbers.
 *
 * @type {Array.<Element>}
 * @protected
 */
Widgets.DatePicker.prototype.days;

/**
 * Today button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.todayButton;

/**
 * None button.
 *
 * @type {Element}
 * @protected
 */
Widgets.DatePicker.prototype.noneButton;

/**
 * Contains the month names.
 *
 * @type {Array.<string>}
 * @protected
 */
widgets.DatePicker.prototype.monthNames;

/**
 * Contains the week names.
 *
 * @type {Array.<string>}
 * @protected
 */
Widgets.DatePicker.prototype.weekNames;

/**
 * Calculates the week number.
 *
 * @param {Date} date Date.
 * @return {number} The number of the week.
 * @protected
 */
Widgets.DatePicker.prototype.calcWeek = function(date) {
  var janFirst = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(
    (((date - janFirst) / 86400000) + janFirst.getDay() + 1) / 7);
};

/**
 * Gets the month button value.
 *
 * @return {?number} The selected month.
 * @protected
 */
Widgets.DatePicker.prototype.getMonthButton = function() {
  var month = Number(this.monthButton.getAttribute('data-value'));
  return month;
};

/**
 * Sets the month button value.
 *
 * @param {number} month The month to be set.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.setMonthButton = function(month) {
  this.monthButton.className = 'month-button';
  this.monthButton.innerHTML = this.monthNames[month];
  this.monthButton.setAttribute('data-value', month);
};

/**
 * Gets the year button value.
 *
 * @return {?number} The selected year.
 * @protected
 */
Widgets.DatePicker.prototype.getYearButton = function() {
  var year = Number(this.yearButton.innerHTML);
  return year;
};

/**
 * Sets the year button.
 *
 * @param {number} year The year to be set.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.setYearButton = function(year) {
  this.yearButton.className = 'year-button';
  this.yearButton.innerHTML = year;
};

/**
 * Populates the calendar.
 *
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.populateCalendar = function() {
  var today = new Date();
  var selMonth = this.getMonthButton();
  var selYear = this.getYearButton();
  var date = new Date(selYear, selMonth, 1);
  var wday = 0, day = 0, month = 0;
  var strDate = null;

  date.setDate(date.getDate() - date.getDay());

  for (var w = 0, i = 0; i < this.days.length; i++) {
    wday = date.getDay();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    strDate = year + '-' +
        (month < 9 ? '0' + (month+1) : (month+1)) + '-' +
        (day < 10 ? '0' + day : day);    

    if (wday == 0) {
      this.weeks[w++].innerHTML = this.calcWeek(date);
    }

    this.days[i].className = '';
    if (today.getDate() == day && 
        today.getMonth() == month &&
        today.getFullYear() == year) {
      this.days[i].className += ' today ';
    }

    if (strDate == this.input.value.trim()) {
      this.days[i].className += ' selected ';
    }    
    if (wday == 0) {
      this.days[i].className += ' wend-end ';
    } else if (wday == 6) {
      this.days[i].className += ' wend-start ';
    }
    if (date.getMonth() != selMonth) {
      this.days[i].className += ' other-month ';
    }
    this.days[i].innerHTML = date.getDate();
    this.days[i].setAttribute('data-date', strDate);
    date.setDate(date.getDate()+1);
  }
};

/**
 * Opens the calendar.
 *
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.showCalendar = function() {
  this.calendar.style.zIndex = 100;
  this.calendar.setAttribute('aria-hidden', 'false');
};

/**
 * Closes the calendar.
 *
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.closeCalendar = function() {
  this.calendar.style.zIndex = 0;
  this.calendar.setAttribute('aria-hidden', 'true');
};

/**
 * Gets the current value.
 *
 * @return {string} The current value.
 * @public
 */
Widgets.DatePicker.prototype.getValue = function() {
  return this.input.value;
};

/**
 * Sets value.
 *
 * @param {string} val The value to be set.
 * @return {void}
 * @public
 */
Widgets.DatePicker.prototype.setValue = function(val) {
  this.input.value = val;
};

/**
 * Occurs when the focus is lost.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.DatePicker.prototype.onBlur = function(e) {
  this.closeCalendar();
};

/**
 * Occurs when the element is pressed down.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onMouseDown = function(e) {
  if (e.target == this.input) {
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(this.input.value)) {
      var delems = this.input.value.split('-');
      this.setYearButton(Number(delems[0]));
      this.setMonthButton(Number(delems[1])-1);
    }
    this.input.focus();
    this.populateCalendar();
    this.showCalendar();
  }
  e.preventDefault();
  e.stopPropagation();
  return false;
};

/**
 * Occurs when the previous month button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onPrevMonthClick = function(e) {
  var month = this.getMonthButton();
  if (month > 0) {
    month--;
  } else {
    month = 11;
    this.setYearButton(this.getYearButton()-1);
  }
  this.setMonthButton(month);
  this.populateCalendar();
};

/**
 * Occurs when the month button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onMonthClick = function(e) {
  console.log(e);
};

/**
 * Occurs when the next month button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onNextMonthClick = function(e) {
  var month = this.getMonthButton();
  if (month < 11) {
    month++;
  } else {
    month = 0;
    this.setYearButton(this.getYearButton()+1);
  }
  this.setMonthButton(month);
  this.populateCalendar();
};

/**
 * Occurs when the previous year button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onPrevYearClick = function(e) {
  this.setYearButton(this.getYearButton()-1);
  this.populateCalendar();
};

/**
 * Occurs when the year button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onYearClick = function(e) {
  console.log(e);
};

/**
 * Occurs when the next year button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onNextYearClick = function(e) {
  this.setYearButton(this.getYearButton()+1);
  this.populateCalendar();
};

/**
 * Occurs when the mouse is clicked onto the grid.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onGridClick = function(e) {
  var day = e.target.getAttribute('data-date');
  if (day) {
    this.input.value = day;
    this.closeCalendar();
  }
};

/**
 * Occurs when the today button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onTodayClick = function(e) {
  var d = new Date();
  var year = d.getFullYear(), month = d.getMonth(), day = d.getDate();
  var strDate = year + '-' +
      (month < 9 ? '0' + (month+1) : (month+1)) + '-' +
      (day < 10 ? '0' + day : day);    

  this.input.value = strDate;
  this.closeCalendar();
};

/**
 * Occurs when the none button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.onNoneClick = function(e) {
  this.input.value = '';
  this.closeCalendar();
};

/**
 * @inheritDoc
 * @override
 */
Widgets.DatePicker.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'blur':
    this.addListener(type, func, obj);
    this.input.addEventListener(type, this.listeners[type], false);
    return;
  case 'gridclick':
    this.addListener(type, func, obj);
    this.grid.addEventListener('click', this.listeners[type], false);
    return;
  case 'prevmonthclick':
    this.addListener(type, func, obj);
    this.prevMonthButton.addEventListener(
        'click', this.listeners[type], false);
    return;
  case 'monthclick':
    this.addListener(type, func, obj);
    this.monthButton.addEventListener(
        'click', this.listeners[type], false);
    return;
  case 'nextmonthclick':
    this.addListener(type, func, obj);
    this.nextMonthButton.addEventListener(
        'click', this.listeners[type], false);
    return;
  case 'prevyearclick':
    this.addListener(type, func, obj);
    this.prevYearButton.addEventListener('click', this.listeners[type], false);
    return;
  case 'yearclick':
    this.addListener(type, func, obj);
    this.yearButton.addEventListener('click', this.listeners[type], false);
    return;
  case 'nextyearclick':
    this.addListener(type, func, obj);
    this.nextYearButton.addEventListener('click', this.listeners[type], false);
    return;
  case 'todayclick':
    this.addListener(type, func, obj);
    this.todayButton.addEventListener('click', this.listeners[type], false);
    return;
  case 'noneclick':
    this.addListener(type, func, obj);
    this.noneButton.addEventListener('click', this.listeners[type], false);
    return;
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.DatePicker.prototype.unlisten = function(type) {
  switch (type) {
  case 'blur':
    this.input.removeEventListener(type, this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'gridclick':
    this.grid.removeEventListener('click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'prevmonthclick':
    this.prevMonthButton.removeEventListener(
        'click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'monthclick':
    this.monthButton.removeEventListener('click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'nextmonthclick':
    this.nextMonthButton.removeEventListener(
        'click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'prevyearclick':
    this.prevYearButton.removeEventListener(
        'click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'yearclick':
    this.yearButton.removeEventListener('click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'nextyearclick':
    this.nextYearButton.removeEventListener(
        'click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'todayclick':
    this.todayButton.removeEventListener(
        'click', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'noneclick':
    this.noneButton.removeEventListener(
        'click', this.listeners[type], false);
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.DatePicker.prototype.flourish = function() {
  this.dom.className = 'date-picker';
  this.dom.innerHTML = "<input type='text'><div></div>";

  this.input = this.dom.children[0];
  this.input.setAttribute('role', 'textbox');
  this.input.setAttribute('placeholder', 'YYYY-MM-DD');
  this.calendar = this.dom.children[1];
  this.flourishCalendar();
};

/**
 * Flourishes the calendar area.
 *
 * @return {void}
 * @protected
 */
Widgets.DatePicker.prototype.flourishCalendar = function() {
  this.calendar.className = 'calendar';
  this.closeCalendar();

  var d = new Date();
  var m = d.getMonth();
  var y = d.getFullYear();

  var table = document.createElement('table');
  table.cellSpacing = '0';
  table.cellPadding = '0';
  var thead = document.createElement('thead');
  this.grid = document.createElement('tbody');
  this.grid.setAttribute('role', 'grid');
  var tfoot = document.createElement('tfoot');
  var row = undefined, cell = undefined;

  // head row...
  thead.appendChild(row = document.createElement('tr'));
  row.className = 'head';
  // month buttons...
  row.appendChild(cell = document.createElement('td'));
  cell.colSpan = '5';
  cell.appendChild(this.prevMonthButton = document.createElement('div'));
  this.prevMonthButton.className = 'prev-month-button';
  this.prevMonthButton.innerHTML = '&#171;';
  cell.appendChild(this.monthButton = document.createElement('div'));
  this.setMonthButton(m);
  cell.appendChild(this.nextMonthButton = document.createElement('div'));
  this.nextMonthButton.className = 'next-month-button';
  this.nextMonthButton.innerHTML = '&#187;';
  // year buttons...
  row.appendChild(cell = document.createElement('td'));
  cell.colSpan = '3';
  cell.appendChild(this.prevYearButton = document.createElement('div'));
  this.prevYearButton.className = 'prev-year-button';
  this.prevYearButton.innerHTML = '&#171;';
  cell.appendChild(this.yearButton = document.createElement('div'));
  this.setYearButton(y);
  cell.appendChild(this.nextYearButton = document.createElement('div'));
  this.nextYearButton.className = 'next-year-button';
  this.nextYearButton.innerHTML = '&#187;';
  // week day row...
  this.grid.appendChild(row = document.createElement('tr'));
  row.appendChild(cell = document.createElement('th'));
  for (var i = 0; i < 7; i++) { // week names
    row.appendChild(cell = document.createElement('th'));
    cell.className = 'wday'; cell.innerHTML = this.weekNames[i];
    cell.setAttribute('role', 'columnheader');
  }
  table.appendChild(thead);  
  for (var i = 0; i < 6; i++) { // weeks
    this.grid.appendChild(row = document.createElement('tr'));
    row.appendChild(cell = document.createElement('th'));
    cell.className = 'week'; cell.innerHTML = i;
    cell.setAttribute('role', 'rowheader');
    this.weeks.push(cell);
    for (var j = 0; j < 7; j++) {
      row.appendChild(cell = document.createElement('td'));
      if (j == 0) {
        cell.className = 'wend-end';
      } else if (j == 6) {
        cell.className = 'wend-start';
      }
      cell.innerHTML = j;
      this.days.push(cell);
    }
  }
  table.appendChild(this.grid);
  // foot row...
  tfoot.appendChild(row = document.createElement('tr'));
  row.className = 'foot';
  row.appendChild(cell = document.createElement('td'));
  cell.colSpan = '2';
  cell.appendChild(this.todayButton = document.createElement('div'));
  this.todayButton.className = 'today-button';
  this.todayButton.innerHTML = 'Today';
  row.appendChild(cell = document.createElement('td'));
  cell.colSpan = '4';
  row.appendChild(cell = document.createElement('td'));
  cell.colSpan = '2';
  cell.appendChild(this.noneButton = document.createElement('div'));
  this.noneButton.className = 'none-button';
  this.noneButton.innerHTML = 'None';

  table.appendChild(tfoot);
  this.calendar.appendChild(table);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.DatePicker.prototype.destroy = function() {
  this.unlisten('blur');
  this.unlisten('mousedown');
  this.unlisten('gridclick');
  this.unlisten('prevmonthclick');
  this.unlisten('monthclick');
  this.unlisten('nextmonthclick');
  this.unlisten('prevyearclick');
  this.unlisten('yearclick');
  this.unlisten('nextyearclick');
  this.unlisten('todayclick');
  this.unlisten('noneclick');

  this.input = null;
  this.calendar = null;
  this.prevMonthButton = null;
  this.monthButton = null;
  this.nextMonthButton = null;
  this.prevYearButton = null;
  this.yearButton = null;
  this.nextYearButton = null;
  this.grid = null;
  this.weeks = null;
  this.days = null;
  this.todayButton = null;
  this.noneButton = null;
  this.monthNames = null;
  this.weekNames = null;

  Widgets.Base.prototype.destroy.call(this);
};