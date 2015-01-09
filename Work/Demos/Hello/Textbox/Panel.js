/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Textbox.js");

/**
 * Presents the textbox widget.
 *
 * @param {Element} dom The root element for the textbox panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Textbox.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Textbox", dom);
};
inherit(Demos.Hello.Textbox.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the first textbox.
 *
 * @type {Widgets.Textbox}
 * @protected
 */
Demos.Hello.Textbox.Panel.prototype.txt1;

/**
 * Contains the second textbox.
 *
 * @type {Widgets.Textbox}
 * @protected
 */
Demos.Hello.Textbox.Panel.prototype.txt2;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Textbox.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  elem.innerHTML = "Simple";
  this.container.appendChild(elem);

  elem = document.createElement("input");
  elem.type = "text";
  this.txt1 = new Widgets.Textbox(elem);
  this.txt1.listen("focus", this.onTxt1Focus, this);
  this.container.appendChild(elem);

  elem = document.createElement("div");
  elem.innerHTML = "Multiple";
  this.container.appendChild(elem);

  elem = document.createElement("textarea");
  elem.maxLength = 100;
  this.txt2 = new Widgets.Textbox(elem);
  this.txt2.listen("focus", this.onTxt2Focus, this);
  this.container.appendChild(elem);
};

/**
 * Occurs every time the textbox 1 receives focus.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Textbox.Panel.prototype.onTxt1Focus = function(e) {
  console.log('"this" in "txt1" is = ' + this);
};

/**
 * Occurs every time the textbox 2 receives focus.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Textbox.Panel.prototype.onTxt2Focus = function(e) {
  console.log('"this" in "txt2" is = ' + this);
};
