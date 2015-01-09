/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Combobox.js");
include("Widgets/Option.js");

/**
 * Presents the combobox widget.
 *
 * @param {Element} dom The root element for the combobox panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Combobox.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Combobox", dom);
};
inherit(Demos.Hello.Combobox.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the combobox widget.
 *
 * @type {Widgets.Combobox}
 * @protected
 */
Demos.Hello.Combobox.Panel.prototype.cmb1;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Combobox.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem, option;

  elem = document.createElement("div");
  this.cmb1 = new Widgets.Combobox(elem, "list");
  this.cmb1.listen("change", this.onCmb1Change, this);
  this.container.appendChild(elem);

  option = new Widgets.Option("Option N1");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N2");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N3");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N4");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N5");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N6");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N7");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N8");
  this.cmb1.addOption(option);

  option = new Widgets.Option("Option N9");
  this.cmb1.addOption(option);
};

/**
 * Occurs every time the combobox has changed.
 *
 * @type {Widgets.Combobox} obj Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Combobox.Panel.prototype.onCmb1Change = function(obj) {
  console.log(obj.chosen);
};
