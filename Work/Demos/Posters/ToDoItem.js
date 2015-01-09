/*=============================================================================

  This file is a part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code demos.posters.TodoItem} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Posters/Base.js');

/**
 * This class contains post methods against the api/todo-item receiver.
 *
 * @extends {Posters.Base}
 * @constructor
 */
Demos.Posters.ToDoItem = function() {
  Posters.Base.call(this, "/api2.php", "Demos");
};
inherit(Demos.Posters.ToDoItem, Posters.Base);

/**
 * Reads load-item records from server.
 *
 * @return {void}
 * @public
 */
Demos.Posters.ToDoItem.prototype.read = function(query, order, p, rpp, total) {
  var message = [query, order, p, rpp, total];
  this.post('ToDoItem', 'read', message);
};

/**
 * Writes load-item records to server.
 *
 * @return {void}
 * @public
 */
Demos.Posters.ToDoItem.prototype.write = function(id, desc, st) {
  var message = [id, desc, st];
  this.post('ToDoItem', 'write', message);
}

/**
 * Removes load-item records from server.
 *
 * @return {void}
 * @public
 */
Demos.Posters.ToDoItem.prototype.remove = function(id) {
  var message = [id];
  this.post('ToDoItem', 'remove', message);
};
