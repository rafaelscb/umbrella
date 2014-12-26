/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.MenuSeparator} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The menuseparator widget is to be used with menu widget.
 * It should not handle events, and only separate the menuitems.
 *
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.MenuSeparator = function() {
  this.dom = document.createElement('div');
  Widgets.Base.call(this, this.dom);
};
inherit(Widgets.MenuSeparator, Widgets.Base);

/**
 * @inheritDoc
 * @override
 */
Widgets.MenuSeparator.prototype.flourish = function() {
  this.dom.setAttribute('role', 'separator');
  this.dom.innerHTML = "";
};