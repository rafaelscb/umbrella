/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Button} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The button widget handles click states.
 * This widget provides the following event(s): click.
 *
 * @param {Element} dom Root element for the button.
 * @param {string} content Optional (may add it later). The inner content for the
 *    button.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Button = function(dom, content) {
  widgets.Base.call(this, dom);
  this.setContent(content);
  this.listen('keyup', this.onKeyUp, this);
};
inherit(widgets.Button, widgets.Base);

/**
 * Gets the Content for the button.
 *
 * @return {string} The inner content.
 * @public
 */
widgets.Button.prototype.getContent = function() {
  return this.dom.innerHTML;
};

/**
 * Sets the content for the button.
 *
 * @param {string} content The inner content.
 * @return {void}
 * @public
 */
widgets.Button.prototype.setContent = function(content) {
  this.dom.innerHTML = content;
};

/**
 * Handler function to send the click event every time the element has focus
 * and the {@code space} character is hit.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.Button.prototype.onKeyUp = function(e) {
  if (e.keyCode === 32) {
    this.dispatch('click', e);
  }
};

/**
 * @inheritDoc
 * @override
 */
widgets.Button.prototype.flourish = function() {
  this.dom.setAttribute('role', 'button');
  if (!this.dom.hasAttribute('tabindex')) {
    this.dom.setAttribute('tabindex', '0');
  }
};

/**
 * @inheritDoc
 * @override
 */
widgets.Button.prototype.destroy = function() {
  this.unlisten('keyup');
  widgets.Base.prototype.destroy.call(this);
};
