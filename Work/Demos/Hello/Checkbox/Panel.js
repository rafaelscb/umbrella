/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Checkbox.js");

/**
 * Presents the checkbox widget.
 *
 * @param {Element} dom The root element for the checkbox panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Checkbox.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Checkbox", dom);
};
inherit(Demos.Hello.Checkbox.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the first checkbox.
 *
 * @type {Widgets.Checkbox}
 * @protected
 */
Demos.Hello.Checkbox.Panel.prototype.cb1;

/**
 * Contains the second checkbox.
 *
 * @type {Widgets.Checkbox}
 * @protected
 */
Demos.Hello.Checkbox.Panel.prototype.cb2;

/**
 * Contains the third checkbox.
 *
 * @type {Widgets.Checkbox}
 * @protected
 */
Demos.Hello.Checkbox.Panel.prototype.cb3;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Checkbox.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  this.cb1 = new Widgets.Checkbox(elem, false);
  this.cb1.listen("change", this.onCheckboxChange, this);
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.cb2 = new Widgets.Checkbox(elem, null);
  this.cb2.listen("change", this.onCheckboxChange, this);
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.cb3 = new Widgets.Checkbox(elem, true);
  this.cb3.listen("change", this.onCheckboxChange, this);
  this.container.appendChild(elem);
};

/**
 * Occurs every time the checkboxes are changed.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Checkbox.Panel.prototype.onCheckboxChange = function(e) {
  console.log(e);
};
