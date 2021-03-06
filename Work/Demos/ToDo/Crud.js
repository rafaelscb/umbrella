/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Demos.ToDo.Crud} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');
include('Widgets/Textbox.js');
include('Widgets/ToggleButton.js');
include('Widgets/Button.js');
include('Demos/Posters/ToDoItem.js');

/**
 * This class is a widget that handles todo_item records. It creates, reads, updates,
 * deletes todo_item's.
 *
 * @extends {Widgets.Base}
 * @constructor
 */
Demos.ToDo.Crud = function(dom) {
  Widgets.Base.call(this, dom);
}; inherit(Demos.ToDo.Crud, Widgets.Base);

/**
 * Poster for the todo-item crud operations.
 *
 * @type {Demos.Posters.ToDoItem}
 * @protected
 */
Demos.ToDo.Crud.prototype.poster;

/**
 * New input widget.
 *
 * @type {Widgets.Textbox}
 * @protected
 */
Demos.ToDo.Crud.prototype.newInput;

/**
 * New button widget.
 *
 * @type {Widgets.Button}
 * @protected
 */
Demos.ToDo.Crud.prototype.newButton;

/**
 * Items area.
 *
 * @type {Element}
 * @protected
 */
Demos.ToDo.Crud.prototype.itemsArea;

/**
 * Indicates if the new item button was clicked.
 *
 * @type {boolean}
 * @protected
 */
Demos.ToDo.Crud.prototype.isNew;

/**
 * Adds a new item to the list of items.
 *
 * @type {number} id ToDo item id.
 * @type {string} desc ToDo item description.
 * @type {number} status ToDo item status.
 */
Demos.ToDo.Crud.prototype.addItem = function(id, desc, status) {
  var li = document.createElement('li');
  var statusLabel, statusValue, statusElem, deleteElem;

  li.setAttribute('data-id', id);
  li.innerHTML = "\
    <label>" + desc + "</label>\
    <span class='item-status-button'></span>\
    <span class='item-delete-button'></span>";
  this.itemsArea.appendChild(li);

  if (status == 0) {
    li.className = 'active';
    statusLabel = 'ACTIVE';
    statusValue = false;
  } else {
    li.className = 'completed';
    statusLabel = 'COMPLETED';
    statusValue = true;
  }

  statusElem = new Widgets.ToggleButton(li.children[1], statusLabel, statusValue);
  deleteElem = new Widgets.Button(li.children[2], 'DELETE');

  statusElem.listen('toggle', this.onStatusChange, this);
  deleteElem.listen('click', this.onDeleteClick, this);
};

/**
 * Called everytime a new item is being added.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Demos.ToDo.Crud.prototype.onNewItem = function(e) {
  this.isNew = true;
  this.poster.write(0, this.newInput.dom.value, 0);
};

/**
 * Called everytime the status of a given item has changed.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Demos.ToDo.Crud.prototype.onStatusChange = function(e) {
  var id, desc, st, li;

  li = e.target.parentNode;
  id = li.getAttribute('data-id');
  desc = li.children[0].innerHTML;

  if (li.children[1].innerHTML == 'ACTIVE') {
    li.className = 'completed';
    li.children[1].innerHTML = 'COMPLETED';
    st = 1;
  } else {
    li.className = 'active';
    li.children[1].innerHTML = 'ACTIVE';
    st = 0;
  }

  this.isNew = false;
  this.poster.write(id, desc, st);
};

/**
 * Called everytime the delete button of a given item has been clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Demos.ToDo.Crud.prototype.onDeleteClick = function(e) {
  var id, ul, li;
  li = e.target.parentNode;
  ul = li.parentNode;

  id = li.getAttribute('data-id');
  this.poster.remove(id);
  ul.removeChild(li);
};

/**
 * Handle response.
 *
 * @param {string} code The code of the response.
 * @param {string} from The address where the message came from.
 * @param {string} action The action that were executed.
 * @param {Object} message The actual message.
 * @return {void}
 */
Demos.ToDo.Crud.prototype.handleResponse = function(code, from, action, message) {
  if (code == 'OK') {
    switch (action) {
    case 'read':
      this.onRead(message);
      break;
    case 'write':
      this.onWrite(message);
    }
  }
  app.unnotify();
};

/**
 * Handles the read results.
 *
 * @param {Object} message Message from server.
 * @return {void}
 */
Demos.ToDo.Crud.prototype.onRead = function(message) {
  var i, row;

  for (i = 0; i < message.rows.length; i++) {
    row = message.rows[i];
    this.addItem(row.id, row.description, row.status);
  }
};

/**
 * Handles the write results.
 *
 * @param {Object} message Message from server.
 * @return {void}
 */
Demos.ToDo.Crud.prototype.onWrite = function(message) {
  if (this.isNew) {
    this.addItem(message.id, message.description, message.status);
    this.newInput.dom.value = '';
  }
};

/**
 * @inheritDoc
 * @override
 */
Demos.ToDo.Crud.prototype.flourish = function() {
  this.dom.innerHTML = "\
  <h2>TODOS</h2>\
  <div>\
    <input id='new-input' type='text' value=''>\
    <span id='new-button'>ADD</span>\
  </div>\
  <ul id='items-area'></ul>";

  this.newInput = new Widgets.Textbox('new-input');
  this.newInput.dom.setAttribute('placeholder', 'Add new item');
  this.newInput.dom.setAttribute('style', 'padding: 3px 1px 3px 1px; width: 200px;');
  this.newButton = new Widgets.Button('new-button', 'ADD');
  this.itemsArea = document.getElementById('items-area');

  this.newInput.listen('keyup', function(e) {
    if (e.keyCode == 13) {
      this.onNewItem(e);
    }
  }, this);
  this.newButton.listen('click', this.onNewItem, this);
  this.poster = new Demos.Posters.ToDoItem();
  this.poster.listen('response', this.handleResponse, this);
  this.poster.read('*', {'desc': 'asc'}, 0, 0, 0);
};
