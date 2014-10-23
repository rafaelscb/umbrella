/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Poster} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The poster widget handles post events.
 * A poster is not associated with a DOM element, but sends
 * callbacks to other widgets which have DOM elements.
 *
 * @param {string} controller The controller which will receive
 *    the post message.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Poster = function(controller) {
  widgets.Base.call(this);
  this.controller = controller;
  this.listen('_response', this.onResponse, this);
  this.listen('_progress', this.onProgress, this);
};
inherit(widgets.Poster, widgets.Base);

/**
 * The address of the controller.
 *
 * @type {string}
 * @protected
 */
widgets.Poster.prototype.controller;

/**
 * Occurs when a request dispatches a {@code load|error|abort} event -
 * when a response is retrieved.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
widgets.Poster.prototype.onResponse = function(e) {
  this.dispatch('response', e);
};

/**
 * Occurs when a request dispatches a {@code progress} event.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
widgets.Poster.prototype.onProgress = function(e) {
  this.dispatch('progress', e);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Poster.prototype.listen = function(type, func, obj) {
  switch (type) {
  case '_response':
  case '_progress':
  case 'response':
  case 'progress':
    this.addListener(type, func, obj);
    return;
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Poster.prototype.unlisten = function(type) {
  switch (type) {
  case '_response':
  case '_progress':
  case 'response':
  case 'progress':
    this.removeListener(type);
    return;
  }
  widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Well, a poster....posts.
 *
 * @param {string} msg The message to be sent.
 * @return {void} The return is retrieved by the reponse callback.
 * @public
 */
widgets.Poster.prototype.post = function(msg) {
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
widgets.Poster.prototype.openRequest = function() {
  var request = new XMLHttpRequest();
  request.open('POST', this.controller, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  return request;
};

/**
 * @inheritDoc
 * @override
 */
widgets.Poster.prototype.destroy = function() {
  this.unlisten('_response');
  this.unlisten('_progress');

  this.controller = null;

  widgets.Base.prototype.destroy.call(this);
};
