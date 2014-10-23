/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.ToggleButton} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/button.js');

/**
 * The toggle-button widget handles pressed/not-pressed states.
 * This widget provides the following event(s): toggle.
 *
 * @param {Element} dom Root element for the toggle button.
 * @param {string} label Optional (may add it later). The inner label for the
 *    toggle button.
 * @param {?boolean} pressed Optional value for the {@code aria-pressed}'s
 *    state: true = 'true'; false = 'false'; otherwise = 'mixed'.
 * @extends {widgets.Button}
 * @constructor
 */
widgets.ToggleButton = function(dom, label, pressed) {
  widgets.Button.call(this, dom, label);
  this.setPressed(pressed);
  this.listen('click', this.onClick, this);
};
inherit(widgets.ToggleButton, widgets.Button);

/**
 * Gets the {@code aria-pressed} attribute.
 *
 * @return {?boolean} 'true' = true; 'false' = false; 'mixed' = null.
 * @public
 */
widgets.ToggleButton.prototype.getPressed = function() {
  var pressed = this.dom.getAttribute('aria-pressed');
  if (pressed === 'true' || pressed === 'false') {
    return (pressed === 'true');
  }
  return null;
};

/**
 * Sets the {@code aria-pressed} attribute.
 *
 * @param {?boolean} pressed true = 'true'; false = 'false';
 *    otherwise = 'mixed'.
 * @public
 */
widgets.ToggleButton.prototype.setPressed = function(pressed) {
  this.dom.setAttribute('aria-pressed',
      ((typeof(pressed) === 'boolean') ? pressed : 'mixed'));
};

/**
 * Handler function in response of the click event. Since this is
 * a toggle button, the toggle event is dispatched.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.ToggleButton.prototype.onClick = function(e) {
  var nextState = !(this.getPressed() === true);

  this.setPressed(nextState);
  this.dispatch('toggle', e);
};

/**
 * @inheritDoc
 * @override
 */
widgets.ToggleButton.prototype.destroy = function() {
  this.unlisten('click');
  widgets.Button.prototype.destroy.call(this);
};
