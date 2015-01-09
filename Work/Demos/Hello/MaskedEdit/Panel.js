/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/MaskedEdit.js");

/**
 * Presents the masked edit widget.
 *
 * @param {Element} dom The root element for the masked edit panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.MaskedEdit.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Masked Edit", dom);
};
inherit(Demos.Hello.MaskedEdit.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the first masked edit.
 *
 * @type {Widgets.MaskedEdit}
 * @protected
 */
Demos.Hello.MaskedEdit.Panel.prototype.mke1;

/**
 * Contains the second masked edit.
 *
 * @type {Widgets.MaskedEdit}
 * @protected
 */
Demos.Hello.MaskedEdit.Panel.prototype.mke2;

/**
 * Contains the third masked edit.
 *
 * @type {Widgets.MaskedEdit}
 * @protected
 */
Demos.Hello.MaskedEdit.Panel.prototype.mke3;

/**
 * Contains the fourth masked edit.
 *
 * @type {Widgets.MaskedEdit}
 * @protected
 */
Demos.Hello.MaskedEdit.Panel.prototype.mke4;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.MaskedEdit.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  elem.innerHTML = "Phone (Ex: (999) 999-9999):";
  this.container.appendChild(elem);
  elem = document.createElement("input");
  elem.type = "text";
  this.mke1 = new Widgets.MaskedEdit(elem, "(###) ###-####");
  this.container.appendChild(elem);

  elem = document.createElement("div");
  elem.innerHTML = "Date (Ex: 12/30/2015):";
  this.container.appendChild(elem);
  elem = document.createElement("input");
  elem.type = "text";
  this.mke2 = new Widgets.MaskedEdit(elem, "##/##/####");
  this.container.appendChild(elem);

  elem = document.createElement("div");
  elem.innerHTML = "Amount (Ex: $ 9999,99):";
  this.container.appendChild(elem);
  elem = document.createElement("input");
  elem.type = "text";
  this.mke3 = new Widgets.MaskedEdit(elem, "$ ####,##");
  this.container.appendChild(elem);

  elem = document.createElement("div");
  elem.innerHTML = "Currency (Ex: USD):";
  this.container.appendChild(elem);
  elem = document.createElement("input");
  elem.type = "text";
  this.mke4 = new Widgets.MaskedEdit(elem, "AAA");
  this.container.appendChild(elem);
};
