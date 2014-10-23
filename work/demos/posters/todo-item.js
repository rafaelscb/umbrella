/*=============================================================================

  This file is a part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code demos.posters.TodoItem} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('posters/base.js');

/**
 * This class contains post methods against the api/todo-item receiver.
 *
 * @extends {posters.Base}
 * @constructor
 */
demos.posters.TodoItem = function() {
  posters.Base.call(this, 'api.php');
};
inherit(demos.posters.TodoItem, posters.Base);

/**
 * Reads load-item records from server.
 *
 * @return {void}
 * @public
 */
demos.posters.TodoItem.prototype.read = function(query, order, p, rpp, total) {
  var message = [query, order, p, rpp, total];
  this.post('todo-item', 'read', message);
};

/**
 * Writes load-item records to server.
 *
 * @return {void}
 * @public
 */
demos.posters.TodoItem.prototype.write = function(id, desc, st) {
  var message = [id, desc, st];
  this.post('todo-item', 'write', message);
}

/**
 * Removes load-item records from server.
 *
 * @return {void}
 * @public
 */
demos.posters.TodoItem.prototype.remove = function(id) {
  var message = [id];
  this.post('todo-item', 'remove', message);
};
