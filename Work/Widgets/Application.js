/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Application} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Loader.js');

/**
 * This widget represents the {@code application} role and provides the
 * following event(s): load.
 *
 * @param {Element=} dom Root element for the widget. If no element is passed,
 *    it assumes the root element is {@code document.body}.
 * @extends {Widgets.Loader}
 * @constructor
 */
Widgets.Application = function(dom) {
  Widgets.Loader.call(this, dom);
}; inherit(Widgets.Application, Widgets.Loader);

/**
 * @inheritDoc
 * @override
 */
Widgets.Application.prototype.flourish = function() {
  this.dom.setAttribute('role', 'application');
};