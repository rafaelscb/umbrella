/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Radio} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Checkbox.js');

/**
 * The radio widget handles checked state(s).
 * This widget provides the following event(s): change.
 *
 * @param {Element} dom Root element for the radio button.
 * @param {?boolean} checked Optional value for the {@code aria-checked}'s
 *    state: true = 'true'; otherwise = 'false'.
 * @extends {Widgets.Checkbox}
 * @constructor
 */
Widgets.Radio = function(dom, checked) {
  Widgets.Checkbox.call(this, dom, (checked == true));
  this.listen('focus', this.onClick, this);
};
inherit(Widgets.Radio, Widgets.Checkbox);

/**
 * Handler function in response of the click event. Every time a
 * click event occurs a {@code change} event is dispatched, cause its state
 * changes.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Radio.prototype.onClick = function(e) {
  if (this.getChecked() !== true) {
    this.setChecked(true);
    this.dispatch('change', e);
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Radio.prototype.flourish = function() {
  this.dom.setAttribute('role', 'radio');
  if (!this.dom.hasAttribute('tabindex')) {
    this.dom.setAttribute('tabindex', '-1');
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Radio.prototype.destroy = function() {
  this.unlisten('focus');
  Widgets.Checkbox.prototype.destroy.call(this);
};
