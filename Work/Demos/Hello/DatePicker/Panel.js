/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/DatePicker.js");

/**
 * Presents the date picker widget.
 *
 * @param {Element} dom The root element for the date picker panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.DatePicker.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Date Picker", dom);
};
inherit(Demos.Hello.DatePicker.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the first date picker widget.
 *
 * @type {Widgets.DatePicker}
 * @protected
 */
Demos.Hello.DatePicker.Panel.prototype.dtp1;

/**
 * Contains the second date picker widget.
 *
 * @type {Widgets.DatePicker}
 * @protected
 */
Demos.Hello.DatePicker.Panel.prototype.dtp2;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.DatePicker.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  this.dtp1 = new Widgets.DatePicker(elem);
  this.container.appendChild(elem);

  elem = document.createElement("span");
  elem.innerHTML = "&nbsp;|&nbsp;";
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.dtp2 = new Widgets.DatePicker(elem);
  this.container.appendChild(elem);
};
