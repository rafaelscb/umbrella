/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Select.js");
include("Widgets/Option.js");

/**
 * Presents the select widget.
 *
 * @param {Element} dom The root element for the select panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Select.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Select", dom);
};
inherit(Demos.Hello.Select.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the select widget.
 *
 * @type {Widgets.Select}
 * @protected
 */
Demos.Hello.Select.Panel.prototype.sel1;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Select.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem, option;

  elem = document.createElement("div");
  this.sel1 = new Widgets.Select(elem, "list");
  this.sel1.listen("change", this.onSel1Change, this);
  this.container.appendChild(elem);

  option = new Widgets.Option("Option N1");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N2");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N3");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N4");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N5");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N6");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N7");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N8");
  this.sel1.addOption(option);

  option = new Widgets.Option("Option N9");
  this.sel1.addOption(option);
};

/**
 * Occurs every time the select has changed.
 *
 * @type {Widgets.Select} obj Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Select.Panel.prototype.onSel1Change = function(obj) {
  console.log(obj.chosen);
};
