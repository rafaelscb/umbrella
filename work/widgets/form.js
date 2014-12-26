/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Form} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');
include('Posters/Base.js');

/**
 * The form widget is to be used when there is a need to submit a set
 * of information that is filled by the user.
 *
 * This widget doesn't assume any specific format. But it provides
 * the events: submit, reset and response.
 *
 * @param {Element} dom Root element for the form.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Form = function(dom, poster) {
  Widgets.Base.call(this, dom);
  this.poster = poster;
  this.listen('keypress', this.onKeyPress, this);
  this.listen('submit', this.onSubmit, this);
  this.listen('reset', this.onReset, this);
  this.listen('response', this.onResponse, this);
};
inherit(Widgets.Form, Widgets.Base);

/**
 * The poster to be used to post the form.
 *
 * @type {posters.Base}
 * @protected
 */
Widgets.Form.prototype.poster;

/**
 * The button that submits the form. This button is optional.
 *
 * @type {widgets.Button}
 * @protected
 */
Widgets.Form.prototype.submitButton;

/*
 * The button that resets the form. This button is optional.
 *
 * @type {widgets.Button}
 * @protected
 */
Widgets.Form.prototype.resetButton;

/**
 * Occurs everytime we press a key in the form element.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Form.prototype.onKeyPress = function(e) {
  if (e.keyCode == 13) {
    this.dispatch('submit', e);
  } else if (e.keyCode == 27) {
    this.dispatch('reset', e);
  }
};

/**
 * Occurs everytime it dispatches the 'submit' message, such
 * as when the submit button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Form.prototype.onSubmit = function(e) { };

/**
 * Occurs everytime it dispatches the 'reset' message, such
 * as when the reset button is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Form.prototype.onReset = function(e) { };

/**
 * Occurs everytime the poster dispatches the 'response' message.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Form.prototype.onResponse =
function(code, from, action, message) { };

/**
 * @inheritDoc
 * @override
 */
Widgets.Form.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'submit':
    this.addListener(type, func, obj);
    if (this.submitButton) {
      this.submitButton.listen('click', this.onSubmit, this);
    }
    return;
  case 'reset':
    this.addListener(type, func, obj);
    if (this.resetButton) {
      this.resetButton.listen('click', this.onReset, this);
    }
    return;
  case 'response':
    this.addListener(type, func, obj);
    this.poster.listen('response', this.onResponse, this);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Form.prototype.unlisten = function(type, func, obj) {
  switch (type) {
  case 'submit':
    if (this.submitButton) {
      this.submitButton.unlisten('click');
    }
    this.removeListener(type);
    return;
  case 'reset':
    if (this.resetButton) {
      this.resetButton.unlisten('click');
    }
    this.removeListener(type);
    return;
  case 'response':
    this.poster.unlisten('response');
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Form.prototype.destroy = function() {
  this.unlisten('keypress');
  this.unlisten('submit');
  this.unlisten('reset');
  this.unlisten('response');

  this.poster.destroy();
  if (this.submitButton) {
    this.submitButton.destroy();
  }
  if (this.resetButton) {
    this.resetButton.destroy();
  }

  this.poster = null;
  this.submitButton = null;
  this.resetButton = null;

  Widgets.Base.prototype.destroy.call(this);
};