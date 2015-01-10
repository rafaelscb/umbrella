/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Poster} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The poster widget handles post events.
 * A poster is not associated with a DOM element, but sends
 * callbacks to other widgets which have DOM elements.
 *
 * @param {string} controller The controller which will receive
 *    the post message.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Poster = function(controller) {
  Widgets.Base.call(this);
  this.controller = controller;
  this.listen('_response', this.onResponse, this);
  this.listen('_progress', this.onProgress, this);
};
inherit(Widgets.Poster, Widgets.Base);

/**
 * The address of the controller.
 *
 * @type {string}
 * @protected
 */
Widgets.Poster.prototype.controller;

/**
 * Occurs when a request dispatches a {@code load|error|abort} event -
 * when a response is retrieved.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Poster.prototype.onResponse = function(e) {
  this.dispatch('response', e);
};

/**
 * Occurs when a request dispatches a {@code progress} event.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Poster.prototype.onProgress = function(e) {
  this.dispatch('progress', e);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Poster.prototype.listen = function(type, func, obj) {
  switch (type) {
  case '_response':
  case '_progress':
  case 'response':
  case 'progress':
    this.addListener(type, func, obj);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Poster.prototype.unlisten = function(type) {
  switch (type) {
  case '_response':
  case '_progress':
  case 'response':
  case 'progress':
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Well, a poster....posts.
 *
 * @param {string} msg The message to be sent.
 * @return {void} The return is retrieved by the reponse callback.
 * @public
 */
Widgets.Poster.prototype.post = function(msg) {
  var request = this.openRequest();
  if (this.listeners['progress']) {
    request.addEventListener(
        'progress', this.listeners['_progress'], false);
  }
  if (this.listeners['response']) {
    request.addEventListener(
        'load', this.listeners['_response'], false);
    request.addEventListener(
        'error', this.listeners['_response'], false);
    request.addEventListener(
        'abort', this.listeners['_response'], false);
  }
  request.send(msg);
};

/**
 * Opens a request object.
 *
 * @return {XMLHttpRequest}
 * @protected
 */
Widgets.Poster.prototype.openRequest = function() {
  var request = new XMLHttpRequest();
  request.open('POST', this.controller, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  return request;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Poster.prototype.destroy = function() {
  this.unlisten('_response');
  this.unlisten('_progress');

  this.controller = null;

  Widgets.Base.prototype.destroy.call(this);
};
