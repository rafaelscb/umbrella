/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code demos.todo.Main} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('demos/init.js');
include('widgets/application.js');
include('widgets/notif.js');
include('demos/todo/crud.js');

/**
 * This class is for the Umbrella Demos Todo App.
 *
 * @extends {widgets.Application}
 * @constructor
 */
demos.todo.Main = function() {
  widgets.Loader.call(this);
};
inherit(demos.todo.Main, widgets.Application);

/**
 * TodoItem poster to handle items.
 *
 * @type {demos.posters.TodoItem}
 * @protected
 */
demos.todo.Main.prototype.todoItem;

/**
 * Notif object.
 *
 * @type {widgets.Notif}
 * @protected
 */
demos.todo.Main.prototype.notif;

/**
 * General app area element.
 *
 * @type {Element}
 * @protected
 */
demos.todo.Main.prototype.appArea;

/**
 * Crud widget.
 *
 * @type {demos.todo.Crud}
 * @protected
 */
demos.todo.Main.prototype.crud;

/**
 * Shows the notification area with a given message. The notification message
 * is always called by the consumer, that's why we have a explicit {@code show}
 * method.
 *
 * @param {string} msg Message to be shown.
 * @return {void}
 * @public
 */
demos.todo.Main.prototype.notify = function(msg) {
  this.notif.show(msg);
};

/**
 * Hides the notification area (with its message). The notification message may
 * be closed by the Notif object and by the consumer, that's why we use the
 * {@code dispatch} method.
 */
demos.todo.Main.prototype.unnotify = function() {
  this.notif.dispatch('close');
};

/**
 * Adds the static structure that will be used by the Todo application.
 *
 * @return {void}
 */
demos.todo.Main.prototype.flourish = function() {
  widgets.Application.prototype.flourish.call(this);
  this.dom.innerHTML = "\
  <div id='notif-area' aria-hidden='true'></div>\
  <div id='app-area' aria-hidden='true'>\
    <div id='crud-area'></div>\
  </div>";

  this.notif = new widgets.Notif('notif-area');
  this.appArea = document.getElementById('app-area');
  this.crud = new demos.todo.Crud(document.getElementById('crud-area'));
};

/**
 * Here is where we handle the view loading process.
 *
 * @return {void}
 */
demos.todo.Main.prototype.loadView = function(viewName, args) {
  this.appArea.setAttribute('aria-hidden', 'false');
};

// --
var app = new demos.todo.Main();
