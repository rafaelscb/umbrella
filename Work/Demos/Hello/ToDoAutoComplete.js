/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Demos.Hello.ToDoAutoComplete} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/AutoComplete.js');
include('Demos/Posters/ToDoItem.js');

/**
 * An autocomplete widget for the todo-item data.
 *
 * @param {Element} dom Root element for the autocomplete.
 * @extends {Widgets.AutoComplete}
 * @constructor
 */
Demos.Hello.ToDoAutoComplete = function(dom) {
  Widgets.AutoComplete.call(this,
      dom, 200, true, new Demos.Posters.TodoItem());
  this.list.className += ' todo-ac';
};
inherit(Demos.Hello.ToDoAutoComplete, Widgets.AutoComplete);

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.ToDoAutoComplete.prototype.onRead = function(message) {
  Widgets.AutoComplete.prototype.onRead.call(this, message);
  this.setDesc('Do the dishes.');
  this.filter();
  this.close();
};