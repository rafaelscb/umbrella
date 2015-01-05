/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Notif} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The notif widget is to be used when we want to notify the user about
 * a given status of the application.
 *
 * @param {Element} dom Root element for the notif.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Notif = function(dom) {
  Widgets.Base.call(this, dom);
  this.stack = new Object();
};
inherit(Widgets.Notif, Widgets.Base);

/**
 * Stack of message strings.
 *
 * @type {object}
 * @protected
 */
Widgets.Notif.prototype.stack;

/**
 * DOM for the message area.
 *
 * @type {Element}
 * @protected
 */
Widgets.Notif.prototype.message;

/**
 * DOM for the close button.
 *
 * @type {Element}
 * @protected
 */
Widgets.Notif.prototype.closeButton;

/**
 * Do it. Notify the user with a given message.
 *
 * @param {string} msg The message to be sent to the user.
 * @param {string} action The name of the action.
 * @param {string} cls The class name.
 * @return {void}
 * @public
 */
Widgets.Notif.prototype.show = function(msg, action, cls) {
  this.stack[action] = {
    'message': msg,
    'class': cls
  };
  this.dom.className = "notif " + cls;
  this.message.innerHTML = msg;
  this.setHidden(false);
};

/**
 * Occurs when we click on the close-button.
 *
 * @param {string} action Action name.
 * @return {void}
 * @protected
 */
Widgets.Notif.prototype.onClose = function(action) {
  var isEmpty = true;

  if (typeof action == 'string' || action instanceof String) {
    delete this.stack[action];
    for (var item in this.stack) {
      isEmpty = false;
      this.message.innerHTML = this.stack[item]['message'];
    }
  } else {
    for (var item in this.stack) {
      delete this.stack[item];
    }
  }

  if (isEmpty) {
    this.setHidden(true);
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Notif.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'close':
    this.addListener(type, func, obj);
    this.closeButton.addEventListener('click', this.listeners[type], false);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Notif.prototype.unlisten = function(type, func, obj) {
  switch (type) {
  case 'close':
    this.closeButton.removeEventListener('click', this.listeners[type], false);
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Notif.prototype.flourish = function() {
  this.dom.className = "notif";
  this.dom.innerHTML = "\
<div class='bubble'>\
  <div class='message'>Notification...</div>\
  <button class='close-button'>x</button>\
</div>";

  this.message = this.dom.children[0].children[0];
  this.closeButton = this.dom.children[0].children[1];

  this.listen('close', this.onClose, this);
  this.dispatch('close');
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Notif.prototype.destroy = function() {
  this.unlisten('close');

  this.message = null;
  this.closeButton = null;

  Widgets.Base.prototype.destroy.call(this);
};
