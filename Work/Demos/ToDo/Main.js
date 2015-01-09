/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Demos.ToDo.Main} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Application.js');
include('Widgets/Notif.js');
include('Demos/ToDo/Crud.js');

/**
 * This class is for the Umbrella Demos ToDo App.
 *
 * @extends {Widgets.Application}
 * @constructor
 */
Demos.ToDo.Main = function() {
  Widgets.Application.call(this);
};
inherit(Demos.ToDo.Main, Widgets.Application);

/**
 * ToDoItem poster to handle items.
 *
 * @type {Demos.Posters.ToDoItem}
 * @protected
 */
Demos.ToDo.Main.prototype.todoItem;

/**
 * Notif object.
 *
 * @type {Widgets.Notif}
 * @protected
 */
Demos.ToDo.Main.prototype.notif;

/**
 * General app area element.
 *
 * @type {Element}
 * @protected
 */
Demos.ToDo.Main.prototype.appArea;

/**
 * Crud widget.
 *
 * @type {Demos.ToDo.Crud}
 * @protected
 */
Demos.ToDo.Main.prototype.crud;

/**
 * Shows the notification area with a given message. The notification message
 * is always called by the consumer, that's why we have a explicit {@code show}
 * method.
 *
 * @param {string} msg Message to be shown.
 * @return {void}
 * @public
 */
Demos.ToDo.Main.prototype.notify = function(msg) {
  this.notif.show(msg);
};

/**
 * Hides the notification area (with its message). The notification message may
 * be closed by the Notif object and by the consumer, that's why we use the
 * {@code dispatch} method.
 */
Demos.ToDo.Main.prototype.unnotify = function() {
  this.notif.dispatch('close');
};

/**
 * Adds the static structure that will be used by the ToDo application.
 *
 * @return {void}
 */
Demos.ToDo.Main.prototype.flourish = function() {
  Widgets.Application.prototype.flourish.call(this);
  this.dom.innerHTML = "\
  <div id='notif-area' aria-hidden='true'></div>\
  <div id='app-area' aria-hidden='true'>\
    <div id='crud-area'></div>\
  </div>";

  this.notif = new Widgets.Notif('notif-area');
  this.appArea = document.getElementById('app-area');
  this.crud = new Demos.ToDo.Crud(document.getElementById('crud-area'));
};

/**
 * Here is where we handle the view loading process.
 *
 * @return {void}
 */
Demos.ToDo.Main.prototype.load = function() {
  this.appArea.setAttribute('aria-hidden', 'false');
};

// --
var app = new Demos.ToDo.Main();
