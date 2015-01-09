/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Listbox.js");
include("Widgets/Option.js");

/**
 * Presents the listbox widget.
 *
 * @param {Element} dom The root element for the listbox panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Listbox.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Listbox", dom);
};
inherit(Demos.Hello.Listbox.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the listbox widget.
 *
 * @type {Widgets.Listbox}
 * @protected
 */
Demos.Hello.Listbox.Panel.prototype.lsb1;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Listbox.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem, option;

  elem = document.createElement("div");
  this.lsb1 = new Widgets.Listbox(elem);
  this.container.appendChild(elem);

  option = new Widgets.Option("Option N1");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N2");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N3");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N4");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N5");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N6");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N7");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N8");
  this.lsb1.addOption(option);

  option = new Widgets.Option("Option N9");
  this.lsb1.addOption(option);
};
