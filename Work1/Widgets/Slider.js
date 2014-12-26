/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

// TODO: Implement this widget.

/**
 * @fileoverview This file defines the {@code Widgets.Slider} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/base.js')

/**
 * The slider widget is to be used when we want a single value from a range
 * or a range itself.
 *
 * @param {Element} dom Root element for the slider.
 * @param {string} vertical for Vertical orientation, otherwise it is
 *    horizontal.
 * @param {boolean} isRange if true, two handles are added, otherwise a single
 *    handler is added.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Slider = function(dom, orientation, size, handleSize) {
  Widgets.Base.call(this, dom);
  this.setOrientation(orientation);
};
inherit(Widgets.Slider, Widgets.Base);

/**
 * Contains the first handle.
 *
 * @type {Element}
 * @protected
 */
Widgets.Slider.prototype.handle;

/**
 * Contains the second handle.
 *
 * @type {Element}
 * @protected
 */
Widgets.Slider.prototype.handle2;

/**
 * Gets the orientation value.
 *
 * @return {string} horizontal for horizontal orientation, otherwise vertical
 *    is returned.
 * @public
 */
Widgets.Slider.prototype.getOrientation = function() {
  return this.dom.getAttribute('aria-orientation');
};

/**
 * Sets the orientation value.
 *
 * @param {string} val The orientation to be set to aria-orientation.
 * @return {void}
 * @protected
 */
Widgets.Slider.prototype.setOrientation = function(val) {
  this.dom.setAttribute('aria-orientation',
      (val == 'vertical' ? 'vertical' : 'horizontal'));
};

/**
 * Reset positions of handlers.
 *
 * @return {void}
 * @public
 */
Widgets.Slider.prototype.reset = function() {
  this.handle.style.top = (this.dom.offsetTop - 6) + 'px';
  this.handle.style.left = (this.dom.offsetLeft - 5) + 'px';

  this.handle2.style.top = (this.dom.offsetTop - 6) + 'px';
  this.handle2.style.left = (
      this.dom.offsetLeft + this.dom.offsetWidth - 7) + 'px';
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Slider.prototype.flourish = function() {
  this.dom.setAttribute('role', 'slider');
  this.dom.style.width = '150px';
  this.dom.innerHTML = "\
<div class='handle' tabindex='0'></div>\
<div class='handle' tabindex='0'></div>";

  this.handle = this.dom.children[0];
  this.handle2 = this.dom.children[1];
  this.reset();
};