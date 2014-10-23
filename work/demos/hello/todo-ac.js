/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code demos.hello.TodoAc} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/auto-complete.js');
include('demos/posters/todo-item.js');

/**
 * An autocomplete widget for the todo-item data.
 *
 * @param {Element} dom Root element for the autocomplete.
 * @extends {widgets.AutoComplete}
 * @constructor
 */
demos.hello.TodoAc = function(dom) {
  widgets.AutoComplete.call(this,
      dom, 200, true, new demos.posters.TodoItem());
  this.list.className += ' todo-ac';
};
inherit(demos.hello.TodoAc, widgets.AutoComplete);

/**
 * @inheritDoc
 * @override
 */
demos.hello.TodoAc.prototype.onRead = function(message) {
  widgets.AutoComplete.prototype.onRead.call(this, message);
  this.setDesc('Do the dishes.');
  this.filter();
  this.close();
};
