/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Button.js");
include("Widgets/ToggleButton.js");

/**
 * Presents the button widget.
 *
 * @param {Element} dom The root element for the button panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Button.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Buttons", dom);
};
inherit(Demos.Hello.Button.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the button widget.
 *
 * @type {Widgets.Button}
 * @protected
 */
Demos.Hello.Button.Panel.prototype.btn1;

/**
 * Contains the toggle button widget.
 *
 * @type {Widgets.ToggleButton}
 * @protected
 */
Demos.Hello.Button.Panel.prototype.btn2;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Button.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  this.btn1 = new Widgets.Button(elem, "CLICK HERE");
  this.btn1.listen("click", this.onButtonClick, this);
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.btn2 = new Widgets.ToggleButton(elem, "PRESS HERE", false);
  this.btn2.listen("toggle", this.onButtonToggle, this);
  this.container.appendChild(elem);
};

/**
 * Occurs every time the btn1 is clicked.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Button.Panel.prototype.onButtonClick = function() {
  alert("Button clicked.");
};

/**
 * Occurs every time the btn2 is toggled.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Button.Panel.prototype.onButtonToggle = function(pressed) {
  alert("Button pressed: " + this.btn2.getPressed() + ".");
};
