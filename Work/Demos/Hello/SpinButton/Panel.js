/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/SpinButton.js");

/**
 * Presents the spinbutton widget.
 *
 * @param {Element} dom The root element for the spinbutton panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.SpinButton.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Spin Button", dom);
};
inherit(Demos.Hello.SpinButton.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the first spin button widget.
 *
 * @type {Widgets.SpinButton}
 * @protected
 */
Demos.Hello.SpinButton.Panel.prototype.sbtn1;

/**
 * Contains the second spin button widget.
 *
 * @type {Widgets.SpinButton}
 * @protected
 */
Demos.Hello.SpinButton.Panel.prototype.sbtn2;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.SpinButton.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  this.sbtn1 = new Widgets.SpinButton(elem, -10, 100, 1, 10, 0);
  this.container.appendChild(elem);

  elem = document.createElement("span");
  elem.innerHTML = "&nbsp;|&nbsp;";
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.sbtn2 = new Widgets.SpinButton(elem, 0, 100, 0.1, 0.5, 0);
  this.container.appendChild(elem);
};
