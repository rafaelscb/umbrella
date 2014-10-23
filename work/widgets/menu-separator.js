/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.MenuSeparator} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The menuseparator widget is to be used with menu widget.
 * It should not handle events, and only separate the menuitems.
 *
 * @extends {widgets.Base}
 * @constructor
 */
widgets.MenuSeparator = function() {
  this.dom = document.createElement('div');
  widgets.Base.call(this, this.dom);
};
inherit(widgets.MenuSeparator, widgets.Base);

/**
 * @inheritDoc
 * @override
 */
widgets.MenuSeparator.prototype.flourish = function() {
  this.dom.setAttribute('role', 'separator');
  this.dom.innerHTML = "";
};
